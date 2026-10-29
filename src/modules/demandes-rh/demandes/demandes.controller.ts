import { Controller, Get, Post, Put, Body, Param, Headers, Query } from "@nestjs/common";
import { DemandesService } from "./demandes.service";
import { CreateDemandeDto } from "./dto/create-demande.dto";
import { UpdateTypeWorkflowDto } from "./dto/update-type-workflow.dto";
import { MissionsReferentielService } from "../missions/missions-referentiel.service";

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
    const salarieId = userId || "0a5c4c64-abdd-4f4f-a3af-00057ebdddfb"; // Samuel par défaut
    return this.demandesService.createDemande(salarieId, dto);
  }

  @Get("mes-demandes")
  async getMesDemandes(@Headers("x-user-id") userId?: string) {
    const salarieId = userId || "0a5c4c64-abdd-4f4f-a3af-00057ebdddfb";
    return this.demandesService.getMesDemandes(salarieId);
  }

  @Get()
  async getAllDemandes() {
    return this.demandesService.getAllDemandes();
  }

  @Get(":id")
  async getDemandeById(@Param("id") id: string) {
    return this.demandesService.getDemandeById(id);
  }

  @Put(":id/annuler")
  async annulerDemande(
    @Param("id") id: string,
    @Headers("x-user-id") userId?: string
  ) {
    const salarieId = userId || "0a5c4c64-abdd-4f4f-a3af-00057ebdddfb";
    return this.demandesService.annulerDemande(id, salarieId);
  }
}
