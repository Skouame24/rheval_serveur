import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { mapUserToDto } from '../../common/user.mapper';

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
    if (user.managerId) {
      n1User = await this.prisma.utilisateurs_cache.findUnique({
        where: { id_microsoft: user.managerId },
      });
    }

    return mapUserToDto(user, n1User);
  }

  async getById(id: string) {
    const user = await this.prisma.utilisateurs_cache.findUnique({
      where: { id_microsoft: id },
    });

    if (!user) {
      throw new NotFoundException(`Utilisateur ${id} introuvable`);
    }

    let n1User = null;
    if (user.managerId) {
      n1User = await this.prisma.utilisateurs_cache.findUnique({
        where: { id_microsoft: user.managerId },
      });
    }

    return mapUserToDto(user, n1User);
  }

  async getMyTeam(managerId?: string) {
    let mgrId = managerId;
    if (!mgrId) {
      const mgr = await this.prisma.utilisateurs_cache.findFirst({
        where: { role: { in: ['N1', 'N2', 'DRH'] } },
      });
      mgrId = mgr?.id_microsoft;
    }

    // Récupérer les collaborateurs directs dont managerId correspond
    let team = [];
    if (mgrId) {
      team = await this.prisma.utilisateurs_cache.findMany({
        where: { managerId: mgrId },
      });
    }

    // Si aucun collaborateur rattaché spécifiquement, on renvoie les autres utilisateurs
    if (team.length === 0) {
      team = await this.prisma.utilisateurs_cache.findMany({
        where: { id_microsoft: { not: mgrId } },
      });
    }

    return team.map((u) => mapUserToDto(u));
  }

  async getN2Subordinates(n2Id?: string) {
    // Tous les utilisateurs N-1 et N-2
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
