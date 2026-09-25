import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { mapUserToDto } from '../../common/user.mapper';

@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}

  async getAllUsers() {
    const users = await this.prisma.utilisateurs_cache.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return users.map((u) => mapUserToDto(u));
  }

  async createUser(dto: {
    nom: string;
    prenom?: string;
    email: string;
    role?: string;
    poste?: string;
    departement?: string;
    n1Id?: string;
    n2Id?: string;
  }) {
    const fullName = `${dto.prenom ? dto.prenom + ' ' : ''}${dto.nom}`.trim();
    const id = 'usr-' + Date.now();

    const created = await this.prisma.utilisateurs_cache.create({
      data: {
        id_microsoft: id,
        nom: fullName || dto.nom,
        email: dto.email,
        role: dto.role || 'SALARIE',
        poste: dto.poste,
        departement: dto.departement,
        managerId: dto.n1Id,
        updatedAt: new Date(),
      },
    });

    return mapUserToDto(created);
  }

  async updateUser(id: string, dto: any) {
    const existing = await this.prisma.utilisateurs_cache.findUnique({
      where: { id_microsoft: id },
    });

    if (!existing) {
      throw new NotFoundException(`Utilisateur ${id} introuvable`);
    }

    const updated = await this.prisma.utilisateurs_cache.update({
      where: { id_microsoft: id },
      data: {
        nom: dto.nom ?? existing.nom,
        email: dto.email ?? existing.email,
        role: dto.role ?? existing.role,
        poste: dto.poste ?? existing.poste,
        departement: dto.departement ?? existing.departement,
        managerId: dto.n1Id !== undefined ? dto.n1Id : existing.managerId,
        updatedAt: new Date(),
      },
    });

    return mapUserToDto(updated);
  }

  async deleteUser(id: string) {
    const existing = await this.prisma.utilisateurs_cache.findUnique({
      where: { id_microsoft: id },
    });

    if (!existing) {
      throw new NotFoundException(`Utilisateur ${id} introuvable`);
    }

    await this.prisma.utilisateurs_cache.delete({
      where: { id_microsoft: id },
    });

    return { success: true };
  }

  async getAuditLogs() {
    const logs = await this.prisma.historique_evaluation.findMany({
      include: {
        fiches_evaluation: {
          include: {
            utilisateurs_cache: true,
          },
        },
      },
      orderBy: { dateAction: 'desc' },
      take: 50,
    });

    return logs.map((l) => ({
      id: l.id,
      action: l.action,
      acteurId: l.effectueParId,
      acteurNom: 'Système / Collaborateur',
      cible: l.fiches_evaluation?.utilisateurs_cache?.nom || 'Fiche ' + l.ficheId,
      ancienneValeur: null,
      nouvelleValeur: l.commentaire || l.statutFiche,
      ipAdresse: '127.0.0.1',
      createdAt: l.dateAction.toISOString(),
    }));
  }
}
