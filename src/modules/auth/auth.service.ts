import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { mapUserToDto } from '../../common/user.mapper';
import type { UtilisateurAuth } from '../../common/auth/auth.constants';
import { invaliderCacheAuth } from '../../common/auth/auth.guard';

@Injectable()
export class AuthService {
  private cachedDrhUser: any = null;
  private lastDrhFetch = 0;

  constructor(private prisma: PrismaService) {}

  private async getDrhUser() {
    const now = Date.now();
    // Cache DRH user for 5 minutes in memory to avoid repetitive queries
    if (this.cachedDrhUser && now - this.lastDrhFetch < 300_000) {
      return this.cachedDrhUser;
    }
    this.cachedDrhUser = await this.prisma.utilisateurs_cache.findFirst({
      where: { role: 'DRH' },
    });
    this.lastDrhFetch = now;
    return this.cachedDrhUser;
  }

  /**
   * Synchronise le profil Microsoft de l'utilisateur connecté.
   * - L'identité (id_microsoft, e-mail) vient du jeton vérifié, jamais du corps.
   * - Le rôle n'est jamais pris dans le corps : à la création, on utilise le rôle
   *   calculé par le SSO côté serveur du portail ; ensuite, la base fait foi.
   */
  async syncSession(
    body: {
      nom?: string;
      prenom?: string;
      poste?: string;
      departement?: string;
      telephone?: string;
      managerId?: string;
    },
    utilisateur: UtilisateurAuth,
  ) {
    const data = {
      ...body,
      nom: body.nom || utilisateur.nom || utilisateur.email.split('@')[0],
      id_microsoft: utilisateur.id,
      email: utilisateur.email,
      role: utilisateur.roleSso,
    };
    const fullName = `${data.prenom ? data.prenom + ' ' : ''}${data.nom}`.trim();

    let user = await this.prisma.utilisateurs_cache.findUnique({
      where: { id_microsoft: data.id_microsoft },
    });

    if (!user && data.email) {
      user = await this.prisma.utilisateurs_cache.findUnique({
        where: { email: data.email },
      });
    }

    let modifie = false;
    if (user) {
      // Éviter les écritures SQL inutiles si les données n'ont pas changé (accélère considérablement les requêtes)
      const needsUpdate =
        (fullName && fullName !== user.nom) ||
        (data.email && data.email !== user.email) ||
        (data.poste && data.poste !== user.poste) ||
        (data.departement && data.departement !== user.departement) ||
        (data.telephone && data.telephone !== user.telephone) ||
        (!user.role && data.role) ||
        (!user.managerId && data.managerId);

      if (needsUpdate) {
        modifie = true;
        user = await this.prisma.utilisateurs_cache.update({
          where: { id_microsoft: user.id_microsoft },
          data: {
            nom: fullName || data.nom || user.nom,
            ...(data.email ? { email: data.email } : {}),
            ...(data.poste ? { poste: data.poste } : {}),
            ...(data.departement ? { departement: data.departement } : {}),
            ...(data.telephone ? { telephone: data.telephone } : {}),
            ...(user.role ? {} : data.role ? { role: data.role } : {}),
            ...(user.managerId ? {} : data.managerId ? { managerId: data.managerId } : {}),
            updatedAt: new Date(),
          },
        });
      }
    } else {
      modifie = true;
      user = await this.prisma.utilisateurs_cache.create({
        data: {
          id_microsoft: data.id_microsoft,
          nom: fullName || data.nom,
          email: data.email,
          poste: data.poste,
          departement: data.departement,
          telephone: data.telephone,
          role: data.role || 'SALARIE',
          managerId: data.managerId,
          updatedAt: new Date(),
        },
      });
    }

    // Le garde relira le compte à jour au prochain appel
    if (modifie) invaliderCacheAuth();

    // Récupération en parallèle N1 + DRH (divise le temps d'attente réseau par 2)
    const [n1User, drhUser] = await Promise.all([
      user.managerId
        ? this.prisma.utilisateurs_cache.findUnique({
            where: { id_microsoft: user.managerId },
          })
        : Promise.resolve(null),
      this.getDrhUser(),
    ]);

    let n2User = null;
    if (n1User?.managerId) {
      n2User = await this.prisma.utilisateurs_cache.findUnique({
        where: { id_microsoft: n1User.managerId },
      });
    }

    return {
      success: true,
      message: 'Session synchronisée avec succès',
      user: mapUserToDto(user, n1User, n2User, drhUser),
    };
  }
}
