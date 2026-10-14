import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { MailService } from '../mail/mail.service';

export interface CreateNotificationDto {
  userId: string;
  titre: string;
  message: string;
  type?: 'INFO' | 'ACTION' | 'VALIDATION' | 'ALERTE';
  lien?: string;
  ficheId?: string;
  sendEmail?: boolean;
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
          lien: dto.lien || '/dashboard/mon-espace',
          ficheId: dto.ficheId || null,
        },
      });

      this.logger.log(`[NotificationsService] 🔔 Notification In-App créée (#${notif.id}) pour l'utilisateur ${dto.userId} : "${dto.titre}"`);

      // 2. Envoi E-mail asynchrone (non-bloquant)
      if (dto.sendEmail !== false) {
        this.prisma.utilisateurs_cache.findUnique({
          where: { id_microsoft: dto.userId },
        }).then((user) => {
          if (user?.email) {
            this.mailService.sendNotificationEmail(
              user.email,
              dto.titre,
              dto.message,
              dto.lien,
              user.nom,
            );
          }
        }).catch((err) => {
          this.logger.warn(`[NotificationsService] Erreur lors de la récupération de l'email utilisateur: ${err?.message || err}`);
        });
      }

      return notif;
    } catch (err: any) {
      this.logger.error(`[NotificationsService] Erreur création notification: ${err?.message || err}`);
      return null;
    }
  }

  /**
   * Récupère la liste des notifications réelles de l'utilisateur connecté
   */
  async getMyNotifications(userId?: string, limit = 50) {
    if (!userId) return [];

    return this.prisma.notifications.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: limit,
    });
  }

  /**
   * Compte en direct le nombre de notifications non lues (pour la cloche du Header)
   */
  async getUnreadCount(userId?: string): Promise<number> {
    if (!userId) return 0;

    return this.prisma.notifications.count({
      where: {
        userId,
        lu: false,
      },
    });
  }

  /**
   * Marque une notification spécifique comme lue
   */
  async markAsRead(id: string, userId?: string) {
    if (!id) return;

    return this.prisma.notifications.updateMany({
      where: {
        id,
        ...(userId ? { userId } : {}),
      },
      data: {
        lu: true,
      },
    });
  }

  /**
   * Marque toutes les notifications non lues de l'utilisateur comme lues
   */
  async markAllAsRead(userId?: string) {
    if (!userId) return;

    return this.prisma.notifications.updateMany({
      where: {
        userId,
        lu: false,
      },
      data: {
        lu: true,
      },
    });
  }
}

