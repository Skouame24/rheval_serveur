import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { MailService } from '../mail/mail.service';

/** Applications de l'écosystème Agilly qui émettent des notifications */
export const APPLICATIONS_NOTIF = ['rheval', 'absences', 'missions', 'caisse', 'portail'] as const;
export type ApplicationNotif = (typeof APPLICATIONS_NOTIF)[number];

export interface CreateNotificationDto {
  userId: string;
  titre: string;
  message: string;
  type?: 'INFO' | 'ACTION' | 'VALIDATION' | 'ALERTE';
  /** Application émettrice. Si absente, déduite du lien (compatibilité des anciens appels). */
  application?: ApplicationNotif;
  lien?: string;
  ficheId?: string;
  sendEmail?: boolean;
}

/** Règle de compatibilité pour les appels qui ne précisent pas encore l'application. */
export function deduireApplication(lien?: string | null): ApplicationNotif {
  if (!lien) return 'rheval';
  if (lien.startsWith('/absences/missions') || lien.startsWith('/absences/interventions')) return 'missions';
  if (lien.startsWith('/absences')) return 'absences';
  if (lien.startsWith('/caisse')) return 'caisse';
  if (lien.startsWith('/portail')) return 'portail';
  return 'rheval';
}

/** Catégorie de type de demande (CONGE, MISSION, INTERVENTION…) → application */
export function applicationDeCategorie(categorie?: string | null): ApplicationNotif {
  return categorie === 'MISSION' || categorie === 'INTERVENTION' ? 'missions' : 'absences';
}

/** Lien vers la bonne page selon l'univers de la demande (missions vs congés) */
export function lienDemandesRh(categorie: string | null | undefined, page: 'validations' | 'demandes'): string {
  return applicationDeCategorie(categorie) === 'missions' ? `/absences/missions/${page}` : `/absences/${page}`;
}

/** "absences,missions" → ['absences', 'missions'] (valeurs inconnues ignorées) */
export function lireApplications(valeur?: string): ApplicationNotif[] | undefined {
  if (!valeur) return undefined;
  const liste = valeur
    .split(',')
    .map((v) => v.trim().toLowerCase())
    .filter((v): v is ApplicationNotif => (APPLICATIONS_NOTIF as readonly string[]).includes(v));
  return liste.length > 0 ? liste : undefined;
}

@Injectable()
export class NotificationsService {
  private readonly logger = new Logger(NotificationsService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly mailService: MailService,
  ) {}

  /**
   * Crée une notification in-app dans le portail ET déclenche l'envoi d'e-mail officiel
   */
  async createNotification(dto: CreateNotificationDto) {
    if (!dto.userId) {
      this.logger.warn('[NotificationsService] Impossible de notifier : userId manquant.');
      return null;
    }

    try {
      // 1. Sauvegarde In-App dans PostgreSQL
      const notif = await this.prisma.notifications.create({
        data: {
          userId: dto.userId,
          titre: dto.titre,
          message: dto.message,
          type: dto.type || 'INFO',
          application: dto.application ?? deduireApplication(dto.lien),
          lien: dto.lien || '/dashboard/mon-espace',
          ficheId: dto.ficheId || null,
        },
      });

      this.logger.log(`[NotificationsService] 🔔 Notification In-App créée (#${notif.id}) pour l'utilisateur ${dto.userId} : "${dto.titre}"`);

      // 2. Envoi E-mail asynchrone (non-bloquant) via Brevo SMTP
      if (dto.sendEmail !== false) {
        (async () => {
          let recipientEmail: string | null = null;
          let recipientNom: string | undefined = undefined;

          if (dto.userId.includes('@')) {
            recipientEmail = dto.userId;
            const u = await this.prisma.utilisateurs_cache.findFirst({
              where: { email: { equals: dto.userId, mode: 'insensitive' } },
            });
            if (u?.nom) recipientNom = u.nom;
          } else {
            const u = await this.prisma.utilisateurs_cache.findFirst({
              where: {
                OR: [
                  { id_microsoft: dto.userId },
                  { matricule: dto.userId },
                ],
              },
            });
            if (u?.email) {
              recipientEmail = u.email;
              recipientNom = u.nom;
            }
          }

          if (recipientEmail) {
            await this.mailService.sendNotificationEmail(
              recipientEmail,
              dto.titre,
              dto.message,
              dto.lien,
              recipientNom,
            );
          } else {
            this.logger.warn(`[NotificationsService] Aucun e-mail trouvé pour l'identifiant utilisateur "${dto.userId}"`);
          }
        })().catch((err) => {
          this.logger.warn(`[NotificationsService] Erreur lors du déclenchement de l'e-mail: ${err?.message || err}`);
        });
      }

      return notif;
    } catch (err: any) {
      this.logger.error(`[NotificationsService] Erreur création notification: ${err?.message || err}`);
      return null;
    }
  }

  private resolvedUserMap = new Map<string, { ids: string[]; timestamp: number }>();

  /**
   * Résout l'identifiant Microsoft (id_microsoft) d'un utilisateur, qu'on lui passe un id ou un email
   */
  private async resolveUserId(userId?: string): Promise<string[]> {
    if (!userId) return [];
    const cached = this.resolvedUserMap.get(userId);
    if (cached && Date.now() - cached.timestamp < 5 * 60 * 1000) {
      return cached.ids;
    }

    const candidates = [userId];
    if (userId.includes('@')) {
      const u = await this.prisma.utilisateurs_cache.findUnique({ where: { email: userId } });
      if (u?.id_microsoft) candidates.push(u.id_microsoft);
    } else {
      const u = await this.prisma.utilisateurs_cache.findUnique({ where: { id_microsoft: userId } });
      if (u?.email) candidates.push(u.email);
    }
    this.resolvedUserMap.set(userId, { ids: candidates, timestamp: Date.now() });
    return candidates;
  }

  /** Filtre commun : notifications de l'utilisateur, éventuellement limitées à certaines applications */
  private async filtre(userId: string, applications?: ApplicationNotif[]) {
    const userIds = await this.resolveUserId(userId);
    return {
      userId: { in: userIds },
      ...(applications ? { application: { in: applications } } : {}),
    };
  }

  /**
   * Récupère les notifications de l'utilisateur connecté (toutes applications, ou filtrées)
   */
  async getMyNotifications(userId?: string, limit = 50, applications?: ApplicationNotif[]) {
    if (!userId) return [];
    return this.prisma.notifications.findMany({
      where: await this.filtre(userId, applications),
      orderBy: { createdAt: 'desc' },
      take: Math.min(Math.max(limit, 1), 200),
    });
  }

  /**
   * Nombre de notifications non lues (cloche), éventuellement par application
   */
  async getUnreadCount(userId?: string, applications?: ApplicationNotif[]): Promise<number> {
    if (!userId) return 0;
    return this.prisma.notifications.count({
      where: { ...(await this.filtre(userId, applications)), lu: false },
    });
  }

  /**
   * Non lues par application (badges du portail) : { rheval: 2, absences: 1, … }
   */
  async getUnreadSummary(userId?: string): Promise<Record<string, number>> {
    if (!userId) return {};
    const groupes = await this.prisma.notifications.groupBy({
      by: ['application'],
      where: { ...(await this.filtre(userId)), lu: false },
      _count: { _all: true },
    });
    return Object.fromEntries(groupes.map((g) => [g.application, g._count._all]));
  }

  /**
   * Marque une notification comme lue — uniquement si elle appartient à l'utilisateur
   */
  async markAsRead(id: string, userId?: string): Promise<number> {
    if (!id || !userId) return 0;
    const res = await this.prisma.notifications.updateMany({
      where: { id, ...(await this.filtre(userId)) },
      data: { lu: true },
    });
    return res.count;
  }

  /**
   * Marque comme lues les notifications de l'utilisateur.
   * Avec `applications`, seules celles de ces applications sont concernées
   * (évite qu'une cloche d'application efface les notifications des autres).
   */
  async markAllAsRead(userId?: string, applications?: ApplicationNotif[]): Promise<number> {
    if (!userId) return 0;
    const res = await this.prisma.notifications.updateMany({
      where: { ...(await this.filtre(userId, applications)), lu: false },
      data: { lu: true },
    });
    return res.count;
  }
}
