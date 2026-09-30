import { Controller, Get, Post, Put, Body, Param, Query, Headers, Res } from '@nestjs/common';
import { RhService } from './rh.service';
import type { Response } from 'express';

@Controller('rh')
export class RhController {
  constructor(private readonly rhService: RhService) {}

  @Get('dashboard/stats')
  async getDashboardStats() {
    return this.rhService.getDashboardStats();
  }

  // ── Cycles ──────────────────────────────────────────────────

  @Get('cycles')
  async getCycles() {
    return this.rhService.getCycles();
  }

  @Get('cycles/actif')
  async getCycleActif() {
    return this.rhService.getCycleActif();
  }

  @Post('cycles')
  async creerCycle(
    @Body() body: { annee: number; libelle: string; dateDebut: string; dateFin: string },
    @Headers('x-user-id') userId?: string,
  ) {
    return this.rhService.creerCycle({ ...body, creeParUserId: userId });
  }

  @Put('cycles/:id/cloturer')
  async cloturerCycle(@Param('id') id: string) {
    return this.rhService.cloturerCycle(id);
  }

  // ── Arbitrages ──────────────────────────────────────────────

  @Get('arbitrages')
  async getArbitrages() {
    return this.rhService.getArbitrages();
  }

  @Post('arbitrages/:id/resolve')
  async resolveArbitrage(
    @Param('id') id: string,
    @Body() body: { decision: string; noteFinale: number },
  ) {
    return this.rhService.resolveArbitrage(id, body);
  }

  @Get('bonus/resultats')
  async getBonusResultats(@Query('cycleId') cycleId?: string) {
    return this.rhService.getBonusResultats(cycleId);
  }

  @Get('bareme/actif')
  async getBaremeActif() {
    return this.rhService.getBaremeActif();
  }

  @Get('export/excel')
  async exportExcel(@Query('cycleId') cycleId: string, @Res() res: Response) {
    return this.rhService.exportExcel(cycleId, res);
  }
}
