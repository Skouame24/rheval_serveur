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
import { UtilisateurCourant } from '../../common/auth/auth.decorators';
import type { UtilisateurAuth } from '../../common/auth/auth.constants';
import { EvaluationsAccesService } from '../evaluations/evaluations-acces.service';

@Controller()
export class ObjectivesController {
  constructor(
    private readonly objectivesService: ObjectivesService,
    private readonly acces: EvaluationsAccesService,
  ) {}

  @Get('objectifs/me')
  async getMyObjectifs(
    @Headers('x-user-id') userId?: string,
    @Headers('x-user-email') userEmail?: string,
  ) {
    return this.objectivesService.getMyObjectifs(userId, userEmail);
  }

  @Get('n1/objectifs/:salarieId')
  async getBySalarieId(@Param('salarieId') salarieId: string, @UtilisateurCourant() u: UtilisateurAuth) {
    await this.acces.assertLectureObjectifs(salarieId, u);
    return this.objectivesService.getBySalarieId(salarieId);
  }

  @Post('n1/objectifs')
  async create(@Body() body: any, @UtilisateurCourant() u: UtilisateurAuth) {
    await this.acces.assertFixationObjectifs(body?.salarieId, u);
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
  async update(@Param('id') id: string, @Body() body: any, @UtilisateurCourant() u: UtilisateurAuth) {
    await this.acces.assertFixationObjectifs(await this.acces.salarieDeObjectif(id), u);
    return this.objectivesService.update(id, body);
  }
}
