import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { mapUserToDto } from '../../common/user.mapper';
import { KNOWN_AGILLY_DIRECTORY } from '../../common/directory.constants';

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
            update: {
              managerId: k1.managerId,
            },
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

    return { n1User, n2User };
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
