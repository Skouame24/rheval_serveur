import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { mapUserToDto } from '../../common/user.mapper';

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

    const user = await this.prisma.utilisateurs_cache.upsert({
      where: { id_microsoft: data.id_microsoft },
      update: {
        nom: fullName || data.nom,
        email: data.email,
        poste: data.poste,
        departement: data.departement,
        telephone: data.telephone,
        role: data.role || 'SALARIE',
        managerId: data.managerId,
        updatedAt: new Date(),
      },
      create: {
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

    let n1User = null;
    if (user.managerId) {
      n1User = await this.prisma.utilisateurs_cache.findUnique({
        where: { id_microsoft: user.managerId },
      });
    }

    return {
      success: true,
      message: 'Session synchronisée avec succès',
      user: mapUserToDto(user, n1User),
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
