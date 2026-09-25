export function mapFicheToDto(f: any): any {
  if (!f) return null;

  return {
    id: f.id,
    statut: f.statut,
    noteGlobale: f.noteGlobale ? Number(f.noteGlobale) : undefined,
    observation: f.observation || '',
    cycleId: f.cycleId,
    salarieId: f.salarieId,
    typeEvaluation: f.typeEvaluation || 'STANDARD',
    cycle: f.cycles_evaluation
      ? {
          id: f.cycles_evaluation.id,
          libelle: f.cycles_evaluation.libelle,
          annee: f.cycles_evaluation.annee,
          statut: f.cycles_evaluation.statut,
          dateDebut: f.cycles_evaluation.dateOuverture?.toISOString(),
          dateFin: f.cycles_evaluation.dateFermeture?.toISOString(),
        }
      : { id: f.cycleId, libelle: "Cycle d'évaluation", annee: 2026, statut: 'ACTIF' },
    salarie: f.utilisateurs_cache
      ? {
          id: f.utilisateurs_cache.id_microsoft,
          nom: f.utilisateurs_cache.nom,
          prenom: '',
          email: f.utilisateurs_cache.email,
          role: f.utilisateurs_cache.role || 'SALARIE',
          poste: f.utilisateurs_cache.poste || '',
        }
      : { id: f.salarieId, nom: 'Salarié', prenom: '', email: '', role: 'SALARIE', poste: '' },
    objectifs: (f.objectifs || []).map((o: any) => ({
      id: o.id,
      intitule: o.intitule,
      noteGlobale: o.noteGlobale ? Number(o.noteGlobale) : undefined,
      indicateurs: o.indicateurs || [],
      evaluations: o.evaluations || [],
    })),
    competences: f.competences || [],
    feedbacks360: f.feedbacks_360 || [],
    bonus: f.bonus_commissions || null,
    historique: f.historique_evaluation || [],
    dateCreation: f.createdAt ? new Date(f.createdAt).toISOString() : new Date().toISOString(),
    updatedAt: f.updatedAt ? new Date(f.updatedAt).toISOString() : new Date().toISOString(),
  };
}
