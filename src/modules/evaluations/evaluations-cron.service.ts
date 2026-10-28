import { Injectable, Logger, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { NotificationsService } from '../notifications/notifications.service';

export interface RelanceDetail {
  ficheId: string;
  salarieNom: string;
  statut: string;
  destinataires: string[];
  nbJoursEnAttente: number;
  actionRequise: string;
}

export interface RelancesExecutionResult {
  dateExecution: string;
  seuilJours: number;
  totalFichesAnalysee: number;
  relancesEnvoyees: number;
  details: RelanceDetail[];
}

@Injectable()
export class EvaluationsCronService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(EvaluationsCronService.name);
  private timer: NodeJS.Timeout | null = null;
  private lastExecution: RelancesExecutionResult | null = null;
  private isRunning = false;

  constructor(
    private readonly prisma: PrismaService,
    private readonly notificationsService: NotificationsService,
  ) {}

  onModuleInit() {
    this.logger.log('⏰ [EvaluationsCronService] Initialisation du planificateur de relances automatiques...');
    
    // 1. Premier scan de relances différé de 15 secondes après le démarrage
    setTimeout(() => {
      this.logger.log('🚀 [EvaluationsCronService] Exécution de contrôle initiale au démarrage...');
      this.executeRelances(5).catch((err) => {
        this.logger.error(`[EvaluationsCronService] Erreur lors du contrôle initial : ${err?.message || err}`);
      });
    }, 15000);

    // 2. Programmation du cron quotidien à 08:30 chaque matin
    this.scheduleNextDailyRun();
  }

  onModuleDestroy() {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  }

  /**
   * Calcule le délai jusqu'au prochain 08h30 et arme le minuteur quotidien
   */
  private scheduleNextDailyRun() {
    const now = new Date();
    const nextRun = new Date();
    nextRun.setHours(8, 30, 0, 0);

    // Si 08h30 est déjà passé aujourd'hui, on vise demain 08h30
    if (now.getTime() >= nextRun.getTime()) {
      nextRun.setDate(nextRun.getDate() + 1);
    }

    const delayMs = nextRun.getTime() - now.getTime();
    this.logger.log(
      `📅 [EvaluationsCronService] Prochain cron de relances prévu le ${nextRun.toLocaleDateString('fr-FR')} à 08h30 (dans ${Math.round(
        delayMs / 60000,
      )} minutes)`,
    );

    this.timer = setTimeout(async () => {
      try {
        this.logger.log('⏰ [EvaluationsCronService] Déclenchement du cron quotidien de 08h30...');
        await this.executeRelances(5);
      } catch (err: any) {
        this.logger.error(`[EvaluationsCronService] Erreur lors du cron quotidien : ${err?.message || err}`);
      } finally {
        this.scheduleNextDailyRun(); // Réarmement pour le lendemain
      }
    }, delayMs);
  }

  /**
   * Analyse toutes les fiches d'évaluation en attente depuis >= seuilJours
   * et déclenche les notifications in-app et les e-mails aux acteurs concernés.
   */
  async executeRelances(seuilJours = 5): Promise<RelancesExecutionResult> {
    if (this.isRunning) {
      this.logger.warn('[EvaluationsCronService] Une exécution de relances est déjà en cours.');
      return (
        this.lastExecution || {
          dateExecution: new Date().toISOString(),
          seuilJours,
          totalFichesAnalysee: 0,
          relancesEnvoyees: 0,
          details: [],
        }
      );
    }

    this.isRunning = true;
    const now = new Date();
    const seuilMs = seuilJours * 24 * 60 * 60 * 1000;
    const details: RelanceDetail[] = [];
    let relancesEnvoyees = 0;

    try {
      // 1. Récupération des cycles actifs
      const activeCycles = await this.prisma.cycles_evaluation.findMany({
        where: { statut: { notIn: ['CLOTURE', 'ARCHIVE'] } },
        select: { id: true, libelle: true },
      });

      if (activeCycles.length === 0) {
        this.logger.log('[EvaluationsCronService] Aucun cycle d’évaluation actif trouvé.');
        return {
          dateExecution: now.toISOString(),
          seuilJours,
          totalFichesAnalysee: 0,
          relancesEnvoyees: 0,
          details: [],
        };
      }

      const cycleIds = activeCycles.map((c) => c.id);

      // 2. Fiches en attente d'une action
      const STATUTS_TERMINAUX = ['VALIDE', 'CLOTURE', 'VALIDE_RH', 'ARCHIVE'];
      const fiches = await this.prisma.fiches_evaluation.findMany({
        where: {
          cycleId: { in: cycleIds },
          statut: { notIn: STATUTS_TERMINAUX },
        },
        include: {
          utilisateurs_cache: true,
          cycles_evaluation: true,
        },
      });

      // Utilisateurs RH
      const rhUsers = await this.prisma.utilisateurs_cache.findMany({
        where: { role: 'RH' },
      });

      for (const fiche of fiches) {
        const lastUpdated = new Date(fiche.updatedAt || fiche.createdAt);
        const elapsedMs = now.getTime() - lastUpdated.getTime();
        const nbJours = Math.floor(elapsedMs / (1000 * 60 * 60 * 24));

        if (nbJours < seuilJours) {
          continue; // Pas encore dépassé le seuil de relance
        }

        // Anti-spam : vérifier si une relance a déjà été envoyée pour cette fiche au cours des 24 dernières heures
        const recentRelance = await this.prisma.notifications.findFirst({
          where: {
            ficheId: fiche.id,
            titre: { contains: '[Relance Automatique]' },
            createdAt: { gte: new Date(now.getTime() - 24 * 60 * 60 * 1000) },
          },
        });

        if (recentRelance) {
          continue; // Déjà relancé aujourd'hui
        }

        // Identifier les acteurs hiérarchiques
        const salarie = fiche.utilisateurs_cache;
        const salarieNom = salarie?.nom || 'Collaborateur';
        let n1 = null;
        let n2 = null;

        if (salarie?.managerId) {
          n1 = await this.prisma.utilisateurs_cache.findUnique({
            where: { id_microsoft: salarie.managerId },
          });
          if (n1?.managerId) {
            n2 = await this.prisma.utilisateurs_cache.findUnique({
              where: { id_microsoft: n1.managerId },
            });
          }
        }

        // Déterminer la cible de la relance selon le statut
        const destinataires: string[] = [];
        let actionRequise = '';
        let titre = '';
        let message = '';
        let lien = '/dashboard/mon-espace';
        const targetUsers: Array<{ id: string; email?: string; nom?: string }> = [];

        switch (fiche.statut) {
          case 'FIXATION_OBJECTIFS':
            actionRequise = 'Fixation des objectifs annuels par le Manager (N+1)';
            titre = `[Relance Automatique] Objectifs 2026 à définir : ${salarieNom}`;
            message = `Bonjour, le dossier de ${salarieNom} est en attente de la définition de ses objectifs annuels depuis ${nbJours} jours. Merci de finaliser la fixation des objectifs.`;
            lien = '/dashboard/mon-equipe/evaluations';
            if (n1) targetUsers.push({ id: n1.id_microsoft, email: n1.email, nom: n1.nom });
            break;

          case 'VALIDATION_OBJECTIFS_RH':
            actionRequise = 'Validation RH des objectifs';
            titre = `[Relance Automatique] Validation RH requise : ${salarieNom}`;
            message = `Bonjour, les objectifs annuels de ${salarieNom} (fixés par ${n1?.nom || 'N+1'}) sont en attente de validation RH depuis ${nbJours} jours.`;
            lien = '/dashboard/pilotage-rh';
            for (const rh of rhUsers) {
              targetUsers.push({ id: rh.id_microsoft, email: rh.email, nom: rh.nom });
            }
            break;

          case 'VALIDATION_OBJECTIFS_N2':
            actionRequise = 'Validation Direction (N+2) des objectifs';
            titre = `[Relance Automatique] Validation Direction N+2 requise : ${salarieNom}`;
            message = `Bonjour, les objectifs de ${salarieNom} sont en attente de votre validation Direction depuis ${nbJours} jours.`;
            lien = '/dashboard/mon-equipe/evaluations';
            if (n2) targetUsers.push({ id: n2.id_microsoft, email: n2.email, nom: n2.nom });
            break;

          case 'VALIDATION_OBJECTIFS_SALARIE':
            actionRequise = 'Confirmation des objectifs par le Collaborateur';
            titre = `[Relance Automatique] Confirmation de vos objectifs requise`;
            message = `Bonjour ${salarieNom}, vos objectifs ont été validés par votre hiérarchie et les RH depuis ${nbJours} jours. Merci de vous connecter pour en prendre connaissance et confirmer votre accord.`;
            lien = '/dashboard/mon-espace';
            if (salarie) targetUsers.push({ id: salarie.id_microsoft, email: salarie.email, nom: salarieNom });
            break;

          case 'AUTO_EVALUATION':
          case 'EVALUATION_N1':
          case 'EN_ATTENTE_N1':
            actionRequise = "Notation et Bilan d'évaluation par le Manager (N+1)";
            titre = `[Relance Automatique] Bilan d'évaluation à compléter : ${salarieNom}`;
            message = `Bonjour, l'évaluation annuelle de ${salarieNom} est en attente de votre notation et de la proposition de plan de formation depuis ${nbJours} jours.`;
            lien = '/dashboard/mon-equipe/evaluations';
            if (n1) targetUsers.push({ id: n1.id_microsoft, email: n1.email, nom: n1.nom });
            break;

          case 'EVALUATION_N2':
          case 'EN_ATTENTE_N2':
            actionRequise = "Validation Direction (N+2) de l'évaluation";
            titre = `[Relance Automatique] Validation Évaluation Direction : ${salarieNom}`;
            message = `Bonjour, l'évaluation de ${salarieNom} réalisée par ${n1?.nom || 'N+1'} est en attente de validation Direction depuis ${nbJours} jours.`;
            lien = '/dashboard/mon-equipe/evaluations';
            if (n2) targetUsers.push({ id: n2.id_microsoft, email: n2.email, nom: n2.nom });
            break;

          case 'VISA_SALARIE':
          case 'EN_ATTENTE_SIGNATURE':
            actionRequise = 'Signature & Visa final par le Collaborateur';
            titre = `[Relance Automatique] Signature de votre évaluation requise`;
            message = `Bonjour ${salarieNom}, votre évaluation annuelle a été validée par la Direction depuis ${nbJours} jours. Merci de consulter vos notes et d'apposer votre visa électronique.`;
            lien = '/dashboard/mon-espace';
            if (salarie) targetUsers.push({ id: salarie.id_microsoft, email: salarie.email, nom: salarieNom });
            break;

          case 'ARBITRAGE':
            actionRequise = 'Arbitrage du dossier par la DRH';
            titre = `[Relance Automatique] Arbitrage DRH en attente : ${salarieNom}`;
            message = `Bonjour, le dossier de ${salarieNom} est en attente d'arbitrage DRH suite à un désaccord depuis ${nbJours} jours.`;
            lien = '/dashboard/pilotage-rh/arbitrages';
            for (const rh of rhUsers) {
              targetUsers.push({ id: rh.id_microsoft, email: rh.email, nom: rh.nom });
            }
            break;

          default:
            break;
        }

        // Envoi des notifications In-App + Mails
        for (const target of targetUsers) {
          if (!target.id) continue;
          destinataires.push(`${target.nom || 'Utilisateur'} (${target.email || target.id})`);

          await this.notificationsService.createNotification({
            userId: target.id,
            titre,
            message,
            type: 'ALERTE',
            lien,
            ficheId: fiche.id,
            sendEmail: true,
          });
          relancesEnvoyees++;
        }

        if (destinataires.length > 0) {
          details.push({
            ficheId: fiche.id,
            salarieNom,
            statut: fiche.statut,
            destinataires,
            nbJoursEnAttente: nbJours,
            actionRequise,
          });
        }
      }

      const result: RelancesExecutionResult = {
        dateExecution: now.toISOString(),
        seuilJours,
        totalFichesAnalysee: fiches.length,
        relancesEnvoyees,
        details,
      };

      this.lastExecution = result;
      this.logger.log(
        `✅ [EvaluationsCronService] Relances terminées : ${relancesEnvoyees} notification(s) / e-mail(s) envoyée(s) pour ${details.length} fiche(s) en attente (sur ${fiches.length} analysées).`,
      );

      return result;
    } catch (err: any) {
      this.logger.error(`[EvaluationsCronService] Erreur lors de l'exécution des relances : ${err?.message || err}`);
      throw err;
    } finally {
      this.isRunning = false;
    }
  }

  /**
   * Retourne l'état courant du planificateur de relances
   */
  getStatus() {
    const nextDaily = new Date();
    nextDaily.setHours(8, 30, 0, 0);
    if (new Date().getTime() >= nextDaily.getTime()) {
      nextDaily.setDate(nextDaily.getDate() + 1);
    }

    return {
      active: true,
      prochaineExecution: nextDaily.toISOString(),
      derniereExecution: this.lastExecution,
    };
  }
}

