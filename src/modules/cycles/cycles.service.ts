import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class CyclesService {
  constructor(private prisma: PrismaService) {}

  async getAll() {
    return this.prisma.cycles_evaluation.findMany({
      orderBy: { annee: 'desc' },
      include: {
        fiches_evaluation: true,
      },
    });
  }

  async getActif() {
    const cycle = await this.prisma.cycles_evaluation.findFirst({
      where: { statut: 'ACTIF' },
      include: {
        fiches_evaluation: true,
      },
    });

    if (!cycle) {
      // Si aucun cycle actif explicite, renvoyer le plus récent
      return this.prisma.cycles_evaluation.findFirst({
        orderBy: { annee: 'desc' },
      });
    }

    return cycle;
  }

  async create(data: {
    annee: number;
    libelle: string;
    dateDebut: string;
    dateFin: string;
    creeParUserId?: string;
  }) {
    // Obtenir un ID utilisateur existant si non fourni
    let creatorId = data.creeParUserId;
    if (!creatorId) {
      const admin = await this.prisma.utilisateurs_cache.findFirst();
      creatorId = admin?.id_microsoft || 'usr-default';
    }

    const cycleId = 'cyc-' + Date.now();

    return this.prisma.cycles_evaluation.create({
      data: {
        id: cycleId,
        libelle: data.libelle,
        annee: Number(data.annee),
        typeCycle: 'ANNUEL',
        dateOuverture: new Date(data.dateDebut),
        dateFermeture: new Date(data.dateFin),
        statut: 'ACTIF',
        creeParUserId: creatorId,
        updatedAt: new Date(),
      },
    });
  }

  async cloturer(id: string) {
    const existing = await this.prisma.cycles_evaluation.findUnique({
      where: { id },
    });

    if (!existing) {
      throw new NotFoundException(`Cycle ${id} introuvable`);
    }

    return this.prisma.cycles_evaluation.update({
      where: { id },
      data: {
        statut: 'CLOTURE',
        updatedAt: new Date(),
      },
    });
  }
}
