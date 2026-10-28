import { Controller, Get, Post, Put, Delete, Body, Param, Query, Headers } from '@nestjs/common';
import { EvaluationsService } from './evaluations.service';
import { EvaluationsCronService } from './evaluations-cron.service';

@Controller()
export class EvaluationsController {
  constructor(
    private readonly evaluationsService: EvaluationsService,
    private readonly evaluationsCronService: EvaluationsCronService,
  ) {}

  @Get('evaluations/me/current')
  async getMyCurrent(
    @Headers('x-user-id') userId?: string,
    @Headers('x-user-email') userEmail?: string,
  ) {
    return this.evaluationsService.getMyCurrent(userId, userEmail);
  }

  @Get('evaluations/me/history')
  async getMyHistory(
    @Headers('x-user-id') userId?: string,
    @Headers('x-user-email') userEmail?: string,
    @Query('annee') annee?: number,
    @Query('statut') statut?: string,
  ) {
    return this.evaluationsService.getMyHistory(userId, annee, statut, userEmail);
  }

  @Get('evaluations/:id')
  async getOne(@Param('id') id: string) {
    return this.evaluationsService.getOne(id);
  }

  @Post('evaluations/:id/sign-salarie')
  async signSalarie(
    @Param('id') id: string,
    @Body() body: { observation: string },
    @Headers('x-user-id') userId?: string,
  ) {
    return this.evaluationsService.signSalarie(id, body.observation, userId);
  }

  @Put('evaluations/:id/auto-evaluation')
  async submitAutoEvaluation(
    @Param('id') id: string,
    @Body() body: any,
    @Headers('x-user-id') userId?: string,
  ) {
    return this.evaluationsService.submitAutoEvaluation(id, body, userId);
  }

  @Put('n1/evaluations/:id')
  async submitNotesN1(
    @Param('id') id: string,
    @Body() body: any,
    @Headers('x-user-id') managerId?: string,
  ) {
    return this.evaluationsService.submitNotesN1(id, body, managerId);
  }

  @Post('evaluations/:id/formations')
  async addFormation(
    @Param('id') id: string,
    @Body() body: { intitule: string; delai?: string; priorite?: string; objectifVise?: string },
  ) {
    return this.evaluationsService.addFormation(id, body);
  }

  @Delete('evaluations/:id/formations/:formationId')
  async deleteFormation(
    @Param('id') id: string,
    @Param('formationId') formationId: string,
  ) {
    return this.evaluationsService.deleteFormation(id, formationId);
  }

  @Post('evaluations/:id/visa-salarie')
  async submitVisaSalarie(
    @Param('id') id: string,
    @Body() body: { accord: boolean; observation?: string },
    @Headers('x-user-id') userId?: string,
  ) {
    return this.evaluationsService.submitVisaSalarie(id, body, userId);
  }

  @Put('n1/evaluations/:id/objectifs')
  async submitObjectifsN1(
    @Param('id') id: string,
    @Body() body: any,
    @Headers('x-user-id') managerId?: string,
  ) {
    return this.evaluationsService.submitObjectifsN1(id, body, managerId);
  }

  @Put('rh/evaluations/:id/objectifs')
  async validateObjectifsRh(
    @Param('id') id: string,
    @Body() body: { decision: 'APPROUVE' | 'REJETE'; observations?: string },
    @Headers('x-user-id') rhId?: string,
  ) {
    return this.evaluationsService.validateObjectifsRh(id, body, rhId);
  }

  @Put('n2/evaluations/:id/objectifs')
  async validateObjectifsN2(
    @Param('id') id: string,
    @Body() body: any,
    @Headers('x-user-id') n2Id?: string,
  ) {
    return this.evaluationsService.validateObjectifsN2(id, body, n2Id);
  }

  @Put('evaluations/:id/objectifs/confirmer-salarie')
  async validateObjectifsSalarie(
    @Param('id') id: string,
    @Body() body: { accord?: boolean; observation?: string },
    @Headers('x-user-id') userId?: string,
  ) {
    return this.evaluationsService.validateObjectifsSalarie(id, body, userId);
  }

  @Put('n2/evaluations/:id')
  async validateNotesN2(
    @Param('id') id: string,
    @Body() body: any,
    @Headers('x-user-id') n2Id?: string,
  ) {
    return this.evaluationsService.submitNotesN2(id, body, n2Id);
  }

  @Get('n2/evaluations')
  async getN2TeamEvaluations(
    @Headers('x-user-id') n2Id?: string,
    @Headers('x-user-email') userEmail?: string,
  ) {
    return this.evaluationsService.getN2TeamEvaluations(n2Id, userEmail);
  }

  @Put('rh/evaluations/:id/valider')
  async validerParRh(
    @Param('id') id: string,
    @Body() body: { statut?: 'VALIDE' | 'CLOTURE' | 'ARBITRAGE'; commentaire?: string; noteFinale?: number },
    @Headers('x-user-id') rhId?: string,
  ) {
    return this.evaluationsService.validerParRh(id, body, rhId);
  }

  @Get('rh/evaluations')
  async getAllForRh() {
    return this.evaluationsService.getAllForRh();
  }

  @Get('n1/evaluations')
  async getN1TeamEvaluations(
    @Headers('x-user-id') managerId?: string,
    @Headers('x-user-email') userEmail?: string,
  ) {
    return this.evaluationsService.getN1TeamEvaluations(managerId, userEmail);
  }

  @Post('evaluations/relances/execute')
  async triggerRelances(@Body() body?: { seuilJours?: number }) {
    const seuil = body?.seuilJours ?? 5;
    return this.evaluationsCronService.executeRelances(seuil);
  }

  @Get('evaluations/relances/status')
  async getRelancesStatus() {
    return this.evaluationsCronService.getStatus();
  }
}
