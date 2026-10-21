import { Controller, Get, Put, Post, Body, Param, Headers, UseGuards } from "@nestjs/common";
import { ValidationsService } from "./validations.service";
import { DecisionValidationDto } from "./dto/decision-validation.dto";

@Controller("validations-rh")
export class ValidationsController {
  constructor(private readonly validationsService: ValidationsService) {}

  // ── Files d'attente par rôle ──────────────────────────────
  @Get("n1/a-valider")
  async getDemandesAValiderN1(@Headers("x-user-id") managerId?: string) {
    const mgrId = managerId || "1f77edad-716c-4552-b96f-58ec7d1ee1d7"; // Ange-Dieudonné
    return this.validationsService.getDemandesAValiderN1(mgrId);
  }

  @Get("drh/a-valider")
  async getDemandesAValiderDRH() {
    return this.validationsService.getDemandesAValiderDRH();
  }

  @Get("dg/a-valider")
  async getDemandesAValiderDG() {
    return this.validationsService.getDemandesAValiderDG();
  }

  // ── Décisions des valideurs ───────────────────────────────
  @Put(":id/decision-n1")
  async validerN1(
    @Param("id") id: string,
    @Body() dto: DecisionValidationDto,
    @Headers("x-user-id") valideurId?: string
  ) {
    const vId = valideurId || "1f77edad-716c-4552-b96f-58ec7d1ee1d7";
    return this.validationsService.validerN1(id, vId, dto);
  }

  @Put(":id/decision-drh")
  async validerDRH(
    @Param("id") id: string,
    @Body() dto: DecisionValidationDto,
    @Headers("x-user-id") drhId?: string
  ) {
    const dId = drhId || "c970e84d-5fd5-4cb9-8c4e-7cccc14ad269";
    return this.validationsService.validerDRH(id, dId, dto);
  }

  @Put(":id/decision-dg")
  async validerDG(
    @Param("id") id: string,
    @Body() dto: DecisionValidationDto,
    @Headers("x-user-id") dgId?: string
  ) {
    const dId = dgId || "aaf364d4-b002-4ae1-943d-d7ab5ec90a9a";
    return this.validationsService.validerDG(id, dId, dto);
  }

  @Post(":id/editer-permission")
  async editerPermissionEtCloturer(
    @Param("id") id: string,
    @Headers("x-user-id") agentId?: string
  ) {
    const aId = agentId || "c970e84d-5fd5-4cb9-8c4e-7cccc14ad269";
    return this.validationsService.editerPermissionEtCloturer(id, aId);
  }
}

