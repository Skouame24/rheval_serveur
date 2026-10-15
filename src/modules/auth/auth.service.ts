import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { mapUserToDto } from '../../common/user.mapper';
import { KNOWN_AGILLY_DIRECTORY } from '../../common/directory.constants';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

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
      user = await this.prisma.utilisateurs_cache.update({
        where: { id_microsoft: user.id_microsoft },
        data: {
          nom: fullName || data.nom || user.nom,
          ...(data.email ? { email: data.email } : {}),
          ...(data.poste ? { poste: data.poste } : {}),
          ...(data.departement ? { departement: data.departement } : {}),
          ...(data.telephone ? { telephone: data.telephone } : {}),
          ...(data.role ? { role: data.role } : {}),
          ...(data.managerId ? { managerId: data.managerId } : {}),
          updatedAt: new Date(),
        },
      });
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

    let n1User = null;
    let n2User = null;
    const managerId = user.managerId || KNOWN_AGILLY_DIRECTORY[user.id_microsoft]?.managerId;
    if (managerId) {
      n1User = await this.prisma.utilisateurs_cache.findUnique({
        where: { id_microsoft: managerId },
      });

      if (!n1User && KNOWN_AGILLY_DIRECTORY[managerId]) {
        const k1 = KNOWN_AGILLY_DIRECTORY[managerId];
        try {
          n1User = await this.prisma.utilisateurs_cache.upsert({
            where: { id_microsoft: managerId },
            update: { managerId: k1.managerId },
            create: {
              id_microsoft: managerId,
              nom: k1.nom,
              email: k1.email,
              poste: k1.poste,
              departement: k1.departement,
              role: k1.role,
              managerId: k1.managerId,
              updatedAt: new Date(),
            },
          });
        } catch {
          n1User = k1 as any;
        }
      }

      const n2Id = n1User?.managerId || KNOWN_AGILLY_DIRECTORY[managerId]?.managerId;
      if (n2Id) {
        n2User = await this.prisma.utilisateurs_cache.findUnique({
          where: { id_microsoft: n2Id },
        });

        if (!n2User && KNOWN_AGILLY_DIRECTORY[n2Id]) {
          const k2 = KNOWN_AGILLY_DIRECTORY[n2Id];
          try {
            n2User = await this.prisma.utilisateurs_cache.upsert({
              where: { id_microsoft: n2Id },
              update: {},
              create: {
                id_microsoft: n2Id,
                nom: k2.nom,
                email: k2.email,
                poste: k2.poste,
                departement: k2.departement,
                role: k2.role,
                managerId: k2.managerId,
                updatedAt: new Date(),
              },
            });
          } catch {
            n2User = k2 as any;
          }
        }
      }
    }

    return {
      success: true,
      message: 'Session synchronisée avec succès',
      user: mapUserToDto(user, n1User, n2User),
    };
  }

  async login(email: string) {
    let user = await this.prisma.utilisateurs_cache.findFirst({
      where: { email: { equals: email, mode: 'insensitive' } },
    });

    if (!user) {
      // Déterminer le rôle par défaut selon l'email démo
      let defaultRole = 'SALARIE';
      if (email.includes('rh')) defaultRole = 'RH';
      else if (email.includes('n2')) defaultRole = 'N2';
      else if (email.includes('n1')) defaultRole = 'N1';
      else if (email.includes('admin')) defaultRole = 'ADMIN';

      user = await this.prisma.utilisateurs_cache.create({
        data: {
          id_microsoft: 'usr-' + Date.now(),
          nom: email.split('@')[0].toUpperCase(),
          email: email,
          role: defaultRole,
          poste: `Poste ${defaultRole}`,
          departement: 'Direction Agilly',
          updatedAt: new Date(),
        },
      });
    }

    let n1User = null;
    if (user.managerId) {
      n1User = await this.prisma.utilisateurs_cache.findUnique({
        where: { id_microsoft: user.managerId },
      });
    }

    const payload = { sub: user.id_microsoft, email: user.email, role: user.role };
    const token = this.jwtService.sign(payload);

    return {
      access_token: token,
      user: mapUserToDto(user, n1User),
    };
  }

  async loginAzureAd(accessToken?: string) {
    // Si un token Azure AD est fourni, on peut récupérer le premier user ou valider
    const user = await this.prisma.utilisateurs_cache.findFirst();
    if (!user) {
      throw new UnauthorizedException('Aucun utilisateur configuré');
    }

    const payload = { sub: user.id_microsoft, email: user.email, role: user.role };
    const token = this.jwtService.sign(payload);

    return {
      access_token: token,
      user: mapUserToDto(user),
    };
  }
}
