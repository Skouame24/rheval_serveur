// ============================================================
// src/common/auth/auth.guard.ts
// Garde global : toute route exige un jeton signé par le portail,
// sauf celles marquées @Public().
//
// 1. Les en-têtes d'identité envoyés par le client (x-user-id,
//    x-user-email) sont SUPPRIMÉS puis réécrits avec l'identité vérifiée.
//    Les contrôleurs existants qui lisent @Headers('x-user-id')
//    reçoivent donc toujours l'utilisateur réel.
// 2. Le rôle vient de la base (utilisateurs_cache), jamais du client.
// 3. @Roles(...) restreint une route à certains rôles.
// ============================================================

import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../prisma/prisma.service';
import {
  JETON_AUDIENCE,
  JETON_ISSUER,
  estPdg,
  secretApi,
  type UtilisateurAuth,
} from './auth.constants';
import { PUBLIC_KEY, ROLES_KEY } from './auth.decorators';

interface JetonPortail {
  sub: string;
  email?: string;
  name?: string;
  role?: string;
}

interface CompteBase {
  id_microsoft: string;
  email: string | null;
  role: string | null;
  nom: string | null;
  poste: string | null;
}

const DUREE_CACHE_MS = 60_000;
const cache = new Map<string, { compte: CompteBase | null; expire: number }>();

/** Vide le cache des comptes (après une modification de rôle ou une synchronisation). */
export function invaliderCacheAuth(): void {
  cache.clear();
}

@Injectable()
export class AuthGuard implements CanActivate {
  private readonly logger = new Logger('AuthGuard');
  private readonly secret = secretApi();

  constructor(
    private readonly reflector: Reflector,
    private readonly jwt: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  async canActivate(ctx: ExecutionContext): Promise<boolean> {
    if (ctx.getType() !== 'http') return true;
    const req = ctx.switchToHttp().getRequest();

    // Jamais confiance aux en-têtes d'identité fournis par le client
    delete req.headers['x-user-id'];
    delete req.headers['x-user-email'];

    const cibles = [ctx.getHandler(), ctx.getClass()];
    if (this.reflector.getAllAndOverride<boolean>(PUBLIC_KEY, cibles)) return true;

    const jeton = this.extraireJeton(req.headers['authorization']);
    if (!jeton) throw new UnauthorizedException('Authentification requise');

    let payload: JetonPortail;
    try {
      payload = this.jwt.verify<JetonPortail>(jeton, {
        secret: this.secret,
        algorithms: ['HS256'],
        issuer: JETON_ISSUER,
        audience: JETON_AUDIENCE,
      });
    } catch {
      throw new UnauthorizedException('Session invalide ou expirée');
    }
    if (!payload?.sub) throw new UnauthorizedException('Session invalide');

    // Aucune simulation de profil : l'utilisateur est toujours celui de la session SSO
    const utilisateur = await this.construire(payload.sub, payload.email, payload.role, payload.name);

    req.user = utilisateur;
    req.headers['x-user-id'] = utilisateur.id;
    if (utilisateur.email) req.headers['x-user-email'] = utilisateur.email;

    const roles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, cibles);
    // Le PDG a tous les droits
    if (roles?.length && !utilisateur.pdg && !roles.includes(utilisateur.role)) {
      throw new ForbiddenException("Vous n'avez pas les droits pour cette action");
    }
    return true;
  }

  private extraireJeton(entete?: string): string | null {
    if (!entete) return null;
    const [type, valeur] = entete.split(' ');
    return type === 'Bearer' && valeur ? valeur : null;
  }

  private async construire(sub: string, email?: string, roleSso?: string, nom?: string): Promise<UtilisateurAuth> {
    const compte = await this.compte(sub, email);
    return this.versUtilisateur(compte, sub, email, roleSso, nom);
  }

  private versUtilisateur(
    compte: CompteBase | null,
    sub: string,
    email?: string,
    roleSso?: string,
    nom?: string,
  ): UtilisateurAuth {
    return {
      // Compte connu : on garde SON identifiant (certains comptes historiques n'ont pas l'oid Microsoft)
      id: compte?.id_microsoft ?? sub,
      email: compte?.email ?? email ?? '',
      // Compte pas encore créé (avant sync-session) : droits minimaux
      role: compte?.role || 'SALARIE',
      roleSso,
      nom: compte?.nom ?? nom,
      pdg: estPdg(compte?.poste, compte?.email ?? email),
    };
  }

  /** Compte en base par oid Microsoft puis par e-mail, mis en cache 60 s. */
  private async compte(sub: string, email?: string): Promise<CompteBase | null> {
    const cle = `${sub}|${(email ?? '').toLowerCase()}`;
    const enCache = cache.get(cle);
    if (enCache && enCache.expire > Date.now()) return enCache.compte;

    const select = { id_microsoft: true, email: true, role: true, nom: true, poste: true } as const;
    let compte: CompteBase | null = await this.prisma.utilisateurs_cache.findUnique({
      where: { id_microsoft: sub },
      select,
    });
    if (!compte && email) {
      compte = await this.prisma.utilisateurs_cache.findFirst({
        where: { email: { equals: email, mode: 'insensitive' } },
        select,
      });
    }

    // Comptes pas encore créés : cache court pour que la première synchro soit vite prise en compte
    cache.set(cle, { compte, expire: Date.now() + (compte ? DUREE_CACHE_MS : 5_000) });
    if (cache.size > 5_000) cache.clear();
    return compte;
  }
}
