import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  Headers,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
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
    try {
      return await this.objectivesService.create(body);
    } catch (err: any) {
      if (err?.status) throw err;
      throw new HttpException(
        {
          statusCode: 500,
          message: err?.message || "Erreur lors de l'enregistrement des objectifs.",
          error: 'Internal Server Error',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Put('n1/objectifs/:id')
  async update(@Param('id') id: string, @Body() body: any) {
    return this.objectivesService.update(id, body);
  }
}
