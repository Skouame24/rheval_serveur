// ============================================================
// src/common/auth/auth.constants.ts
// Contrat d'identité entre le portail (proxy Next.js) et l'API.
//
// Le navigateur ne parle JAMAIS directement à l'API avec une identité :
// le proxy du portail lit la session SSO Microsoft (cookie httpOnly),
// signe un jeton court (HS256) avec AGILLY_API_SECRET et l'envoie ici.
// ============================================================

export const JETON_ISSUER = 'agilly-portail';
export const JETON_AUDIENCE = 'agilly-api';

export const ROLES_PILOTAGE_RH = ['RH', 'DRH', 'ADMIN'];
export const ROLES_ADMIN = ['DRH', 'ADMIN'];

/** Anciennes valeurs publiées dans le dépôt : refusées. */
const SECRETS_COMPROMIS = ['agilly_rheval_super_secret_jwt_key_2026'];

/** Secret partagé portail ↔ API. Sans lui, l'API refuse de démarrer. */
export function secretApi(): string {
  const secret = process.env.AGILLY_API_SECRET || process.env.JWT_SECRET;
  if (!secret || secret.length < 32 || SECRETS_COMPROMIS.includes(secret)) {
    throw new Error(
      'AGILLY_API_SECRET manquant, trop court (32 caractères minimum) ou déjà publié. ' +
        'Générez-le avec : node -e "console.log(require(\'crypto\').randomBytes(48).toString(\'base64url\'))"',
    );
  }
  return secret;
}

/** Mode « simulateur de profils » : jamais en production. */
export const simulationAutorisee = (): boolean => process.env.AUTORISER_SIMULATION === 'true';

/** Utilisateur authentifié, disponible dans req.user */
export interface UtilisateurAuth {
  /** id_microsoft (identifiant utilisé partout dans les services) */
  id: string;
  email: string;
  /** Rôle issu de la base (source de vérité) */
  role: string;
  /** Rôle calculé par le SSO côté portail (sert uniquement à la création du compte) */
  roleSso?: string;
  nom?: string;
  /** true si un administrateur simule ce profil (environnement de test uniquement) */
  simule?: boolean;
}
