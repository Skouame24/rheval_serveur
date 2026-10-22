import { Controller, Get, Post, Put, Body, Param, Headers, UseGuards } from "@nestjs/common";
import { DemandesService } from "./demandes.service";
import { CreateDemandeDto } from "./dto/create-demande.dto";

@Controller("demandes-rh")
export class DemandesController {
  constructor(private readonly demandesService: DemandesService) {}

  @Get("types")
  async getTypesDemande() {
    return this.demandesService.getTypesDemande();
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

