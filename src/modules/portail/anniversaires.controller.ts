import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { Roles, UtilisateurCourant } from '../../common/auth/auth.decorators';
import { ROLES_PILOTAGE_RH, type UtilisateurAuth } from '../../common/auth/auth.constants';
import { AnniversairesService } from './anniversaires.service';

@Controller()
export class AnniversairesController {
  constructor(private readonly service: AnniversairesService) {}

  /** Anniversaires visibles (jour/mois uniquement) — tout utilisateur connecté */
  @Get('portail/anniversaires')
  liste() {
    return this.service.listePubliques();
  }

  @Get('portail/anniversaires/moi')
  lireMien(@UtilisateurCourant() u: UtilisateurAuth) {
    return this.service.lireMien(u.id);
  }

  @Put('portail/anniversaires/moi')
  modifierMien(@UtilisateurCourant() u: UtilisateurAuth, @Body() body: { jour?: number; mois?: number; visible?: boolean }) {
    return this.service.modifierMien(u.id, body ?? {});
  }

  @Roles(...ROLES_PILOTAGE_RH)
  @Get('rh/anniversaires')
  listeRh() {
    return this.service.listeRh();
  }

  @Roles(...ROLES_PILOTAGE_RH)
  @Put('rh/anniversaires/:id')
  modifierParRh(@Param('id') id: string, @Body() body: { jour?: number; mois?: number }) {
    return this.service.modifierParRh(id, body ?? {});
  }

  @Roles(...ROLES_PILOTAGE_RH)
  @Post('rh/anniversaires/import')
  importer(@Body() body: { texte?: string }) {
    return this.service.importer(body?.texte);
  }
}
