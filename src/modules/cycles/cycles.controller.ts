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
import { CyclesService } from './cycles.service';
import { Roles } from '../../common/auth/auth.decorators';
import { ROLES_ADMIN, ROLES_PILOTAGE_RH } from '../../common/auth/auth.constants';

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

  @Roles(...ROLES_PILOTAGE_RH)
  @Post()
  async create(@Body() body: any, @Headers('x-user-id') userId?: string) {
    try {
      return await this.cyclesService.create({
        ...body,
        creeParUserId: userId || body.creeParUserId,
      });
    } catch (err: any) {
      if (err?.status) throw err;
      throw new HttpException(
        {
          statusCode: 500,
          message: err?.message || 'Erreur lors de la création du cycle.',
          error: 'Internal Server Error',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Roles(...ROLES_PILOTAGE_RH)
  @Put(':id/cloturer')
  async cloturer(@Param('id') id: string) {
    return this.cyclesService.cloturer(id);
  }
}
