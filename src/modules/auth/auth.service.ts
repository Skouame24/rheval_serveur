import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { mapUserToDto } from '../../common/user.mapper';
import { verifyPassword } from '../../common/password.util';

@Injectable()
export class AuthService {
  private cachedDrhUser: any = null;
  private lastDrhFetch = 0;

  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

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

  async syncSession(data: {
    id_microsoft: string;
    nom: string;
    prenom?: string;
    email: string;
    poste?: string;
    departement?: string;
    telephone?: string;
    role?: string;
    managerId?: string;
  }) {
    const fullName = `${data.prenom ? data.prenom + ' ' : ''}${data.nom}`.trim();

    let user = await this.prisma.utilisateurs_cache.findUnique({
      where: { id_microsoft: data.id_microsoft },
    });

    if (!user && data.email) {
      user = await this.prisma.utilisateurs_cache.findUnique({
        where: { email: data.email },
      });
    }

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

  async login(email: string, password: string) {
    if (
      typeof email !== 'string' ||
      typeof password !== 'string' ||
      !email.trim() ||
      !password
    ) {
      throw new UnauthorizedException('Identifiants invalides');
    }

    const user = await this.prisma.utilisateurs_cache.findFirst({
      where: { email: { equals: email.trim(), mode: 'insensitive' } },
    });
    const credentials = user
      ? await this.prisma.$queryRaw<Array<{ passwordHash: string }>>`
          SELECT "passwordHash"
          FROM "auth_credentials"
          WHERE "userId" = ${user.id_microsoft}
          LIMIT 1
        `
      : [];

    if (
      !user ||
      !credentials[0] ||
      !(await verifyPassword(password, credentials[0].passwordHash))
    ) {
      throw new UnauthorizedException('Identifiants invalides');
    }

    let n1User = null;
    let n2User = null;
    if (user.managerId) {
      n1User = await this.prisma.utilisateurs_cache.findUnique({
        where: { id_microsoft: user.managerId },
      });
      if (n1User?.managerId) {
        n2User = await this.prisma.utilisateurs_cache.findUnique({
          where: { id_microsoft: n1User.managerId },
        });
      }
    }

    const drhUser = await this.prisma.utilisateurs_cache.findFirst({
      where: { role: 'DRH' },
    });

    const payload = { sub: user.id_microsoft, email: user.email, role: user.role };
    const token = this.jwtService.sign(payload);

    return {
      access_token: token,
      user: mapUserToDto(user, n1User, n2User, drhUser),
    };
  }

  async loginAzureAd(accessToken?: string) {
    if (!accessToken) {
      throw new UnauthorizedException('Jeton Microsoft manquant');
    }

    const graphResponse = await fetch(
      'https://graph.microsoft.com/v1.0/me?$select=id,mail,userPrincipalName',
      { headers: { Authorization: `Bearer ${accessToken}` } },
    );
    if (!graphResponse.ok) {
      throw new UnauthorizedException('Jeton Microsoft invalide');
    }

    const profile = (await graphResponse.json()) as {
      id?: string;
      mail?: string;
      userPrincipalName?: string;
    };
    const email = profile.mail || profile.userPrincipalName;
    const identityFilter = profile.id
      ? { id_microsoft: profile.id }
      : email
        ? { email: { equals: email, mode: 'insensitive' as const } }
        : null;
    if (!identityFilter) {
      throw new UnauthorizedException('Identité Microsoft invalide');
    }

    const user = await this.prisma.utilisateurs_cache.findFirst({
      where: identityFilter,
    });
    if (!user) {
      throw new UnauthorizedException('Utilisateur Microsoft non autorisé');
    }

    const payload = { sub: user.id_microsoft, email: user.email, role: user.role };
    const token = this.jwtService.sign(payload);

    return {
      access_token: token,
      user: mapUserToDto(user),
    };
  }
}
