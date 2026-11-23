import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UtilisateurCourant } from '../../common/auth/auth.decorators';
import type { UtilisateurAuth } from '../../common/auth/auth.constants';

/**
 * L'authentification se fait par le SSO Microsoft côté portail.
 * Les anciennes routes /auth/login (sans mot de passe) et /auth/azure-ad
 * (qui renvoyait le premier compte venu) ont été supprimées.
 */
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /** Synchronise le profil Microsoft de l'utilisateur CONNECTÉ (identité issue du jeton) */
  @Post('sync-session')
  async syncSession(@Body() body: any, @UtilisateurCourant() utilisateur: UtilisateurAuth) {
    return this.authService.syncSession(body ?? {}, utilisateur);
  }
}
