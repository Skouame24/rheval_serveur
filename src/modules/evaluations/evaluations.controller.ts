import { Controller, Get, Post, Put, Delete, Body, Param, Query, Headers } from '@nestjs/common';
import { EvaluationsService } from './evaluations.service';

@Controller()
export class EvaluationsController {
  constructor(private readonly evaluationsService: EvaluationsService) {}

  @Get('evaluations/me/current')
  async getMyCurrent(@Headers('x-user-id') userId?: string) {
    return this.evaluationsService.getMyCurrent(userId);
  }

  @Get('evaluations/me/history')
  async getMyHistory(
    @Headers('x-user-id') userId?: string,
    @Query('annee') annee?: number,
    @Query('statut') statut?: string,
  ) {
    return this.evaluationsService.getMyHistory(userId, annee, statut);
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

  @Put('n2/evaluations/:id')
  async submitNotesN2(
    @Param('id') id: string,
    @Body() body: any,
    @Headers('x-user-id') n2Id?: string,
  ) {
    return this.evaluationsService.submitNotesN2(id, body, n2Id);
  }

  @Get('rh/evaluations')
  async getAllForRh() {
    return this.evaluationsService.getAllForRh();
  }

  @Get('n1/evaluations')
  async getN1TeamEvaluations(@Headers('x-user-id') managerId?: string) {
    return this.evaluationsService.getN1TeamEvaluations(managerId);
  }
}
