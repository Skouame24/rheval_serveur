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
          orderBy: { createdAt: 'asc' },
        },
      },
    });

    return (fiche?.objectifs || []).map((o: any) => ({
      ...o,
      ponderation: o.ponderation !== undefined && o.ponderation !== null ? Number(o.ponderation) : 0,
    }));
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
          orderBy: { createdAt: 'asc' },
        },
      },
    });

    return (fiche?.objectifs || []).map((o: any) => ({
      ...o,
      ponderation: o.ponderation !== undefined && o.ponderation !== null ? Number(o.ponderation) : 0,
    }));
  }

  async create(data: {
    salarieId: string;
    cycleId?: string;
    objectifs: Array<{
      id?: string;
      intitule: string;
      description?: string;
      ponderation?: number;
      criteres?: {
        t18_20?: string;
        t15_17?: string;
        t12_14?: string;
        t0_11?: string;
      };
    }>;
  }) {
    // 1. Trouver ou résoudre le cycle
    let cycleId = data.cycleId;
    if (!cycleId) {
      const activeCycle = await this.prisma.cycles_evaluation.findFirst({
        where: { statut: 'EN_COURS' },
        orderBy: { createdAt: 'desc' },
      });
      cycleId = activeCycle?.id || '9cc16108-0d95-491a-8d2d-af11ab41c642';
    }

    // 2. Trouver ou créer la fiche d'évaluation pour ce salarié
    let fiche = await this.prisma.fiches_evaluation.findFirst({
      where: { salarieId: data.salarieId },
      orderBy: { createdAt: 'desc' },
    });

    if (!fiche) {
      fiche = await this.prisma.fiches_evaluation.create({
        data: {
          id: 'fic-' + Date.now(),
          statut: 'FIXATION_OBJECTIFS',
          cycleId: cycleId,
          salarieId: data.salarieId,
          updatedAt: new Date(),
        },
      });
    }

    // 3. Récupérer les objectifs existants de la fiche
    const existingObjs = await this.prisma.objectifs.findMany({
      where: { ficheId: fiche.id },
      include: { indicateurs: true },
    });
    const keptIds = new Set<string>();

    for (const obj of data.objectifs) {
      const isExisting = obj.id && existingObjs.some((e) => e.id === obj.id);
      const targetObjId = isExisting && obj.id ? obj.id : 'obj-' + Date.now() + '-' + Math.random().toString(36).substring(2, 7);

      if (isExisting) {
        await this.prisma.objectifs.update({
          where: { id: targetObjId },
          data: {
            intitule: obj.intitule,
            description: obj.description || '',
            ponderation: Number(obj.ponderation) || 0,
            updatedAt: new Date(),
          },
        });
      } else {
        await this.prisma.objectifs.create({
          data: {
            id: targetObjId,
            intitule: obj.intitule,
            description: obj.description || '',
            ponderation: Number(obj.ponderation) || 0,
            ficheId: fiche.id,
            updatedAt: new Date(),
          },
        });
      }
      keptIds.add(targetObjId);

      // Traiter les critères / indicateurs si fournis
      if (obj.criteres) {
        await this.prisma.indicateurs.deleteMany({
          where: { objectifId: targetObjId },
        });

        const criteriaList = [
          { noteMin: 18, noteMax: 20, intitule: obj.criteres.t18_20 },
          { noteMin: 15, noteMax: 17, intitule: obj.criteres.t15_17 },
          { noteMin: 12, noteMax: 14, intitule: obj.criteres.t12_14 },
          { noteMin: 0, noteMax: 11, intitule: obj.criteres.t0_11 },
        ];

        for (const crit of criteriaList) {
          if (crit.intitule && crit.intitule.trim() !== '') {
            await this.prisma.indicateurs.create({
              data: {
                id: 'ind-' + Date.now() + '-' + Math.random().toString(36).substring(2, 7),
                objectifId: targetObjId,
                intitule: crit.intitule.trim(),
                noteMin: crit.noteMin,
                noteMax: crit.noteMax,
              },
            });
          }
        }
      }
    }

    // Supprimer les objectifs retirés
    for (const e of existingObjs) {
      if (!keptIds.has(e.id)) {
        await this.prisma.objectifs.delete({
          where: { id: e.id },
        });
      }
    }

    // Mettre à jour le statut de la fiche si besoin
    await this.prisma.fiches_evaluation.update({
      where: { id: fiche.id },
      data: {
        statut: 'FIXATION_OBJECTIFS',
        updatedAt: new Date(),
      },
    });

    const refreshed = await this.prisma.objectifs.findMany({
      where: { ficheId: fiche.id },
      include: {
        indicateurs: true,
        evaluations: true,
      },
      orderBy: { createdAt: 'asc' },
    });

    return refreshed.map((o: any) => ({
      ...o,
      ponderation: o.ponderation !== undefined && o.ponderation !== null ? Number(o.ponderation) : 0,
    }));
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
