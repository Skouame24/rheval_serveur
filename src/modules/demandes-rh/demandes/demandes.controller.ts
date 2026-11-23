import { Controller, Get, Post, Put, Body, Param, Headers, Query } from "@nestjs/common";
import { DemandesService } from "./demandes.service";
import { CreateDemandeDto } from "./dto/create-demande.dto";
import { UpdateTypeWorkflowDto } from "./dto/update-type-workflow.dto";
import { MissionsReferentielService } from "../missions/missions-referentiel.service";
import { Roles, UtilisateurCourant } from "../../../common/auth/auth.decorators";
import { ROLES_PILOTAGE_RH, type UtilisateurAuth } from "../../../common/auth/auth.constants";

export class CalculFraisMissionDto {
  villeId: string;
  transportCode: string;
  nombreJours: number;
}

@Controller("demandes-rh")
export class DemandesController {
  constructor(
    private readonly demandesService: DemandesService,
    private readonly missionsReferentielService: MissionsReferentielService
  ) {}

  // ── RÉFÉRENTIELS MISSIONS, VILLES CI & MOYENS DE TRANSPORT ──
  @Get("missions/referentiel")
  getReferentielMissions() {
    return this.missionsReferentielService.getReferentielComplet();
  }

  @Get("missions/villes-ci")
  getVillesCI() {
    return this.missionsReferentielService.getVillesCI();
  }

  @Get("missions/moyens-transport")
  getMoyensTransport() {
    return this.missionsReferentielService.getMoyensTransport();
  }

  @Post("missions/calcul-frais")
  calculerFraisMission(@Body() dto: CalculFraisMissionDto) {
    return this.missionsReferentielService.calculerFrais(
      dto.villeId,
      dto.transportCode,
      dto.nombreJours
    );
  }

  @Get("types")
  async getTypesDemande() {
    return this.demandesService.getTypesDemande();
  }

  @Roles(...ROLES_PILOTAGE_RH)
  @Put("types/:id")
  async updateTypeWorkflow(
    @Param("id") id: string,
    @Body() dto: UpdateTypeWorkflowDto
  ) {
    return this.demandesService.updateTypeWorkflow(id, dto);
  }

  @Post()
  async createDemande(
    @Body() dto: CreateDemandeDto,
    @Headers("x-user-id") userId?: string
  ) {
    // userId est toujours fourni par le garde (identité vérifiée)
    return this.demandesService.createDemande(userId as string, dto);
  }

  @Get("mes-demandes")
  async getMesDemandes(@Headers("x-user-id") userId?: string) {
    return this.demandesService.getMesDemandes(userId as string);
  }

  /** Demandes visibles : toutes pour RH/DRH/Direction/PDG, sinon les siennes + celles de son équipe */
  @Get()
  async getAllDemandes(@UtilisateurCourant() u: UtilisateurAuth) {
    return this.demandesService.getDemandesVisibles(u);
  }

  @Get(":id")
  async getDemandeById(@Param("id") id: string, @UtilisateurCourant() u: UtilisateurAuth) {
    return this.demandesService.getDemandeVisible(id, u);
  }

  @Put(":id/annuler")
  async annulerDemande(
    @Param("id") id: string,
    @Headers("x-user-id") userId?: string
  ) {
    return this.demandesService.annulerDemande(id, userId as string);
  }
}
