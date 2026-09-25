import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class ObjectivesService {
  constructor(private prisma: PrismaService) {}

  async getMyObjectifs(userId?: string) {
    let uId = userId;
    if (!uId) {
      const firstUser = await this.prisma.utilisateurs_cache.findFirst();
      uId = firstUser?.id_microsoft;
    }

    if (!uId) return [];

    const fiche = await this.prisma.fiches_evaluation.findFirst({
      where: { salarieId: uId },
      orderBy: { createdAt: 'desc' },
      include: {
        objectifs: {
          include: {
            indicateurs: true,
            evaluations: true,
          },
        },
      },
    });

    return fiche?.objectifs || [];
  }

  async getBySalarieId(salarieId: string) {
    const fiche = await this.prisma.fiches_evaluation.findFirst({
      where: { salarieId },
      orderBy: { createdAt: 'desc' },
      include: {
        objectifs: {
          include: {
            indicateurs: true,
            evaluations: true,
          },
        },
      },
    });

    return fiche?.objectifs || [];
  }

  async create(data: {
    salarieId: string;
    cycleId: string;
    objectifs: Array<{
      intitule: string;
      description?: string;
      ponderation?: number;
    }>;
  }) {
    // 1. Trouver ou créer la fiche d'évaluation pour ce salarié et ce cycle
    let fiche = await this.prisma.fiches_evaluation.findFirst({
      where: {
        salarieId: data.salarieId,
        cycleId: data.cycleId,
      },
    });

    if (!fiche) {
      fiche = await this.prisma.fiches_evaluation.create({
        data: {
          id: 'fic-' + Date.now(),
          statut: 'FIXATION_OBJECTIFS',
          cycleId: data.cycleId,
          salarieId: data.salarieId,
          updatedAt: new Date(),
        },
      });
    }

    // 2. Créer les objectifs
    const createdObjectifs = [];
    for (const obj of data.objectifs) {
      const objId = 'obj-' + Date.now() + '-' + Math.random().toString(36).substring(2, 7);
      const created = await this.prisma.objectifs.create({
        data: {
          id: objId,
          intitule: obj.intitule,
          ficheId: fiche.id,
          updatedAt: new Date(),
        },
      });
      createdObjectifs.push(created);
    }

    return createdObjectifs;
  }

  async update(id: string, data: { intitule?: string; description?: string }) {
    const existing = await this.prisma.objectifs.findUnique({
      where: { id },
    });

    if (!existing) {
      throw new NotFoundException(`Objectif ${id} introuvable`);
    }

    return this.prisma.objectifs.update({
      where: { id },
      data: {
        intitule: data.intitule ?? existing.intitule,
        updatedAt: new Date(),
      },
    });
  }
}
