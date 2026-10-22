import { Injectable, NotFoundException, BadRequestException, Logger } from "@nestjs/common";
import { PrismaDemandesService } from "../../../prisma-demandes/prisma-demandes.service";
import { PrismaService } from "../../../prisma/prisma.service";
import { CreateDemandeDto } from "./dto/create-demande.dto";
import { StatutDemandeRH } from "../constants/statuts-demande.constant";
import { calculerNombreJoursOuvres } from "../utils/date-calcul.util";
import { SoldesService } from "../soldes/soldes.service";
import { DocumentsService } from "../documents/documents.service";
import { NotificationsService } from "../../notifications/notifications.service";

@Injectable()
export class DemandesService {
  private readonly logger = new Logger(DemandesService.name);

  constructor(
    private readonly prismaDemandes: PrismaDemandesService,
    private readonly prismaShared: PrismaService,
    private readonly soldesService: SoldesService,
    private readonly documentsService: DocumentsService,
    private readonly notificationsService: NotificationsService
  ) {}

  async getTypesDemande() {
    return this.prismaDemandes.types_demande.findMany({
      where: { actif: true },
      orderBy: { categorie: "asc" },
    });
  }

  async verifierChevauchement(salarieId: string, debut: Date, fin: Date, excludeId?: string): Promise<boolean> {
    const existing = await this.prismaDemandes.demandes_rh.findFirst({
      where: {
        salarieId,
        id: excludeId ? { not: excludeId } : undefined,
        statut: {
          notIn: [StatutDemandeRH.ANNULEE, StatutDemandeRH.REFUSEE],
        },
        OR: [
          {
            dateDebut: { lte: fin },
            dateFin: { gte: debut },
          },
        ],
      },
    });

    return !!existing;
  }

  async createDemande(salarieId: string, dto: CreateDemandeDto) {
    const dDebut = new Date(dto.dateDebut);
    const dFin = new Date(dto.dateFin);

    if (dDebut > dFin) {
      throw new BadRequestException("La date de début doit être antérieure ou égale à la date de fin.");
    }

    // 1. Informations collaborateur depuis l'annuaire partagé
    const salarie = await this.prismaShared.utilisateurs_cache.findFirst({
      where: {
        OR: [
          { id_microsoft: salarieId },
          { email: salarieId },
        ],
      },
    });

    const actualSalarieId = salarie ? salarie.id_microsoft : salarieId;
    const nomComplet = salarie ? salarie.nom : "Collaborateur";
    const email = salarie ? salarie.email : null;
    const poste = salarie ? salarie.poste : null;
    const direction = salarie ? salarie.departement : null;
    const managerId = salarie ? salarie.managerId : null;

    // 2. Type de demande
    const typeDemande = await this.prismaDemandes.types_demande.findUnique({
      where: { code: dto.typeCode },
    });
    if (!typeDemande) {
      throw new NotFoundException(`Type de demande '${dto.typeCode}' inconnu.`);
    }

    // 3. Décompte des jours ouvrés
    const nombreJours = calculerNombreJoursOuvres(
      dDebut,
      dFin,
      dto.demiJourneeDebut,
      dto.demiJourneeFin
    );

    // 4. Contrôle de chevauchement calendaire
    const chevauchement = await this.verifierChevauchement(salarieId, dDebut, dFin);
    if (chevauchement) {
      throw new BadRequestException(
        "Vous avez déjà une demande d'absence ou mission validée ou en cours de traitement sur cette période."
      );
    }

    // 5. Contrôle et réservation du solde de congés si applicable
    if (typeDemande.necessiteSolde) {
      const annee = dDebut.getFullYear();
      await this.soldesService.reserverJours(actualSalarieId, nombreJours, annee);
    }

    // 6. Numérotation unique séquentielle
    const numeroDemande = await this.documentsService.genererNumeroDemande(dDebut.getFullYear());

    // 7. Enregistrement dans la base Demandes RH
    const demande = await this.prismaDemandes.demandes_rh.create({
      data: {
        numeroDemande,
        salarieId: actualSalarieId,
        salarieNom: nomComplet,
        salarieEmail: email,
        salariePoste: poste,
        salarieDirection: direction,
        managerId,
        typeId: typeDemande.id,
        dateDebut: dDebut,
        dateFin: dFin,
        demiJourneeDebut: !!dto.demiJourneeDebut,
        demiJourneeFin: !!dto.demiJourneeFin,
        nombreJours,
        motif: dto.motif,
        destination: dto.destination || null,
        moyenTransport: dto.moyenTransport || null,
        fraisEstimes: dto.fraisEstimes || null,
        statut: StatutDemandeRH.EN_ATTENTE_N1,
        etapeCourante: 1,
        cycleRejetCount: 0,
      },
      include: {
        typeDemande: true,
      },
    });

    // 8. Journal d'audit
    await this.prismaDemandes.historique_demande.create({
      data: {
        demandeId: demande.id,
        auteurId: salarieId,
        auteurNom: nomComplet,
        action: "SOUMISSION",
        nouveauStatut: StatutDemandeRH.EN_ATTENTE_N1,
        commentaire: `Demande de ${nombreJours} jour(s) soumise par le collaborateur.`,
      },
    });

    // 9. Notification du Responsable N+1
    if (managerId) {
      await this.notificationsService.createNotification({
        userId: managerId,
        titre: `Nouvelle demande RH : ${nomComplet}`,
        message: `${nomComplet} a soumis une demande de ${typeDemande.libelle} (${nombreJours} j) du ${dDebut.toLocaleDateString("fr-FR")} au ${dFin.toLocaleDateString("fr-FR")}.`,
        type: "ACTION",
        lien: "/dashboard/mon-equipe/demandes",
      });
    }

    this.logger.log(`[DemandesService] Demande ${numeroDemande} créée pour ${nomComplet} (${nombreJours} j)`);
    return demande;
  }

  async getMesDemandes(salarieId: string) {
    const salarie = await this.prismaShared.utilisateurs_cache.findFirst({
      where: {
        OR: [
          { id_microsoft: salarieId },
          { email: salarieId },
        ],
      },
    });

    const ids = [salarieId];
    if (salarie) {
      if (salarie.id_microsoft && !ids.includes(salarie.id_microsoft)) ids.push(salarie.id_microsoft);
      if (salarie.email && !ids.includes(salarie.email)) ids.push(salarie.email);
    }

    return this.prismaDemandes.demandes_rh.findMany({
      where: {
        OR: [
          { salarieId: { in: ids } },
          ...(salarie?.email ? [{ salarieEmail: salarie.email }] : []),
        ],
      },
      include: {
        typeDemande: true,
        validations: {
          orderBy: { dateDecision: "asc" },
        },
        historique: {
          orderBy: { createdAt: "desc" },
        },
      },
      orderBy: { createdAt: "desc" },
    });
  }

  async getAllDemandes() {
    return this.prismaDemandes.demandes_rh.findMany({
      include: {
        typeDemande: true,
        validations: {
          orderBy: { dateDecision: "asc" },
        },
        historique: {
          orderBy: { createdAt: "desc" },
        },
      },
      orderBy: { createdAt: "desc" },
    });
  }

  async getDemandeById(id: string) {
    const demande = await this.prismaDemandes.demandes_rh.findUnique({
      where: { id },
      include: {
        typeDemande: true,
        validations: {
          orderBy: { dateDecision: "asc" },
        },
        piecesJointes: true,
        historique: {
          orderBy: { createdAt: "desc" },
        },
      },
    });

    if (!demande) {
      throw new NotFoundException(`Demande #${id} introuvable.`);
    }

    return demande;
  }

  async annulerDemande(id: string, salarieId: string) {
    const demande = await this.getDemandeById(id);

    if (demande.salarieId !== salarieId) {
      throw new BadRequestException("Vous n'êtes pas autorisé à annuler cette demande.");
    }

    if ([StatutDemandeRH.APPROUVEE, StatutDemandeRH.PERMISSION_EDITEE, StatutDemandeRH.ARCHIVEE].includes(demande.statut as any)) {
      throw new BadRequestException("Une demande déjà approuvée ou éditée ne peut plus être annulée directement.");
    }

    // Libération du solde réservé
    if (demande.typeDemande.necessiteSolde) {
      await this.soldesService.libererJours(
        salarieId,
        Number(demande.nombreJours),
        demande.dateDebut.getFullYear()
      );
    }

    const updated = await this.prismaDemandes.demandes_rh.update({
      where: { id },
      data: {
        statut: StatutDemandeRH.ANNULEE,
      },
    });

    await this.prismaDemandes.historique_demande.create({
      data: {
        demandeId: id,
        auteurId: salarieId,
        action: "ANNULATION",
        statutPrecedent: demande.statut as any,
        nouveauStatut: StatutDemandeRH.ANNULEE,
        commentaire: "Demande annulée par le collaborateur.",
      },
    });

    return updated;
  }
}
