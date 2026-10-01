import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { mapFicheToDto } from '../../common/fiche.mapper';
import { getSubordinateIds } from '../../common/hierarchy.helper';

const FICHE_INCLUDE = {
  cycles_evaluation: true,
  utilisateurs_cache: true,
  objectifs: {
    include: {
      indicateurs: true,
      evaluations: true,
    },
  },
  competences: true,
  formations: true,
  feedbacks_360: true,
  bonus_commissions: true,
  historique_evaluation: true,
};

@Injectable()
export class EvaluationsService {
  constructor(private prisma: PrismaService) {}

  async getMyCurrent(userId?: string) {
    let uId = userId;
    if (!uId) {
      const firstUser = await this.prisma.utilisateurs_cache.findFirst();
      uId = firstUser?.id_microsoft;
    }

    if (!uId) return null;

    let fiche = await this.prisma.fiches_evaluation.findFirst({
      where: { salarieId: uId },
      orderBy: { createdAt: 'desc' },
      include: FICHE_INCLUDE,
    });

    if (!fiche) {
      const user = await this.prisma.utilisateurs_cache.findFirst({
        where: {
          OR: [
            { id_microsoft: uId },
            { email: { contains: uId, mode: 'insensitive' } },
          ],
        },
      });
      if (user) {
        fiche = await this.prisma.fiches_evaluation.findFirst({
          where: { salarieId: user.id_microsoft },
          orderBy: { createdAt: 'desc' },
          include: FICHE_INCLUDE,
        });
      }
    }

    if (!fiche) return null;
    return mapFicheToDto(fiche);
  }

  async getMyHistory(userId?: string, annee?: number, statut?: string) {
    let uId = userId;
    if (!uId) {
      const firstUser = await this.prisma.utilisateurs_cache.findFirst();
      uId = firstUser?.id_microsoft;
    }

    if (!uId) return [];

    const fiches = await this.prisma.fiches_evaluation.findMany({
      where: {
        salarieId: uId,
        ...(statut ? { statut } : {}),
      },
      include: {
        cycles_evaluation: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    return fiches.map((f) => ({
      id: f.id,
      annee: f.cycles_evaluation?.annee || new Date(f.createdAt).getFullYear(),
      libelle: f.cycles_evaluation?.libelle || "Évaluation Annuelle",
      note: f.noteGlobale ? Number(f.noteGlobale) : 0,
      statut: f.statut,
      dateValidation: f.updatedAt.toISOString(),
    }));
  }

  async getOne(id: string) {
    let fiche = await this.prisma.fiches_evaluation.findUnique({
      where: { id },
      include: FICHE_INCLUDE,
    });

    if (!fiche) {
      fiche = await this.prisma.fiches_evaluation.findFirst({
        where: { salarieId: id },
        orderBy: { createdAt: 'desc' },
        include: FICHE_INCLUDE,
      });
    }

    if (!fiche) {
      throw new NotFoundException(`Fiche ${id} introuvable`);
    }

    return mapFicheToDto(fiche);
  }

  async signSalarie(id: string, observation: string, userId?: string) {
    return this.submitVisaSalarie(id, { accord: true, observation }, userId);
  }

  async submitVisaSalarie(id: string, dto: { accord: boolean; observation?: string }, userId?: string) {
    const existing = await this.prisma.fiches_evaluation.findUnique({
      where: { id },
    });

    if (!existing) {
      throw new NotFoundException(`Fiche d'évaluation ${id} introuvable`);
    }

    const nextStatut = dto.accord === false ? 'ARBITRAGE' : 'VALIDATION_N2';

    const updated = await this.prisma.fiches_evaluation.update({
      where: { id },
      data: {
        statut: nextStatut,
        observation: dto.observation || existing.observation,
        updatedAt: new Date(),
      },
      include: FICHE_INCLUDE,
    });

    await this.prisma.historique_evaluation.create({
      data: {
        id: 'hist-' + Date.now(),
        statutFiche: nextStatut,
        action: dto.accord === false ? 'VISA_SALARIE_DESACCORD' : 'VISA_SALARIE_ACCORD',
        commentaire: dto.observation || (dto.accord ? 'Visa Salarié accordé sans réserve' : 'Visa Salarié avec désaccord / réserves'),
        effectueParId: userId || existing.salarieId,
        ficheId: id,
        dateAction: new Date(),
      },
    });

    return mapFicheToDto(updated);
  }

  async submitAutoEvaluation(
    id: string,
    dto: { notes: Array<{ objectifId: string; note: number; commentaire?: string }>; observations?: string },
    userId?: string,
  ) {
    const existing = await this.prisma.fiches_evaluation.findUnique({
      where: { id },
      include: { objectifs: true },
    });

    if (!existing) {
      throw new NotFoundException(`Fiche ${id} introuvable`);
    }

    const examinateurId = userId || existing.salarieId;

    if (dto.notes && dto.notes.length > 0) {
      for (const item of dto.notes) {
        await this.prisma.evaluations.upsert({
          where: {
            examinateurId_objectifId: {
              examinateurId,
              objectifId: item.objectifId,
            },
          },
          update: {
            note: item.note,
            observation: item.commentaire,
            updatedAt: new Date(),
          },
          create: {
            examinateurId,
            objectifId: item.objectifId,
            note: item.note,
            observation: item.commentaire,
            updatedAt: new Date(),
          },
        });
      }
    }

    // Déterminer le statut suivant : si le salarié est un manager N1 direct (ou supervisé par N2), il passe directement à EVALUATION_N2
    let isEvaluatedByN2Directly = false;
    const userCache = await this.prisma.utilisateurs_cache.findUnique({
      where: { id_microsoft: existing.salarieId },
    });
    if (userCache?.role === 'N1' || userCache?.role === 'MANAGER') {
      isEvaluatedByN2Directly = true;
    } else if (userCache?.managerId) {
      const mgr = await this.prisma.utilisateurs_cache.findUnique({
        where: { id_microsoft: userCache.managerId },
      });
      if (mgr?.role === 'N2' || mgr?.role === 'DRH') {
        isEvaluatedByN2Directly = true;
      }
    }

    const nextStatut = isEvaluatedByN2Directly ? 'EVALUATION_N2' : 'EVALUATION_N1';

    const updated = await this.prisma.fiches_evaluation.update({
      where: { id },
      data: {
        statut: nextStatut,
        observation: dto.observations || existing.observation,
        updatedAt: new Date(),
      },
      include: FICHE_INCLUDE,
    });

    await this.prisma.historique_evaluation.create({
      data: {
        id: 'hist-' + Date.now(),
        statutFiche: existing.statut,
        action: 'AUTO_EVALUATION_SOUMISE',
        commentaire: dto.observations || 'Auto-évaluation mise à jour par le collaborateur',
        effectueParId: examinateurId,
        ficheId: id,
        dateAction: new Date(),
      },
    });

    return mapFicheToDto(updated);
  }

  async submitNotesN1(
    id: string,
    dto: {
      notes: Array<{ objectifId: string; note: number; commentaire?: string; observation?: string }>;
      formations?: Array<{ id?: string; intitule?: string; formation?: string; delai?: string; priorite?: string; objectifVise?: string }>;
      observations?: string;
    },
    managerId?: string
  ) {
    let existing = await this.prisma.fiches_evaluation.findUnique({
      where: { id },
      include: { objectifs: true },
    });

    if (!existing) {
      existing = await this.prisma.fiches_evaluation.findFirst({
        where: { salarieId: id },
        include: { objectifs: true },
        orderBy: { createdAt: 'desc' },
      });
    }

    if (!existing) {
      throw new NotFoundException(`Fiche ${id} introuvable`);
    }

    const ficheId = existing.id;

    // Mettre à jour les notes par objectif
    if (dto.notes && dto.notes.length > 0) {
      for (const item of dto.notes) {
        const obs = item.commentaire || item.observation || undefined;
        await this.prisma.evaluations.upsert({
          where: {
            examinateurId_objectifId: {
              examinateurId: managerId || 'mgr-n1',
              objectifId: item.objectifId,
            },
          },
          update: {
            note: item.note,
            ...(obs ? { observation: obs } : {}),
            updatedAt: new Date(),
          },
          create: {
            examinateurId: managerId || 'mgr-n1',
            objectifId: item.objectifId,
            note: item.note,
            ...(obs ? { observation: obs } : {}),
            updatedAt: new Date(),
          },
        });
      }
    }

    // Mettre à jour les formations préconisées par le N+1
    if (dto.formations !== undefined && Array.isArray(dto.formations)) {
      await this.prisma.formations.deleteMany({ where: { ficheId } });
      if (dto.formations.length > 0) {
        await this.prisma.formations.createMany({
          data: dto.formations.map((f: any) => ({
            id: f.id && !f.id.startsWith('temp-') ? f.id : 'form-' + Date.now() + '-' + Math.random().toString(36).substring(2, 7),
            ficheId: ficheId,
            intitule: f.intitule || f.formation || '',
            delai: f.delai || '',
            priorite: f.priorite || 'MOYENNE',
            objectifVise: f.objectifVise || '',
            statut: f.statut || 'DEMANDE',
            updatedAt: new Date(),
          })),
        });
      }
    }

    // Calcul de la note globale pondérée
    let noteGlobale = existing.noteGlobale;
    if (dto.notes && dto.notes.length > 0) {
      let totalPond = 0;
      let sumPond = 0;
      for (const item of dto.notes) {
        const obj = existing.objectifs.find((o) => o.id === item.objectifId);
        const p = Number(obj?.ponderation) || 0;
        if (p > 0) {
          sumPond += Number(item.note) * (p / 100);
          totalPond += p;
        }
      }
      if (totalPond > 0) {
        noteGlobale = Number(sumPond.toFixed(2)) as any;
      } else {
        const sum = dto.notes.reduce((acc, curr) => acc + Number(curr.note), 0);
        noteGlobale = Number((sum / dto.notes.length).toFixed(2)) as any;
      }
    }

    const updated = await this.prisma.fiches_evaluation.update({
      where: { id: ficheId },
      data: {
        statut: 'EVALUATION_N2',
        noteGlobale: noteGlobale,
        observation: dto.observations || existing.observation,
        updatedAt: new Date(),
      },
      include: FICHE_INCLUDE,
    });

    await this.prisma.historique_evaluation.create({
      data: {
        id: 'hist-' + Date.now(),
        statutFiche: 'EVALUATION_N2',
        action: 'EVALUATION_N1_SOUMISE',
        commentaire: dto.observations || 'Évaluation N+1 validée et transmise à la Direction N+2 pour revue',
        effectueParId: managerId || 'mgr-n1',
        ficheId: ficheId,
        dateAction: new Date(),
      },
    });

    return mapFicheToDto(updated);
  }

  async submitNotesN2(
    id: string,
    dto: {
      notes?: Array<{ objectifId: string; note: number; commentaire?: string }>;
      observations?: string;
      decision?: 'APPROUVE' | 'ARBITRAGE';
    },
    n2Id?: string,
  ) {
    let existing = await this.prisma.fiches_evaluation.findUnique({
      where: { id },
    });

    if (!existing) {
      existing = await this.prisma.fiches_evaluation.findFirst({
        where: { salarieId: id },
        orderBy: { createdAt: 'desc' },
      });
    }

    if (!existing) {
      throw new NotFoundException(`Fiche ${id} introuvable`);
    }

    const examinateurId = n2Id || 'drh-id-1234';

    if (dto.notes && dto.notes.length > 0) {
      for (const item of dto.notes) {
        await this.prisma.evaluations.upsert({
          where: {
            examinateurId_objectifId: {
              examinateurId,
              objectifId: item.objectifId,
            },
          },
          update: {
            note: item.note,
            observation: item.commentaire,
            updatedAt: new Date(),
          },
          create: {
            examinateurId,
            objectifId: item.objectifId,
            note: item.note,
            observation: item.commentaire,
            updatedAt: new Date(),
          },
        });
      }
    }

    const nextStatut = dto.decision === 'ARBITRAGE' ? 'ARBITRAGE' : 'VALIDATION_DRH';

    const updated = await this.prisma.fiches_evaluation.update({
      where: { id: existing.id },
      data: {
        statut: nextStatut,
        observation: dto.observations || existing.observation,
        updatedAt: new Date(),
      },
      include: FICHE_INCLUDE,
    });

    await this.prisma.historique_evaluation.create({
      data: {
        id: 'hist-' + Date.now(),
        statutFiche: nextStatut,
        action: dto.decision === 'ARBITRAGE' ? 'ARBITRAGE_DEMANDE_N2' : 'CONTRE_EVALUATION_N2',
        commentaire: dto.observations || (dto.decision === 'ARBITRAGE' ? "Arbitrage requis par le N+2 suite à un écart de notation" : 'Contre-évaluation et Visa N+2 validés'),
        effectueParId: examinateurId,
        ficheId: existing.id,
        dateAction: new Date(),
      },
    });

    return mapFicheToDto(updated);
  }

  async validerParRh(
    id: string,
    dto: { statut?: 'VALIDE' | 'CLOTURE' | 'ARBITRAGE'; commentaire?: string; noteFinale?: number },
    rhId?: string,
  ) {
    let existing = await this.prisma.fiches_evaluation.findUnique({
      where: { id },
    });

    if (!existing) {
      existing = await this.prisma.fiches_evaluation.findFirst({
        where: { salarieId: id },
        orderBy: { createdAt: 'desc' },
      });
    }

    if (!existing) {
      throw new NotFoundException(`Fiche ${id} introuvable`);
    }

    const targetStatut = dto.statut || 'VALIDE';

    const updated = await this.prisma.fiches_evaluation.update({
      where: { id: existing.id },
      data: {
        statut: targetStatut,
        noteGlobale: dto.noteFinale !== undefined ? (dto.noteFinale as any) : existing.noteGlobale,
        observation: dto.commentaire || existing.observation,
        updatedAt: new Date(),
      },
      include: FICHE_INCLUDE,
    });

    await this.prisma.historique_evaluation.create({
      data: {
        id: 'hist-' + Date.now(),
        statutFiche: targetStatut,
        action: targetStatut === 'ARBITRAGE' ? 'ARBITRAGE_RH' : 'VALIDATION_FINALE_DRH',
        commentaire: dto.commentaire || 'Validation finale et clôture de la fiche d\'évaluation par la Direction RH',
        effectueParId: rhId || 'drh-id-1234',
        ficheId: existing.id,
        dateAction: new Date(),
      },
    });

    return mapFicheToDto(updated);
  }

  private async ensureFichesForActiveCycle() {
    try {
      const cycle = await this.prisma.cycles_evaluation.findFirst({
        where: { statut: { in: ['ACTIF', 'EN_COURS'] } },
        orderBy: { annee: 'desc' },
      });
      if (!cycle) return;

      const subordinates = await this.prisma.utilisateurs_cache.findMany({
        where: { managerId: { not: null } },
      });

      for (const sub of subordinates) {
        const existing = await this.prisma.fiches_evaluation.findFirst({
          where: { salarieId: sub.id_microsoft, cycleId: cycle.id },
        });
        if (!existing) {
          await this.prisma.fiches_evaluation.create({
            data: {
              id: 'fic-' + sub.id_microsoft.substring(0, 8) + '-' + Date.now().toString(36),
              statut: sub.role === 'N1' ? 'EVALUATION_N2' : 'FIXATION_OBJECTIFS',
              cycleId: cycle.id,
              salarieId: sub.id_microsoft,
              updatedAt: new Date(),
            },
          });
        }
      }
    } catch (e) {
      // Ignorer silencieusement si la synchronisation échoue
    }
  }

  async getAllForRh() {
    await this.ensureFichesForActiveCycle();
    const fiches = await this.prisma.fiches_evaluation.findMany({
      include: FICHE_INCLUDE,
      orderBy: { createdAt: 'desc' },
    });

    return fiches.map(mapFicheToDto);
  }

  async getN2TeamEvaluations(n2Id?: string) {
    await this.ensureFichesForActiveCycle();
    // Supervision N+2 : renvoie toutes les fiches du périmètre N+2
    const fiches = await this.prisma.fiches_evaluation.findMany({
      include: FICHE_INCLUDE,
      orderBy: { createdAt: 'desc' },
    });
    return fiches.map(mapFicheToDto);
  }

  async getN1TeamEvaluations(managerId?: string) {
    let mgrId = managerId;
    if (!mgrId) {
      const mgr = await this.prisma.utilisateurs_cache.findFirst({
        where: { role: { in: ['N1', 'N2', 'DRH'] } },
      });
      mgrId = mgr?.id_microsoft;
    }

    let teamIds: string[] = [];
    if (mgrId) {
      teamIds = await getSubordinateIds(this.prisma, mgrId);
    }

    let fiches: any[] = [];
    if (teamIds.length > 0) {
      fiches = await this.prisma.fiches_evaluation.findMany({
        where: { salarieId: { in: teamIds } },
        include: FICHE_INCLUDE,
        orderBy: { createdAt: 'desc' },
      });
    }

    // Fallback : si l'utilisateur est DRH ou N2 ou si aucun subordonné direct n'est trouvé
    if (fiches.length === 0 && mgrId) {
      const mgrUser = await this.prisma.utilisateurs_cache.findUnique({
        where: { id_microsoft: mgrId },
      });
      if (mgrUser?.role === 'DRH' || mgrUser?.role === 'RH' || mgrUser?.role === 'N2') {
        fiches = await this.prisma.fiches_evaluation.findMany({
          include: FICHE_INCLUDE,
          orderBy: { createdAt: 'desc' },
        });
      }
    }

    return fiches.map(mapFicheToDto);
  }

  async addFormation(ficheId: string, dto: { intitule: string; delai?: string; priorite?: string; objectifVise?: string }) {
    let existing = await this.prisma.fiches_evaluation.findUnique({ where: { id: ficheId } });
    if (!existing) {
      existing = await this.prisma.fiches_evaluation.findFirst({ where: { salarieId: ficheId }, orderBy: { createdAt: 'desc' } });
    }
    if (!existing) {
      throw new NotFoundException(`Fiche ${ficheId} introuvable`);
    }

    const created = await this.prisma.formations.create({
      data: {
        id: 'form-' + Date.now() + '-' + Math.random().toString(36).substring(2, 7),
        ficheId: existing.id,
        intitule: dto.intitule,
        delai: dto.delai || '',
        priorite: dto.priorite || 'MOYENNE',
        objectifVise: dto.objectifVise || '',
        statut: 'DEMANDE',
        updatedAt: new Date(),
      },
    });

    return created;
  }

  async deleteFormation(ficheId: string, formationId: string) {
    await this.prisma.formations.deleteMany({
      where: { id: formationId },
    });
    return { success: true };
  }
}
