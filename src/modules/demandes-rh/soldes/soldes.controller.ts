import { Controller, Get, Put, Body, Param, Query, Headers, UseGuards } from "@nestjs/common";
import { SoldesService } from "./soldes.service";
import { AjusterSoldeDto } from "./dto/ajuster-solde.dto";
import { Roles } from "../../../common/auth/auth.decorators";
import { ROLES_PILOTAGE_RH } from "../../../common/auth/auth.constants";

@Controller("soldes-conges")
export class SoldesController {
  constructor(private readonly soldesService: SoldesService) {}

  @Get("mon-solde")
  async getMonSolde(
    @Headers("x-user-id") userId?: string,
    @Query("annee") annee?: string
  ) {
    const anneeNum = annee ? parseInt(annee, 10) : 2026;
    return this.soldesService.getSoldeSalarie((userId as string), anneeNum);
  }

  @Roles(...ROLES_PILOTAGE_RH)
  @Get("collaborateur/:salarieId")
  async getSoldeSalarie(
    @Param("salarieId") salarieId: string,
    @Query("annee") annee?: string
  ) {
    const anneeNum = annee ? parseInt(annee, 10) : 2026;
    return this.soldesService.getSoldeSalarie(salarieId, anneeNum);
  }

  @Roles(...ROLES_PILOTAGE_RH)
  @Get("tous")
  async getAllSoldes(@Query("annee") annee?: string) {
    const anneeNum = annee ? parseInt(annee, 10) : 2026;
    return this.soldesService.getAllSoldes(anneeNum);
  }

  @Roles(...ROLES_PILOTAGE_RH)
  @Put("collaborateur/:salarieId/ajuster")
  async ajusterSolde(
    @Param("salarieId") salarieId: string,
    @Body() dto: AjusterSoldeDto,
    @Headers("x-user-id") drhId?: string,
    @Query("annee") annee?: string
  ) {
    const anneeNum = annee ? parseInt(annee, 10) : 2026;
    return this.soldesService.ajusterSolde(salarieId, dto, (drhId as string), anneeNum);
  }
}

