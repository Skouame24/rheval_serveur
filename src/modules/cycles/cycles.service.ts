import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
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
      where: { statut: { in: ['ACTIF', 'EN_COURS'] } },
      include: {
        fiches_evaluation: true,
      },
    });

    return cycle || null;
  }

  async create(data: {
    annee: number;
    libelle: string;
    dateDebut: string;
    dateFin: string;
    creeParUserId?: string;
  }) {
    // Vérifier si un cycle actif existe déjà
    const existingActive = await this.prisma.cycles_evaluation.findFirst({
      where: { statut: { in: ['ACTIF', 'EN_COURS'] } },
    });
    if (existingActive) {
      throw new BadRequestException(
        `Un cycle d'évaluation est déjà actif : "${existingActive.libelle}" (${existingActive.annee}). Veuillez le clôturer avant d'en ouvrir un nouveau.`,
      );
    }

    // Résoudre l'utilisateur créateur en vérifiant son existence réelle en DB
    let creatorId: string | null = null;
    if (data.creeParUserId) {
      const userExists = await this.prisma.utilisateurs_cache.findUnique({
        where: { id_microsoft: data.creeParUserId },
      });
      if (userExists) {
        creatorId = userExists.id_microsoft;
      }
    }

    if (!creatorId) {
      const admin = await this.prisma.utilisateurs_cache.findFirst({
        where: { role: { in: ['DRH', 'RH', 'ADMIN'] } },
      });
      creatorId = admin?.id_microsoft || null;
    }

    if (!creatorId) {
      const anyUser = await this.prisma.utilisateurs_cache.findFirst();
      creatorId = anyUser?.id_microsoft || null;
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
