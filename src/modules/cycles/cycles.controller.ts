import { Controller, Get, Post, Put, Body, Param, Headers } from '@nestjs/common';
import { CyclesService } from './cycles.service';

@Controller('rh/cycles')
export class CyclesController {
  constructor(private readonly cyclesService: CyclesService) {}

  @Get()
  async getAll() {
    return this.cyclesService.getAll();
  }

  @Get('actif')
  async getActif() {
    return this.cyclesService.getActif();
  }

  @Post()
  async create(@Body() body: any, @Headers('x-user-id') userId?: string) {
    return this.cyclesService.create({
      ...body,
      creeParUserId: userId || body.creeParUserId,
    });
  }

  @Put(':id/cloturer')
  async cloturer(@Param('id') id: string) {
    return this.cyclesService.cloturer(id);
  }
}
