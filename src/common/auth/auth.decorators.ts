// ============================================================
// src/common/auth/auth.decorators.ts
// @Public()            → route accessible sans jeton
// @Roles('RH', ...)    → route réservée à certains rôles (rôle lu en base)
// @UtilisateurCourant() → utilisateur vérifié, issu du jeton
// ============================================================

import { createParamDecorator, ExecutionContext, SetMetadata } from '@nestjs/common';
import type { UtilisateurAuth } from './auth.constants';

export const PUBLIC_KEY = 'agilly:public';
export const ROLES_KEY = 'agilly:roles';

export const Public = () => SetMetadata(PUBLIC_KEY, true);

export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);

export const UtilisateurCourant = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): UtilisateurAuth => ctx.switchToHttp().getRequest().user,
);
