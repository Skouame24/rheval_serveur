// ============================================================
// src/modules/evaluations/evaluations-acces.service.ts
// Qui peut lire ou agir sur une fiche d'évaluation ?
//
// - Lecture : le salarié, son N+1, son N+2, la RH (RH/DRH/ADMIN) et le PDG.
// - Actions du salarié (auto-évaluation, confirmation des objectifs, accord
//   final) : uniquement le salarié lui-même, et à la bonne étape.
// - Objectifs (fixation / modification) : le N+1 du salarié, la RH, le PDG.
// ============================================================

import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { ROLES_PILOTAGE_RH, type UtilisateurAuth } from '../../common/auth/auth.constants';

interface FicheAcces {
  id: string;
  salarieId: string;
  statut: string;
}

@Injectable()
export class EvaluationsAccesService {
  constructor(private readonly prisma: PrismaService) {}

  /** Même règle que le service : identifiant de fiche, sinon dernière fiche du salarié */
  async fiche(idOuSalarie: string): Promise<FicheAcces> {
    const select = { id: true, salarieId: true, statut: true } as const;
    const fiche =
      (await this.prisma.fiches_evaluation.findUnique({ where: { id: idOuSalarie }, select })) ??
      (await this.prisma.fiches_evaluation.findFirst({
        where: { salarieId: idOuSalarie },
        orderBy: { createdAt: 'desc' },
        select,
      }));
    if (!fiche) throw new NotFoundException(`Fiche ${idOuSalarie} introuvable`);
    return fiche as FicheAcces;
  }

  private estPilotage(u: UtilisateurAuth): boolean {
    return !!u.pdg || ROLES_PILOTAGE_RH.includes(u.role);
  }

  /** N+1 et N+2 du salarié */
  private async hierarchie(salarieId: string): Promise<{ n1: string | null; n2: string | null }> {
    const salarie = await this.prisma.utilisateurs_cache.findUnique({
      where: { id_microsoft: salarieId },
      select: { managerId: true },
    });
    const n1 = salarie?.managerId ?? null;
    if (!n1) return { n1: null, n2: null };
    const manager = await this.prisma.utilisateurs_cache.findUnique({
      where: { id_microsoft: n1 },
      select: { managerId: true },
    });
    return { n1, n2: manager?.managerId ?? null };
  }

  /** Lecture d'une fiche : 404 si l'utilisateur n'y a pas accès (ne pas révéler son existence) */
  async assertLecture(idOuSalarie: string, u: UtilisateurAuth): Promise<void> {
    const f = await this.fiche(idOuSalarie);
    if (this.estPilotage(u) || f.salarieId === u.id) return;
    const { n1, n2 } = await this.hierarchie(f.salarieId);
    if (u.id === n1 || u.id === n2) return;
    throw new NotFoundException(`Fiche ${idOuSalarie} introuvable`);
  }

  /** Action réservée au salarié de la fiche, éventuellement à certaines étapes */
  async assertSalarie(idOuSalarie: string, u: UtilisateurAuth, etapes?: string[]): Promise<void> {
    const f = await this.fiche(idOuSalarie);
    if (f.salarieId !== u.id) {
      throw new ForbiddenException('Seul le collaborateur concerné peut effectuer cette action sur sa fiche.');
    }
    if (etapes && !etapes.includes(f.statut)) {
      throw new ForbiddenException("Cette action n'est pas possible à l'étape actuelle de l'évaluation.");
    }
  }

  /** Formations : salarié, N+1, N+2, RH ou PDG */
  async assertParticipant(idOuSalarie: string, u: UtilisateurAuth): Promise<string> {
    const f = await this.fiche(idOuSalarie);
    if (this.estPilotage(u) || f.salarieId === u.id) return f.id;
    const { n1, n2 } = await this.hierarchie(f.salarieId);
    if (u.id === n1 || u.id === n2) return f.id;
    throw new ForbiddenException("Vous n'intervenez pas sur cette évaluation.");
  }

  /** Objectifs d'un salarié : lecture pour salarié/N+1/N+2/RH/PDG */
  async assertLectureObjectifs(salarieId: string, u: UtilisateurAuth): Promise<void> {
    if (this.estPilotage(u) || salarieId === u.id) return;
    const { n1, n2 } = await this.hierarchie(salarieId);
    if (u.id === n1 || u.id === n2) return;
    throw new ForbiddenException("Vous n'avez pas accès aux objectifs de ce collaborateur.");
  }

  /** Fixer / modifier des objectifs : N+1 du salarié, RH ou PDG */
  async assertFixationObjectifs(salarieId: string, u: UtilisateurAuth): Promise<void> {
    if (this.estPilotage(u)) return;
    const { n1 } = await this.hierarchie(salarieId);
    if (n1 && u.id === n1) return;
    throw new ForbiddenException('Seul le responsable direct peut fixer les objectifs de ce collaborateur.');
  }

  /** Objectif → salarié concerné */
  async salarieDeObjectif(objectifId: string): Promise<string> {
    const o = await this.prisma.objectifs.findUnique({ where: { id: objectifId }, select: { ficheId: true } });
    if (!o) throw new NotFoundException(`Objectif ${objectifId} introuvable`);
    return (await this.fiche(o.ficheId)).salarieId;
  }

  /** La formation appartient-elle bien à cette fiche ? */
  async assertFormationDeFiche(formationId: string, ficheId: string): Promise<void> {
    const f = await this.prisma.formations.findUnique({ where: { id: formationId }, select: { ficheId: true } });
    if (!f || f.ficheId !== ficheId) throw new NotFoundException('Formation introuvable');
  }
}
