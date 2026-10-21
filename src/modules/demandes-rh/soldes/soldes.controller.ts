import { Controller, Get, Put, Body, Param, Query, Headers, UseGuards } from "@nestjs/common";
import { SoldesService } from "./soldes.service";
import { AjusterSoldeDto } from "./dto/ajuster-solde.dto";

@Controller("soldes-conges")
export class SoldesController {
  constructor(private readonly soldesService: SoldesService) {}

  @Get("mon-solde")
  async getMonSolde(
    @Headers("x-user-id") userId?: string,
    @Query("annee") annee?: string
  ) {
    const anneeNum = annee ? parseInt(annee, 10) : 2026;
    return this.soldesService.getSoldeSalarie(userId || "0a5c4c64-abdd-4f4f-a3af-00057ebdddfb", anneeNum);
  }

  @Get("collaborateur/:salarieId")
  async getSoldeSalarie(
    @Param("salarieId") salarieId: string,
    @Query("annee") annee?: string
  ) {
    const anneeNum = annee ? parseInt(annee, 10) : 2026;
    return this.soldesService.getSoldeSalarie(salarieId, anneeNum);
  }

  @Get("tous")
  async getAllSoldes(@Query("annee") annee?: string) {
    const anneeNum = annee ? parseInt(annee, 10) : 2026;
    return this.soldesService.getAllSoldes(anneeNum);
  }

  @Put("collaborateur/:salarieId/ajuster")
  async ajusterSolde(
    @Param("salarieId") salarieId: string,
    @Body() dto: AjusterSoldeDto,
    @Headers("x-user-id") drhId?: string,
    @Query("annee") annee?: string
  ) {
    const anneeNum = annee ? parseInt(annee, 10) : 2026;
    return this.soldesService.ajusterSolde(salarieId, dto, drhId || "c970e84d-5fd5-4cb9-8c4e-7cccc14ad269", anneeNum);
  }
}

