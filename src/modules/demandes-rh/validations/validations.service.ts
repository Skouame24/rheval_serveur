import { Injectable, NotFoundException, BadRequestException, Logger } from "@nestjs/common";
import { PrismaDemandesService } from "../../../prisma-demandes/prisma-demandes.service";
import { PrismaService } from "../../../prisma/prisma.service";
import { DecisionValidationDto } from "./dto/decision-validation.dto";
import { StatutDemandeRH, DecisionValidation } from "../constants/statuts-demande.constant";
import { SoldesService } from "../soldes/soldes.service";
import { DocumentsService } from "../documents/documents.service";
import { NotificationsService } from "../../notifications/notifications.service";
import { DelegationsService } from "./delegations.service";

@Injectable()
export class ValidationsService {
  private readonly logger = new Logger(ValidationsService.name);

  constructor(
    private readonly prismaDemandes: PrismaDemandesService,
    private readonly prismaShared: PrismaService,
    private readonly soldesService: SoldesService,
    private readonly documentsService: DocumentsService,
    private readonly notificationsService: NotificationsService,
    private readonly delegationsService: DelegationsService,
  ) {}

  // ── 1. VALIDATION PAR LE SUPÉRIEUR DIRECT (N+1) ─────────────
  async validerN1(demandeId: string, valideurId: string, dto: DecisionValidationDto) {
    const demande = await this.prismaDemandes.demandes_rh.findUnique({
      where: { id: demandeId },
      include: { typeDemande: true },
    });

    if (!demande) throw new NotFoundException(`Demande #${demandeId} introuvable.`);

    if (demande.statut !== StatutDemandeRH.EN_ATTENTE_N1 && demande.statut !== StatutDemandeRH.RETOURNEE_N1) {
      throw new BadRequestException(`Cette demande n'est pas en attente de visa N+1 (statut actuel: ${demande.statut}).`);
    }

    if (dto.decision !== DecisionValidation.APPROUVE && !dto.motif?.trim()) {
      throw new BadRequestException("Un motif explicatif est obligatoire pour tout retour ou refus de demande.");
    }

    const valideur = await this.prismaShared.utilisateurs_cache.findUnique({
      where: { id_microsoft: valideurId },
    });

    // Détection si validation directe par le manager ou par un intérimaire habilité
    const isDirect =
      demande.managerId === valideurId ||
      (valideur && (demande.managerId === valideur.id_microsoft || demande.managerId === valideur.email));

    let isInterim = false;
    let delegantNom = '';

    if (!isDirect && demande.managerId) {
      const isInterimActive = await this.delegationsService.isUserActiveInterimForManager(
        valideurId,
        demande.managerId,
      );
      if (isInterimActive) {
        isInterim = true;
        const delegant = await this.prismaShared.utilisateurs_cache.findFirst({
          where: { OR: [{ id_microsoft: demande.managerId }, { email: demande.managerId }] },
        });
        delegantNom = delegant?.nom || 'Responsable N+1';
      }
    }

    const nomValideurFinal = isInterim
      ? `${valideur?.nom || 'Intérimaire'} (par intérim de ${delegantNom})`
      : (valideur ? valideur.nom : 'Responsable N+1');

    const roleValideurFinal = isInterim ? 'INTERIM_N1' : 'N1';
    const motifDecision = isInterim && dto.motif
      ? `[Par intérim de ${delegantNom}] ${dto.motif}`
      : (dto.motif || null);

    let nouveauStatut: StatutDemandeRH;
    let nouvelleEtape = demande.etapeCourante;
    let cycleRejet = demande.cycleRejetCount;

    if (dto.decision === DecisionValidation.APPROUVE) {
      if (demande.typeDemande.workflowDrh) {
        nouveauStatut = StatutDemandeRH.EN_ATTENTE_DRH;
        nouvelleEtape = 2; // Étape 2 : DRH
      } else {
        const needDg = demande.typeDemande.workflowDg && 
          (demande.typeDemande.seuilDgJours === 0 || Number(demande.nombreJours) > demande.typeDemande.seuilDgJours);
        if (needDg) {
          nouveauStatut = StatutDemandeRH.EN_ATTENTE_DG;
          nouvelleEtape = 3; // Étape 3 : DG
        } else {
          nouveauStatut = StatutDemandeRH.APPROUVEE;
          nouvelleEtape = 4;
        }
      }
    } else {
      cycleRejet += 1;
      nouveauStatut = cycleRejet >= 3 ? StatutDemandeRH.REFUSEE : StatutDemandeRH.RETOURNEE_EMPLOYE;
      nouvelleEtape = 1;

      if (nouveauStatut === StatutDemandeRH.REFUSEE && demande.typeDemande.necessiteSolde) {
        await this.soldesService.libererJours(
          demande.salarieId,
          Number(demande.nombreJours),
          demande.dateDebut.getFullYear()
        );
      }
    }

    await this.prismaDemandes.validations_demande.create({
      data: {
        demandeId,
        etape: 1,
        valideurId,
        valideurNom: nomValideurFinal,
        valideurRole: roleValideurFinal,
        decision: dto.decision,
        motif: motifDecision,
      },
    });

    const updated = await this.prismaDemandes.demandes_rh.update({
      where: { id: demandeId },
      data: {
        statut: nouveauStatut,
        etapeCourante: nouvelleEtape,
        cycleRejetCount: cycleRejet,
      },
      include: { typeDemande: true },
    });

    await this.prismaDemandes.historique_demande.create({
      data: {
        demandeId,
        auteurId: valideurId,
        auteurNom: nomValideurFinal,
        action: isInterim ? `DECISION_N1_${dto.decision}_PAR_INTERIM` : `DECISION_N1_${dto.decision}`,
        statutPrecedent: demande.statut as any,
        nouveauStatut,
        commentaire: isInterim
          ? `Avis accordé par intérim (${valideur?.nom || 'Intérimaire'} pour ${delegantNom}). Motif : "${dto.motif || 'Avis favorable'}"`
          : (dto.motif || 'Avis favorable accordé par le Supérieur direct (N+1).'),
      },
    });

    if (dto.decision === DecisionValidation.APPROUVE) {
      const drhUser = await this.prismaShared.utilisateurs_cache.findFirst({
        where: { role: "DRH" },
      });
      if (drhUser) {
        await this.notificationsService.createNotification({
          userId: drhUser.id_microsoft,
          titre: `Demande RH transmise par le N+1 : ${demande.salarieNom || "Collaborateur"}`,
          message: `Demande de ${demande.typeDemande.libelle} (${demande.nombreJours} j) pour ${demande.salarieNom} en attente de vérification DRH.`,
          type: "ACTION",
          lien: "/absences/validations",
        });
      }
    } else {
      await this.notificationsService.createNotification({
        userId: demande.salarieId,
        titre: `Retour sur votre demande : ${dto.decision === DecisionValidation.REFUSE ? "Refusée" : "À corriger"}`,
        message: `Votre manager a formulé l'observation suivante : "${dto.motif}"`,
        type: "ALERTE",
        lien: "/absences/demandes",
      });
    }

    return updated;
  }

  // ── 2. VALIDATION PAR LA DRH ────────────────────────────────
  async validerDRH(demandeId: string, drhId: string, dto: DecisionValidationDto) {
    const demande = await this.prismaDemandes.demandes_rh.findUnique({
      where: { id: demandeId },
      include: { typeDemande: true },
    });

    if (!demande) throw new NotFoundException(`Demande #${demandeId} introuvable.`);

    if (demande.statut !== StatutDemandeRH.EN_ATTENTE_DRH && demande.statut !== StatutDemandeRH.RETOURNEE_DRH) {
      throw new BadRequestException(`Cette demande n'est pas en attente de visa DRH (statut actuel: ${demande.statut}).`);
    }

    if (dto.decision !== DecisionValidation.APPROUVE && !dto.motif?.trim()) {
      throw new BadRequestException("Un motif explicatif est obligatoire pour tout retour ou refus de la DRH.");
    }

    const drhUser = await this.prismaShared.utilisateurs_cache.findUnique({
      where: { id_microsoft: drhId },
    });

    let nouveauStatut: StatutDemandeRH;
    let nouvelleEtape = demande.etapeCourante;

    if (dto.decision === DecisionValidation.APPROUVE) {
      const needDg = demande.typeDemande.workflowDg && 
        (demande.typeDemande.seuilDgJours === 0 || Number(demande.nombreJours) > demande.typeDemande.seuilDgJours);

      if (needDg) {
        nouveauStatut = StatutDemandeRH.EN_ATTENTE_DG;
        nouvelleEtape = 3;
      } else {
        nouveauStatut = StatutDemandeRH.APPROUVEE;
        nouvelleEtape = 4;
      }
    } else {
      nouveauStatut = StatutDemandeRH.RETOURNEE_N1;
      nouvelleEtape = 1;
    }

    await this.prismaDemandes.validations_demande.create({
      data: {
        demandeId,
        etape: 2,
        valideurId: drhId,
        valideurNom: drhUser ? drhUser.nom : "Direction des Ressources Humaines",
        valideurRole: "DRH",
        decision: dto.decision,
        motif: dto.motif || null,
      },
    });

    const updated = await this.prismaDemandes.demandes_rh.update({
      where: { id: demandeId },
      data: {
        statut: nouveauStatut,
        etapeCourante: nouvelleEtape,
      },
      include: { typeDemande: true },
    });

    await this.prismaDemandes.historique_demande.create({
      data: {
        demandeId,
        auteurId: drhId,
        auteurNom: drhUser ? drhUser.nom : "Direction RH",
        action: `DECISION_DRH_${dto.decision}`,
        statutPrecedent: demande.statut as any,
        nouveauStatut,
        commentaire: dto.motif || "Vérification de conformité et solde effectuée avec succès par la DRH.",
      },
    });

    if (dto.decision === DecisionValidation.APPROUVE) {
      if (nouveauStatut === StatutDemandeRH.EN_ATTENTE_DG) {
        const dgUser = await this.prismaShared.utilisateurs_cache.findFirst({
          where: { OR: [{ role: "N2" }, { isCodir: true }] },
        });
        if (dgUser) {
          await this.notificationsService.createNotification({
            userId: dgUser.id_microsoft,
            titre: `Demande RH à valider (Direction) : ${demande.salarieNom || "Collaborateur"}`,
            message: `Demande de ${demande.typeDemande.libelle} (${demande.nombreJours} j) vérifiée par la DRH, soumise à votre validation.`,
            type: "ACTION",
            lien: "/absences/validations",
          });
        }
      } else {
        await this.notificationsService.createNotification({
          userId: demande.salarieId,
          titre: `Demande RH validée par la DRH : ${demande.typeDemande.libelle}`,
          message: `Votre demande de ${demande.typeDemande.libelle} (${demande.nombreJours} j) a été validée avec succès.`,
          type: "INFO",
          lien: "/absences/demandes",
        });
      }
    } else {
      if (demande.managerId) {
        await this.notificationsService.createNotification({
          userId: demande.managerId,
          titre: `Retour DRH sur la demande de : ${demande.salarieNom}`,
          message: `La DRH a renvoyé le dossier avec l'observation : "${dto.motif}"`,
          type: "ALERTE",
          lien: "/absences/validations",
        });
      }
    }

    return updated;
  }

  // ── 3. VALIDATION PAR LA DIRECTION GÉNÉRALE (DG) ────────────
  async validerDG(demandeId: string, dgId: string, dto: DecisionValidationDto) {
    const demande = await this.prismaDemandes.demandes_rh.findUnique({
      where: { id: demandeId },
      include: { typeDemande: true },
    });

    if (!demande) throw new NotFoundException(`Demande #${demandeId} introuvable.`);

    if (demande.statut !== StatutDemandeRH.EN_ATTENTE_DG) {
      throw new BadRequestException(`Cette demande n'est pas en attente de visa Direction (statut actuel: ${demande.statut}).`);
    }

    if (dto.decision !== DecisionValidation.APPROUVE && !dto.motif?.trim()) {
      throw new BadRequestException("Un motif explicatif est obligatoire pour tout retour ou refus de la Direction.");
    }

    const dgUser = await this.prismaShared.utilisateurs_cache.findUnique({
      where: { id_microsoft: dgId },
    });

    let nouveauStatut: StatutDemandeRH;
    let nouvelleEtape = demande.etapeCourante;

    if (dto.decision === DecisionValidation.APPROUVE) {
      nouveauStatut = StatutDemandeRH.APPROUVEE;
      nouvelleEtape = 4;
    } else {
      nouveauStatut = StatutDemandeRH.RETOURNEE_DRH;
      nouvelleEtape = 2;
    }

    await this.prismaDemandes.validations_demande.create({
      data: {
        demandeId,
        etape: 3,
        valideurId: dgId,
        valideurNom: dgUser ? dgUser.nom : "Direction Générale",
        valideurRole: "DG",
        decision: dto.decision,
        motif: dto.motif || null,
      },
    });

    const updated = await this.prismaDemandes.demandes_rh.update({
      where: { id: demandeId },
      data: {
        statut: nouveauStatut,
        etapeCourante: nouvelleEtape,
      },
      include: { typeDemande: true },
    });

    await this.prismaDemandes.historique_demande.create({
      data: {
        demandeId,
        auteurId: dgId,
        auteurNom: dgUser ? dgUser.nom : "Direction Générale",
        action: `DECISION_DG_${dto.decision}`,
        statutPrecedent: demande.statut as any,
        nouveauStatut,
        commentaire: dto.motif || "Accord final accordé par la Direction Générale.",
      },
    });

    const drhUser = await this.prismaShared.utilisateurs_cache.findFirst({
      where: { role: "DRH" },
    });
    if (drhUser) {
      await this.notificationsService.createNotification({
        userId: drhUser.id_microsoft,
        titre: dto.decision === DecisionValidation.APPROUVE ? `Demande approuvée par la DG : ${demande.salarieNom}` : `Demande retournée par la DG : ${demande.salarieNom}`,
        message: dto.decision === DecisionValidation.APPROUVE ? `Le titre d'absence de ${demande.salarieNom} peut être édité.` : `Motif DG : "${dto.motif}"`,
        type: "INFO",
        lien: "/absences/validations",
      });
    }

    return updated;
  }

  // ── 4. ÉDITION DE LA PERMISSION OFFICIELLE ET ARCHIVAGE ─────
  async editerPermissionEtCloturer(demandeId: string, agentId: string) {
    const demande = await this.prismaDemandes.demandes_rh.findUnique({
      where: { id: demandeId },
      include: { typeDemande: true },
    });

    if (!demande) throw new NotFoundException(`Demande #${demandeId} introuvable.`);

    if (demande.statut !== StatutDemandeRH.APPROUVEE) {
      throw new BadRequestException("Seule une demande approuvée par la Direction peut être éditée et archivée.");
    }

    const annee = demande.dateDebut.getFullYear();
    const numeroTitre = await this.documentsService.genererNumeroTitre(annee);

    if (demande.typeDemande.necessiteSolde) {
      await this.soldesService.debiterJoursDefinitif(
        demande.salarieId,
        Number(demande.nombreJours),
        annee
      );
    }

    const agentUser = await this.prismaShared.utilisateurs_cache.findUnique({
      where: { id_microsoft: agentId },
    });

    const updated = await this.prismaDemandes.demandes_rh.update({
      where: { id: demandeId },
      data: {
        statut: StatutDemandeRH.ARCHIVEE,
        numeroTitre,
        etapeCourante: 4,
      },
      include: { typeDemande: true },
    });

    await this.prismaDemandes.historique_demande.create({
      data: {
        demandeId,
        auteurId: agentId,
        auteurNom: agentUser ? agentUser.nom : "Agent DRH",
        action: "EDITION_ET_ARCHIVAGE_GED",
        statutPrecedent: StatutDemandeRH.APPROUVEE,
        nouveauStatut: StatutDemandeRH.ARCHIVEE,
        commentaire: `Titre officiel édité sous la référence ${numeroTitre} et archivé en GED.`,
      },
    });

    await this.notificationsService.createNotification({
      userId: demande.salarieId,
      titre: `Votre titre d'absence est disponible (${numeroTitre})`,
      message: `Votre demande de ${demande.typeDemande.libelle} (${demande.nombreJours} j) a été officiellement approuvée et scellée.`,
      type: "INFO",
      lien: "/absences/demandes",
    });

    return updated;
  }

  // ── LISTES POUR CHAQUE ACTEUR ───────────────────────────────
  async getDemandesAValiderN1(managerId: string) {
    const mgr = await this.prismaShared.utilisateurs_cache.findFirst({
      where: {
        OR: [
          { id_microsoft: managerId },
          { email: managerId },
        ],
      },
    });

    const mgrIds = [managerId];
    if (mgr) {
      if (mgr.id_microsoft && !mgrIds.includes(mgr.id_microsoft)) mgrIds.push(mgr.id_microsoft);
      if (mgr.email && !mgrIds.includes(mgr.email)) mgrIds.push(mgr.email);
    }

    // Récupérer les délégations actives où cet utilisateur est désigné intérimaire
    const activeDelegations = await this.delegationsService.getActiveDelegationsForInterim(managerId);
    for (const del of activeDelegations) {
      if (!mgrIds.includes(del.managerId)) mgrIds.push(del.managerId);
      if (del.managerEmail && !mgrIds.includes(del.managerEmail)) mgrIds.push(del.managerEmail);
    }

    const demandes = await this.prismaDemandes.demandes_rh.findMany({
      where: {
        managerId: { in: mgrIds },
        statut: { in: [StatutDemandeRH.EN_ATTENTE_N1, StatutDemandeRH.RETOURNEE_N1] },
      },
      include: {
        typeDemande: true,
        validations: true,
      },
      orderBy: { createdAt: "desc" },
    });

    // Taguer les demandes reçues par intérim / délégation
    return demandes.map((d) => {
      const isForDelegation =
        d.managerId !== managerId &&
        (!mgr || (d.managerId !== mgr.id_microsoft && d.managerId !== mgr.email));

      const matchedDelegation = isForDelegation
        ? activeDelegations.find((del) => del.managerId === d.managerId || del.managerEmail === d.managerId)
        : null;

      return {
        ...d,
        estDelegation: isForDelegation,
        delegueParNom: matchedDelegation ? matchedDelegation.managerNom : (isForDelegation ? 'Responsable N+1' : null),
        delegueMotif: matchedDelegation ? matchedDelegation.motif : null,
      };
    });
  }

  async getDemandesAValiderDRH() {
    return this.prismaDemandes.demandes_rh.findMany({
      where: {
        statut: { in: [StatutDemandeRH.EN_ATTENTE_DRH, StatutDemandeRH.RETOURNEE_DRH, StatutDemandeRH.APPROUVEE] },
      },
      include: {
        typeDemande: true,
        validations: true,
      },
      orderBy: { createdAt: "desc" },
    });
  }

  async getDemandesAValiderDG() {
    return this.prismaDemandes.demandes_rh.findMany({
      where: {
        statut: StatutDemandeRH.EN_ATTENTE_DG,
      },
      include: {
        typeDemande: true,
        validations: true,
      },
      orderBy: { createdAt: "desc" },
    });
  }
}
