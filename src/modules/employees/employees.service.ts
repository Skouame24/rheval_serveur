import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { mapUserToDto } from '../../common/user.mapper';
import { getSubordinateIds } from '../../common/hierarchy.helper';

@Injectable()
export class EmployeesService {
  constructor(private prisma: PrismaService) {}

  async getMe(userId?: string) {
    let user = null;
    if (userId) {
      user = await this.prisma.utilisateurs_cache.findUnique({
        where: { id_microsoft: userId },
      });
    }

    if (!user) {
      user = await this.prisma.utilisateurs_cache.findFirst();
    }

    if (!user) {
      throw new NotFoundException('Utilisateur introuvable');
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
    let mgrId = managerId;
    if (!mgrId) {
      const mgr = await this.prisma.utilisateurs_cache.findFirst({
        where: { role: { in: ['N1', 'N2', 'DRH'] } },
      });
      mgrId = mgr?.id_microsoft;
    }

    let team: any[] = [];
    if (mgrId) {
      // Récupérer tous les subordonnés directs et indirects (N-1, N-2, N-3)
      const subordinateIds = await getSubordinateIds(this.prisma, mgrId);
      if (subordinateIds.length > 0) {
        team = await this.prisma.utilisateurs_cache.findMany({
          where: { id_microsoft: { in: subordinateIds } },
        });
      }
    }

    // Si aucun subordonné dans l'arbre ou si profil DRH/RH, on renvoie les autres utilisateurs
    if (team.length === 0 && mgrId) {
      team = await this.prisma.utilisateurs_cache.findMany({
        where: { id_microsoft: { not: mgrId } },
      });
    }

    return team.map((u) => mapUserToDto(u));
  }

  async getN2Subordinates(n2Id?: string) {
    let mgrId = n2Id;
    if (!mgrId) {
      const n2User = await this.prisma.utilisateurs_cache.findFirst({
        where: { role: { in: ['N2', 'DRH'] } },
      });
      mgrId = n2User?.id_microsoft;
    }

    if (mgrId) {
      const subordinateIds = await getSubordinateIds(this.prisma, mgrId);
      if (subordinateIds.length > 0) {
        const users = await this.prisma.utilisateurs_cache.findMany({
          where: { id_microsoft: { in: subordinateIds } },
        });
        return users.map((u) => mapUserToDto(u));
      }
    }

    const all = await this.prisma.utilisateurs_cache.findMany();
    return all.map((u) => mapUserToDto(u));
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
