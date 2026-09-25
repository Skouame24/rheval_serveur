import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { mapFicheToDto } from '../../common/fiche.mapper';

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

    const fiche = await this.prisma.fiches_evaluation.findFirst({
      where: { salarieId: uId },
      orderBy: { createdAt: 'desc' },
      include: {
        cycles_evaluation: true,
        utilisateurs_cache: true,
        objectifs: {
          include: {
            indicateurs: true,
            evaluations: true,
          },
        },
        competences: true,
        feedbacks_360: true,
        bonus_commissions: true,
        historique_evaluation: true,
      },
    });

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
      annee: f.cycles_evaluation?.annee || new Date(f.createdAt).getFullYear(),
      libelle: f.cycles_evaluation?.libelle || "Évaluation Annuelle",
      note: f.noteGlobale ? Number(f.noteGlobale) : 0,
      statut: f.statut,
      dateValidation: f.updatedAt.toISOString(),
    }));
  }

  async signSalarie(id: string, observation: string, userId?: string) {
    const existing = await this.prisma.fiches_evaluation.findUnique({
      where: { id },
    });

    if (!existing) {
      throw new NotFoundException(`Fiche d'évaluation ${id} introuvable`);
    }

    await this.prisma.fiches_evaluation.update({
      where: { id },
      data: {
        statut: 'VISA_SALARIE',
        observation: observation || existing.observation,
        updatedAt: new Date(),
      },
    });

    await this.prisma.historique_evaluation.create({
      data: {
        id: 'hist-' + Date.now(),
        statutFiche: 'VISA_SALARIE',
        action: 'SIGNATURE_SALARIE',
        commentaire: observation,
        effectueParId: userId || existing.salarieId,
        ficheId: id,
        dateAction: new Date(),
      },
    });

    return {
      success: true,
      message: 'Signature enregistrée avec succès',
    };
  }

  async submitNotesN1(id: string, dto: { notes: Array<{ objectifId: string; note: number }>; observations?: string }, managerId?: string) {
    const existing = await this.prisma.fiches_evaluation.findUnique({
      where: { id },
      include: { objectifs: true },
    });

    if (!existing) {
      throw new NotFoundException(`Fiche ${id} introuvable`);
    }

    // Mettre à jour les notes par objectif
    if (dto.notes && dto.notes.length > 0) {
      for (const item of dto.notes) {
        await this.prisma.evaluations.upsert({
          where: {
            examinateurId_objectifId: {
              examinateurId: managerId || 'mgr-n1',
              objectifId: item.objectifId,
            },
          },
          update: {
            note: item.note,
            updatedAt: new Date(),
          },
          create: {
            examinateurId: managerId || 'mgr-n1',
            objectifId: item.objectifId,
            note: item.note,
            updatedAt: new Date(),
          },
        });
      }
    }

    // Calcul de la note globale moyenne
    let noteGlobale = existing.noteGlobale;
    if (dto.notes && dto.notes.length > 0) {
      const sum = dto.notes.reduce((acc, curr) => acc + Number(curr.note), 0);
      noteGlobale = (sum / dto.notes.length) as any;
    }

    const updated = await this.prisma.fiches_evaluation.update({
      where: { id },
      data: {
        statut: 'EN_ATTENTE_N2',
        noteGlobale: noteGlobale,
        observation: dto.observations || existing.observation,
        updatedAt: new Date(),
      },
      include: {
        cycles_evaluation: true,
        utilisateurs_cache: true,
        objectifs: {
          include: { indicateurs: true, evaluations: true },
        },
        competences: true,
        feedbacks_360: true,
        bonus_commissions: true,
        historique_evaluation: true,
      },
    });

    return mapFicheToDto(updated);
  }

  async submitNotesN2(id: string, dto: { notes: Array<{ objectifId: string; note: number }>; observations?: string }, n2Id?: string) {
    const existing = await this.prisma.fiches_evaluation.findUnique({
      where: { id },
    });

    if (!existing) {
      throw new NotFoundException(`Fiche ${id} introuvable`);
    }

    const updated = await this.prisma.fiches_evaluation.update({
      where: { id },
      data: {
        statut: 'VALIDATION_DRH',
        observation: dto.observations || existing.observation,
        updatedAt: new Date(),
      },
      include: {
        cycles_evaluation: true,
        utilisateurs_cache: true,
        objectifs: {
          include: { indicateurs: true, evaluations: true },
        },
        competences: true,
        feedbacks_360: true,
        bonus_commissions: true,
        historique_evaluation: true,
      },
    });

    return mapFicheToDto(updated);
  }

  async getAllForRh() {
    const fiches = await this.prisma.fiches_evaluation.findMany({
      include: {
        cycles_evaluation: true,
        utilisateurs_cache: true,
        objectifs: {
          include: { indicateurs: true, evaluations: true },
        },
        competences: true,
        feedbacks_360: true,
        bonus_commissions: true,
        historique_evaluation: true,
      },
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
      const team = await this.prisma.utilisateurs_cache.findMany({
        where: { managerId: mgrId },
        select: { id_microsoft: true },
      });
      teamIds = team.map((t) => t.id_microsoft);
    }

    const fiches = await this.prisma.fiches_evaluation.findMany({
      where: teamIds.length > 0 ? { salarieId: { in: teamIds } } : {},
      include: {
        cycles_evaluation: true,
        utilisateurs_cache: true,
        objectifs: {
          include: { indicateurs: true, evaluations: true },
        },
        competences: true,
        feedbacks_360: true,
        bonus_commissions: true,
        historique_evaluation: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    return fiches.map(mapFicheToDto);
  }
}
