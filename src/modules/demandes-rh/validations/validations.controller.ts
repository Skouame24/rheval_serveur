import { Controller, Get, Put, Post, Delete, Body, Param, Headers, UseGuards } from "@nestjs/common";
import { ValidationsService } from "./validations.service";
import { DelegationsService } from "./delegations.service";
import { DecisionValidationDto } from "./dto/decision-validation.dto";
import { Roles, UtilisateurCourant } from "../../../common/auth/auth.decorators";
import { ROLES_PILOTAGE_RH, type UtilisateurAuth } from "../../../common/auth/auth.constants";

@Controller("validations-rh")
export class ValidationsController {
  constructor(
    private readonly validationsService: ValidationsService,
    private readonly delegationsService: DelegationsService,
  ) {}

  // ── Gestion de l'Intérim & Délégation de validation ────────
  @Get("delegation")
  async getMyDelegation(@Headers("x-user-id") managerId?: string) {
    const mgrId = (managerId as string);
    return this.delegationsService.getMyActiveDelegation(mgrId);
  }

  @Post("delegation")
  async setDelegation(
    @Body() dto: { interimId: string; motif?: string; dateDebut?: string; dateFin?: string | null },
    @Headers("x-user-id") managerId?: string
  ) {
    const mgrId = (managerId as string);
    return this.delegationsService.setDelegation(mgrId, dto);
  }

  @Delete("delegation")
  async revokeDelegation(@Headers("x-user-id") managerId?: string) {
    const mgrId = (managerId as string);
    return this.delegationsService.revokeDelegation(mgrId);
  }

  @Get("collaborateurs-eligibles")
  async getEligibleInterims(@Headers("x-user-id") managerId?: string) {
    const mgrId = (managerId as string);
    return this.delegationsService.getEligibleInterims(mgrId);
  }

  // ── Files d'attente par rôle ──────────────────────────────
  @Get("n1/a-valider")
  async getDemandesAValiderN1(@Headers("x-user-id") managerId?: string) {
    const mgrId = (managerId as string);
    return this.validationsService.getDemandesAValiderN1(mgrId);
  }

  @Roles(...ROLES_PILOTAGE_RH)
  @Get("drh/a-valider")
  async getDemandesAValiderDRH() {
    return this.validationsService.getDemandesAValiderDRH();
  }

  @Roles("N2", "ADMIN")
  @Get("dg/a-valider")
  async getDemandesAValiderDG() {
    return this.validationsService.getDemandesAValiderDG();
  }

  // ── Décisions des valideurs ───────────────────────────────
  @Put(":id/decision-n1")
  async validerN1(
    @Param("id") id: string,
    @Body() dto: DecisionValidationDto,
    @UtilisateurCourant() u: UtilisateurAuth,
    @Headers("x-user-id") valideurId?: string
  ) {
    // Seuls le N+1 de la demande, son intérimaire actif ou le PDG peuvent décider
    return this.validationsService.validerN1(id, valideurId as string, dto, !!u.pdg);
  }

  @Roles(...ROLES_PILOTAGE_RH)
  @Put(":id/decision-drh")
  async validerDRH(
    @Param("id") id: string,
    @Body() dto: DecisionValidationDto,
    @Headers("x-user-id") drhId?: string
  ) {
    const dId = (drhId as string);
    return this.validationsService.validerDRH(id, dId, dto);
  }

  @Roles("N2", "ADMIN")
  @Put(":id/decision-dg")
  async validerDG(
    @Param("id") id: string,
    @Body() dto: DecisionValidationDto,
    @Headers("x-user-id") dgId?: string
  ) {
    const dId = (dgId as string);
    return this.validationsService.validerDG(id, dId, dto);
  }

  @Roles(...ROLES_PILOTAGE_RH)
  @Post(":id/editer-permission")
  async editerPermissionEtCloturer(
    @Param("id") id: string,
    @Headers("x-user-id") agentId?: string
  ) {
    const aId = (agentId as string);
    return this.validationsService.editerPermissionEtCloturer(id, aId);
  }
}

