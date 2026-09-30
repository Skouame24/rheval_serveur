import { Controller, Get, Post, Body, Param, Query, Res } from '@nestjs/common';
import { RhService } from './rh.service';
import type { Response } from 'express';

@Controller('rh')
export class RhController {
  constructor(private readonly rhService: RhService) {}

  @Get('dashboard/stats')
  async getDashboardStats() {
    return this.rhService.getDashboardStats();
  }

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
