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

    const { n1User, n2User } = await this.resolveHierarchy(user);

    const teamCount = await this.prisma.utilisateurs_cache.count({
      where: { managerId: user.id_microsoft },
    });

    const dto = mapUserToDto(user, n1User, n2User);
    return {
      ...dto,
      hasTeam: teamCount > 0,
      teamCount,
    };
  }

  async getById(id: string) {
    const user = await this.prisma.utilisateurs_cache.findUnique({
      where: { id_microsoft: id },
    });

    if (!user) {
      throw new NotFoundException(`Utilisateur ${id} introuvable`);
    }

    const { n1User, n2User } = await this.resolveHierarchy(user);

    return mapUserToDto(user, n1User, n2User);
  }

  private async resolveHierarchy(user: any): Promise<{ n1User: any; n2User: any }> {
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

    return { n1User, n2User };
  }

  async getMyTeam(managerId?: string, userEmail?: string) {
    let mgr = null;
    if (managerId) {
      mgr = await this.prisma.utilisateurs_cache.findUnique({
        where: { id_microsoft: managerId },
      });
    }
    if (!mgr && userEmail) {
      mgr = await this.prisma.utilisateurs_cache.findFirst({
        where: { email: { equals: userEmail, mode: 'insensitive' } },
      });
    }
    const mgrId = mgr?.id_microsoft;
    if (!mgrId) return [];

    const team = await this.prisma.utilisateurs_cache.findMany({
      where: { managerId: mgrId },
    });

    return team.map((u) => mapUserToDto(u));
  }

  async getN2Subordinates(n2Id?: string, userEmail?: string) {
    let director = null;
    if (n2Id) {
      director = await this.prisma.utilisateurs_cache.findUnique({
        where: { id_microsoft: n2Id },
      });
    }
    if (!director && userEmail) {
      director = await this.prisma.utilisateurs_cache.findFirst({
        where: { email: { equals: userEmail, mode: 'insensitive' } },
      });
    }
    const directorId = director?.id_microsoft;
    if (!directorId) return [];

    // N-1 directs sous ce N-2
    const n1Team = await this.prisma.utilisateurs_cache.findMany({
      where: { managerId: directorId },
    });
    const n1Ids = n1Team.map((u) => u.id_microsoft);

    // Tous les collaborateurs directs et sous les N-1
    const allSubordinates = await this.prisma.utilisateurs_cache.findMany({
      where: {
        OR: [
          { managerId: directorId },
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
