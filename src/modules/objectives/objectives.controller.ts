import { Controller, Get, Post, Put, Body, Param, Headers } from '@nestjs/common';
import { ObjectivesService } from './objectives.service';

@Controller()
export class ObjectivesController {
  constructor(private readonly objectivesService: ObjectivesService) {}

  @Get('objectifs/me')
  async getMyObjectifs(@Headers('x-user-id') userId?: string) {
    return this.objectivesService.getMyObjectifs(userId);
  }

  @Get('n1/objectifs/:salarieId')
  async getBySalarieId(@Param('salarieId') salarieId: string) {
    return this.objectivesService.getBySalarieId(salarieId);
  }

  @Post('n1/objectifs')
  async create(@Body() body: any) {
    return this.objectivesService.create(body);
  }

  @Put('n1/objectifs/:id')
  async update(@Param('id') id: string, @Body() body: any) {
    return this.objectivesService.update(id, body);
  }
}
