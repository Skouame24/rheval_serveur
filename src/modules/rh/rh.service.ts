import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { mapFicheToDto } from '../../common/fiche.mapper';
import * as ExcelJS from 'exceljs';
import type { Response } from 'express';

@Injectable()
export class RhService {
  constructor(private prisma: PrismaService) {}

  async getDashboardStats() {
    const totalSalaries = await this.prisma.utilisateurs_cache.count();
    const cycleActif = await this.prisma.cycles_evaluation.findFirst({
      where: { statut: 'ACTIF' },
      orderBy: { annee: 'desc' },
    });

    const fiches = await this.prisma.fiches_evaluation.findMany();
    const fichesCompletes = fiches.filter((f) => ['VALIDE', 'CLOTURE'].includes(f.statut)).length;
    const fichesEnCours = fiches.filter((f) => !['VALIDE', 'CLOTURE', 'FIXATION_OBJECTIFS'].includes(f.statut)).length;
    const fichesNonDemarrees = Math.max(0, totalSalaries - fiches.length);

    const notes = fiches.filter((f) => f.noteGlobale != null).map((f) => Number(f.noteGlobale));
    const moyenneGlobale = notes.length > 0 ? Number((notes.reduce((a, b) => a + b, 0) / notes.length).toFixed(2)) : 0;

    const arbitragesOuverts = fiches.filter((f) => f.statut === 'ARBITRAGE').length;
    const tauxCompletion = totalSalaries > 0 ? Math.round((fichesCompletes / totalSalaries) * 100) : 0;

    const repartitionStatuts: Record<string, number> = {};
    for (const f of fiches) {
      repartitionStatuts[f.statut] = (repartitionStatuts[f.statut] || 0) + 1;
    }

    return {
      totalSalaries,
      fichesCompletes,
      fichesEnCours,
      fichesNonDemarrees,
      tauxCompletion,
      moyenneGlobale,
      arbitragesOuverts,
      cycleActif: cycleActif
        ? {
            id: cycleActif.id,
            annee: cycleActif.annee,
            libelle: cycleActif.libelle,
            statut: cycleActif.statut,
          }
        : null,
      repartitionStatuts,
    };
  }

  async getArbitrages() {
    const fiches = await this.prisma.fiches_evaluation.findMany({
      where: { statut: 'ARBITRAGE' },
      include: {
        cycles_evaluation: true,
        utilisateurs_cache: true,
        objectifs: true,
        historique_evaluation: true,
      },
    });

    return fiches.map(mapFicheToDto);
  }

  async resolveArbitrage(id: string, dto: { decision: string; noteFinale: number }) {
    const existing = await this.prisma.fiches_evaluation.findUnique({
      where: { id },
    });

    if (!existing) {
      throw new NotFoundException(`Dossier d'arbitrage ${id} introuvable`);
    }

    await this.prisma.fiches_evaluation.update({
      where: { id },
      data: {
        statut: 'VALIDE',
        noteGlobale: dto.noteFinale,
        observation: dto.decision,
        updatedAt: new Date(),
      },
    });

    await this.prisma.historique_evaluation.create({
      data: {
        id: 'hist-' + Date.now(),
        statutFiche: 'VALIDE',
        action: 'ARBITRAGE_RESOLU',
        commentaire: `Décision RH : ${dto.decision} (Note finale : ${dto.noteFinale}/20)`,
        effectueParId: 'rh-arbitre',
        ficheId: id,
        dateAction: new Date(),
      },
    });

    return {
      success: true,
      message: "Arbitrage résolu et note finale enregistrée avec succès",
    };
  }

  async getBonusResultats(cycleId?: string) {
    const fiches = await this.prisma.fiches_evaluation.findMany({
      where: cycleId ? { cycleId } : {},
      include: {
        cycles_evaluation: true,
        utilisateurs_cache: true,
        bonus_commissions: true,
      },
    });

    return fiches.map((f) => {
      const noteFinale = f.noteGlobale ? Number(f.noteGlobale) : 0;
      const tauxAtteinte = Math.round((noteFinale / 20) * 100);
      let tauxBonusEstime = 0;
      let palierLibelle = 'Non éligible';

      if (tauxAtteinte >= 90) {
        tauxBonusEstime = 100;
        palierLibelle = 'Excellence (100%)';
      } else if (tauxAtteinte >= 75) {
        tauxBonusEstime = 75;
        palierLibelle = 'Très Bon (75%)';
      } else if (tauxAtteinte >= 60) {
        tauxBonusEstime = 50;
        palierLibelle = 'Satisfaisant (50%)';
      }

      return {
        id: f.id,
        salarieId: f.salarieId,
        salarie: {
          id: f.utilisateurs_cache?.id_microsoft || f.salarieId,
          nom: f.utilisateurs_cache?.nom || 'Collaborateur',
          prenom: '',
          email: f.utilisateurs_cache?.email || '',
          role: f.utilisateurs_cache?.role || 'SALARIE',
          poste: f.utilisateurs_cache?.poste || '',
        },
        cycleId: f.cycleId,
        cycle: {
          id: f.cycles_evaluation?.id || f.cycleId,
          annee: f.cycles_evaluation?.annee || 2026,
          libelle: f.cycles_evaluation?.libelle || "Évaluation Annuelle",
          statut: f.cycles_evaluation?.statut || 'ACTIF',
          dateDebut: f.cycles_evaluation?.dateOuverture?.toISOString() || '',
          dateFin: f.cycles_evaluation?.dateFermeture?.toISOString() || '',
        },
        noteFinale,
        tauxAtteinte,
        tauxBonusEstime,
        palierApplique: {
          id: 'pal-auto',
          baremeId: 'bar-default',
          seuilMin: 0,
          seuilMax: 100,
          tauxBonus: tauxBonusEstime,
          libelle: palierLibelle,
        },
        dateCalcul: new Date().toISOString(),
      };
    });
  }

  async getBaremeActif() {
    return {
      id: 'bar-2026',
      cycleId: 'cyc-actif',
      cycle: {
        id: 'cyc-actif',
        annee: 2026,
        libelle: 'Campagne Annuelle 2026',
        statut: 'ACTIF',
        dateDebut: '2026-01-01',
        dateFin: '2026-12-31',
      },
      paliers: [
        { id: 'p1', baremeId: 'bar-2026', seuilMin: 90, seuilMax: 100, tauxBonus: 100, libelle: 'Excellence' },
        { id: 'p2', baremeId: 'bar-2026', seuilMin: 75, seuilMax: 89, tauxBonus: 75, libelle: 'Très bon' },
        { id: 'p3', baremeId: 'bar-2026', seuilMin: 60, seuilMax: 74, tauxBonus: 50, libelle: 'Satisfaisant' },
        { id: 'p4', baremeId: 'bar-2026', seuilMin: 0, seuilMax: 59, tauxBonus: 0, libelle: 'Insuffisant' },
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  }

  async exportExcel(cycleId: string, res: Response) {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Évaluations & Bonus');

    worksheet.columns = [
      { header: 'Salarié', key: 'nom', width: 28 },
      { header: 'Email', key: 'email', width: 30 },
      { header: 'Poste', key: 'poste', width: 25 },
      { header: 'Département', key: 'departement', width: 22 },
      { header: 'Statut Évaluation', key: 'statut', width: 20 },
      { header: 'Note Globale (/20)', key: 'note', width: 18 },
      { header: 'Taux Atteinte (%)', key: 'taux', width: 18 },
      { header: 'Éligibilité Bonus', key: 'bonus', width: 20 },
    ];

    const fiches = await this.prisma.fiches_evaluation.findMany({
      where: cycleId ? { cycleId } : {},
      include: {
        utilisateurs_cache: true,
      },
    });

    for (const f of fiches) {
      const note = f.noteGlobale ? Number(f.noteGlobale) : 0;
      const taux = Math.round((note / 20) * 100);
      let bonus = '0%';
      if (taux >= 90) bonus = '100% Bonus';
      else if (taux >= 75) bonus = '75% Bonus';
      else if (taux >= 60) bonus = '50% Bonus';

      worksheet.addRow({
        nom: f.utilisateurs_cache?.nom || 'Inconnu',
        email: f.utilisateurs_cache?.email || '',
        poste: f.utilisateurs_cache?.poste || '',
        departement: f.utilisateurs_cache?.departement || '',
        statut: f.statut,
        note: note > 0 ? note : 'N/A',
        taux: note > 0 ? `${taux}%` : 'N/A',
        bonus: note > 0 ? bonus : 'N/A',
      });
    }

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', `attachment; filename=AGILLY_RHEVAL_Export_${cycleId || 'global'}.xlsx`);

    await workbook.xlsx.write(res);
    res.end();
  }
}
