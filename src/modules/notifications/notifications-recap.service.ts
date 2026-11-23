import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { NotificationsService } from './notifications.service';

/** Heure d'envoi du récapitulatif (heure d'Abidjan = UTC) */
const HEURE_RECAP_UTC = Number(process.env.HEURE_RECAP_NOTIFICATIONS ?? 7);

/**
 * Planificateur du récapitulatif quotidien des notifications
 * (préférence « QUOTIDIEN »). Un envoi par jour à HEURE_RECAP_UTC.
 */
@Injectable()
export class NotificationsRecapService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(NotificationsRecapService.name);
  private timer: NodeJS.Timeout | null = null;

  constructor(private readonly notifications: NotificationsService) {}

  onModuleInit() {
    if (process.env.DESACTIVER_RECAP_NOTIFICATIONS === 'true') return;
    this.planifier();
  }

  onModuleDestroy() {
    if (this.timer) clearTimeout(this.timer);
  }

  private planifier() {
    const maintenant = new Date();
    const prochain = new Date(maintenant);
    prochain.setUTCHours(HEURE_RECAP_UTC, 0, 0, 0);
    if (prochain <= maintenant) prochain.setUTCDate(prochain.getUTCDate() + 1);

    const delai = prochain.getTime() - maintenant.getTime();
    this.logger.log(`📬 Prochain récapitulatif des notifications : ${prochain.toISOString()}`);
    this.timer = setTimeout(async () => {
      try {
        await this.notifications.envoyerRecapitulatifs();
      } catch (e: any) {
        this.logger.error(`Échec du récapitulatif : ${e?.message || e}`);
      }
      this.planifier();
    }, delai);
  }
}
