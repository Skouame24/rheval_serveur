import { Controller, Get } from '@nestjs/common';
import { Public } from './common/auth/auth.decorators';

@Controller()
export class AppController {
  /** Vérification de santé (PM2, supervision) — seule route publique de l'API */
  @Public()
  @Get('health')
  health() {
    return { status: 'ok', date: new Date().toISOString() };
  }
}
