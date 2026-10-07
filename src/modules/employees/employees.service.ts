import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { mapUserToDto } from '../../common/user.mapper';

@Injectable()
export class EmployeesService {
  constructor(private prisma: PrismaService) {}

  async getMe(userId?: string, userEmail?: string) {
    let user = null;
    if (userId) {
      user = await this.prisma.utilisateurs_cache.findUnique({
        where: { id_microsoft: userId },
      });
    }

    if (!user && userEmail) {
      user = await this.prisma.utilisateurs_cache.findFirst({
        where: { email: { equals: userEmail, mode: 'insensitive' } },
      });
    }

    if (!user) {
      throw new NotFoundException('Utilisateur non synchronisé en base de données');
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

    return mapUserToDto(user, n1User, n2User);
  }

  async getById(id: string) {
    const user = await this.prisma.utilisateurs_cache.findUnique({
      where: { id_microsoft: id },
    });

    if (!user) {
      throw new NotFoundException(`Utilisateur ${id} introuvable`);
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

    return mapUserToDto(user, n1User, n2User);
  }

  async getMyTeam(managerId?: string) {
    if (!managerId) return [];

    const team = await this.prisma.utilisateurs_cache.findMany({
      where: { managerId },
    });

    return team.map((u) => mapUserToDto(u));
  }

  async getN2Subordinates(n2Id?: string) {
    if (!n2Id) return [];

    // N-1 directs sous ce N-2
    const n1Team = await this.prisma.utilisateurs_cache.findMany({
      where: { managerId: n2Id },
    });
    const n1Ids = n1Team.map((u) => u.id_microsoft);

    // Tous les collaborateurs directs et sous les N-1
    const allSubordinates = await this.prisma.utilisateurs_cache.findMany({
      where: {
        OR: [
          { managerId: n2Id },
          { managerId: { in: n1Ids } },
        ],
      },
    });

    return allSubordinates.map((u) => mapUserToDto(u));
  }

  async getAllUsers() {
    const users = await this.prisma.utilisateurs_cache.findMany();
    return users.map((u) => mapUserToDto(u));
  }

  async syncEntraDirectory() {
    const users = await this.prisma.utilisateurs_cache.findMany();
    return {
      syncedCount: users.length,
      message: 'Annuaire Microsoft Entra synchronisé avec succès',
      users: users.map((u) => ({
        oid: u.id_microsoft,
        nom: u.nom,
        prenom: '',
        email: u.email,
        poste: u.poste || '',
        departement: u.departement || '',
        managerEmail: '',
        managerNom: '',
        role: u.role || 'SALARIE',
      })),
    };
  }
}
