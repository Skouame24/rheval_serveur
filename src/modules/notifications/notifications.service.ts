import { BadRequestException, Injectable, Logger } from '@nestjs/common';
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

/** Préférence d'e-mail par application (les notifications restent toujours dans le portail) */
export const MODES_EMAIL = ['IMMEDIAT', 'ACTIONS', 'QUOTIDIEN', 'AUCUN'] as const;
export type ModeEmail = (typeof MODES_EMAIL)[number];

/** Applications réglables par l'utilisateur (le portail lui-même n'envoie pas d'e-mail) */
export const APPLICATIONS_REGLABLES: ApplicationNotif[] = ['rheval', 'absences', 'missions', 'caisse'];

const echapper = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c] as string);

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

      // 2. E-mail asynchrone (non bloquant), selon la préférence de l'utilisateur pour cette application
      if (dto.sendEmail !== false) {
        (async () => {
          const u = await this.prisma.utilisateurs_cache.findFirst({
            where: dto.userId.includes('@')
              ? { email: { equals: dto.userId, mode: 'insensitive' } }
              : { OR: [{ id_microsoft: dto.userId }, { matricule: dto.userId }] },
            select: { id_microsoft: true, email: true, nom: true },
          });
          const recipientEmail = u?.email ?? (dto.userId.includes('@') ? dto.userId : null);
          if (!recipientEmail) {
            this.logger.warn(`[NotificationsService] Aucun e-mail trouvé pour l'identifiant utilisateur "${dto.userId}"`);
            return;
          }

          const mode = u ? await this.modeEmail(u.id_microsoft, notif.application) : 'IMMEDIAT';
          if (mode === 'AUCUN') return;
          if (mode === 'ACTIONS' && notif.type === 'INFO') return;
          if (mode === 'QUOTIDIEN') {
            await this.prisma.notifications.update({ where: { id: notif.id }, data: { emailEnAttente: true } });
            return;
          }

          await this.mailService.sendNotificationEmail(recipientEmail, dto.titre, dto.message, dto.lien, u?.nom);
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

  // ─── Préférences d'e-mail ────────────────────────────────

  private async modeEmail(userId: string, application: string): Promise<ModeEmail> {
    const pref = await this.prisma.preferences_notifications.findUnique({
      where: { userId_application: { userId, application } },
      select: { email: true },
    });
    return (MODES_EMAIL as readonly string[]).includes(pref?.email ?? '') ? (pref!.email as ModeEmail) : 'IMMEDIAT';
  }

  async getPreferences(userId: string): Promise<Record<string, ModeEmail>> {
    const lignes = await this.prisma.preferences_notifications.findMany({ where: { userId } });
    const res: Record<string, ModeEmail> = {};
    for (const app of APPLICATIONS_REGLABLES) {
      const l = lignes.find((x) => x.application === app);
      res[app] = l && (MODES_EMAIL as readonly string[]).includes(l.email) ? (l.email as ModeEmail) : 'IMMEDIAT';
    }
    return res;
  }

  async setPreference(userId: string, application: string, email: string) {
    if (!(APPLICATIONS_REGLABLES as string[]).includes(application) || !(MODES_EMAIL as readonly string[]).includes(email)) {
      throw new BadRequestException('Application ou mode d’envoi inconnu.');
    }
    await this.prisma.preferences_notifications.upsert({
      where: { userId_application: { userId, application } },
      create: { userId, application, email },
      update: { email },
    });
    return this.getPreferences(userId);
  }

  // ─── Récapitulatif quotidien ─────────────────────────────

  /** Envoie un e-mail récapitulatif par utilisateur pour les notifications mises en attente. */
  async envoyerRecapitulatifs(): Promise<{ destinataires: number; notifications: number }> {
    const enAttente = await this.prisma.notifications.findMany({
      where: { emailEnAttente: true },
      orderBy: { createdAt: 'desc' },
      select: { id: true, userId: true, titre: true, application: true, lu: true },
    });
    if (enAttente.length === 0) return { destinataires: 0, notifications: 0 };

    const parUtilisateur = new Map<string, typeof enAttente>();
    for (const n of enAttente) {
      const liste = parUtilisateur.get(n.userId) ?? [];
      liste.push(n);
      parUtilisateur.set(n.userId, liste);
    }

    const LIBELLES: Record<string, string> = {
      rheval: 'Évaluations', absences: 'Congés & absences', missions: 'Missions', caisse: 'Caisse', portail: 'Portail',
    };

    let destinataires = 0;
    for (const [userId, notifs] of parUtilisateur) {
      // Marquées d'abord : jamais de double envoi même si l'e-mail échoue
      await this.prisma.notifications.updateMany({
        where: { id: { in: notifs.map((n) => n.id) } },
        data: { emailEnAttente: false },
      });
      const nonLues = notifs.filter((n) => !n.lu);
      if (nonLues.length === 0) continue; // déjà vues dans le portail : inutile d'écrire

      const u = await this.prisma.utilisateurs_cache.findUnique({
        where: { id_microsoft: userId },
        select: { email: true, nom: true },
      });
      if (!u?.email) continue;

      const visibles = nonLues.slice(0, 10);
      const lignes = visibles
        .map((n) => `<li style="margin:0 0 8px 0;"><strong>${echapper(LIBELLES[n.application] ?? n.application)}</strong> — ${echapper(n.titre)}</li>`)
        .join('');
      const reste = nonLues.length - visibles.length;
      const message =
        `Voici ce qui s'est passé depuis votre dernier récapitulatif :` +
        `<ul style="padding-left:18px;margin:16px 0;">${lignes}</ul>` +
        (reste > 0 ? `<p>… et ${reste} autre${reste > 1 ? 's' : ''}.</p>` : '');
      const titre = nonLues.length === 1 ? 'Votre récapitulatif : 1 notification' : `Votre récapitulatif : ${nonLues.length} notifications`;

      await this.mailService
        .sendNotificationEmail(u.email, titre, message, '/portail', u.nom)
        .catch((e) => this.logger.warn(`[Récapitulatif] Échec d'envoi à ${u.email} : ${e?.message || e}`));
      destinataires++;
    }
    this.logger.log(`[Récapitulatif] ${destinataires} e-mail(s) pour ${enAttente.length} notification(s).`);
    return { destinataires, notifications: enAttente.length };
  }
}
