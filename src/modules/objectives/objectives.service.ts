import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class ObjectivesService {
  constructor(private prisma: PrismaService) {}

  async getMyObjectifs(userId?: string, userEmail?: string) {
    let uId = userId;
    if (!uId && userEmail) {
      const user = await this.prisma.utilisateurs_cache.findFirst({
        where: { email: { equals: userEmail, mode: 'insensitive' } },
      });
      uId = user?.id_microsoft;
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
      where: {
        OR: [
          { salarieId },
          { id: salarieId },
        ],
      },
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
    if (!data.objectifs || data.objectifs.length === 0) {
      throw new BadRequestException('Veuillez définir au moins un objectif de performance.');
    }

    // 1. Trouver le cycle actif réel
    let cycleId = data.cycleId;
    if (!cycleId) {
      const activeCycle = await this.prisma.cycles_evaluation.findFirst({
        where: { statut: { in: ['ACTIF', 'EN_COURS'] } },
        orderBy: { annee: 'desc' },
      });
      cycleId = activeCycle?.id;
    } else {
      // Si un cycleId est fourni, vérifier qu'il est bien actif
      const specificCycle = await this.prisma.cycles_evaluation.findUnique({
        where: { id: cycleId },
      });
      if (!specificCycle || !['ACTIF', 'EN_COURS'].includes(specificCycle.statut)) {
        throw new BadRequestException(
          "La campagne d'évaluation spécifiée n'est pas active ou a été clôturée."
        );
      }
    }

    if (!cycleId) {
      throw new BadRequestException(
        "Aucune campagne d'évaluation n'est actuellement ouverte. Les RH doivent créer et lancer une campagne avant de pouvoir fixer des objectifs."
      );
    }

    // 2. Trouver ou créer la fiche d'évaluation
    let fiche = await this.prisma.fiches_evaluation.findFirst({
      where: {
        OR: [
          { salarieId: data.salarieId },
          { id: data.salarieId },
        ],
        cycleId,
      },
      orderBy: { createdAt: 'desc' },
    });

    let targetSalarieId = data.salarieId;

    if (!fiche) {
      // Vérifier si salarieId correspond à un utilisateur
      let user = await this.prisma.utilisateurs_cache.findUnique({
        where: { id_microsoft: data.salarieId },
      });

      if (!user) {
        // Est-ce un id de fiche existante ?
        const existingFiche = await this.prisma.fiches_evaluation.findUnique({
          where: { id: data.salarieId },
        });
        if (existingFiche) {
          fiche = existingFiche;
          targetSalarieId = existingFiche.salarieId;
        } else {
          throw new BadRequestException(
            `Collaborateur introuvable (${data.salarieId}). Veuillez vous assurer que le compte est connecté ou synchronisé.`
          );
        }
      }

      if (!fiche) {
        fiche = await this.prisma.fiches_evaluation.create({
          data: {
            id: 'fic-' + targetSalarieId.substring(0, 8) + '-' + Date.now().toString(36),
            statut: 'AUTO_EVALUATION',
            cycleId: cycleId,
            salarieId: targetSalarieId,
            updatedAt: new Date(),
          },
        });
      }
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
            intitule: obj.intitule.trim(),
            description: obj.description || '',
            ponderation: Number(obj.ponderation) || 0,
            updatedAt: new Date(),
          },
        });
      } else {
        await this.prisma.objectifs.create({
          data: {
            id: targetObjId,
            intitule: obj.intitule.trim(),
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

    // Faire progresser le statut vers AUTO_EVALUATION pour ouvrir l'auto-évaluation du collaborateur
    const nextStatut = fiche.statut === 'FIXATION_OBJECTIFS' ? 'AUTO_EVALUATION' : fiche.statut;
    await this.prisma.fiches_evaluation.update({
      where: { id: fiche.id },
      data: {
        statut: nextStatut,
        updatedAt: new Date(),
      },
    });

    // Journal d'audit
    await this.prisma.historique_evaluation.create({
      data: {
        id: 'hist-' + Date.now(),
        ficheId: fiche.id,
        action: 'OBJECTIFS_FIXES',
        statutFiche: nextStatut,
        commentaire: `${data.objectifs.length} objectif(s) de performance fixé(s) et transmis au collaborateur.`,
        effectueParId: 'mgr-n1',
        dateAction: new Date(),
      },
    }).catch(() => {});

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
