export function mapFicheToDto(f: any): any {
  if (!f) return null;

  // Calcul dynamique de la note d'auto-évaluation et note N+1 depuis les objectifs et évaluations
  let totalPonderationAuto = 0;
  let sumPondereeAuto = 0;
  let hasAutoEvaluations = false;

  const mappedObjectifs = (f.objectifs || []).map((o: any) => {
    const evalSal = (o.evaluations || []).find(
      (e: any) => e.examinateurId === f.salarieId || e.type === 'SALARIE'
    );
    const evalN1 = (o.evaluations || []).find(
      (e: any) => e.examinateurId !== f.salarieId && e.type !== 'SALARIE'
    );

    const pond = o.ponderation !== undefined && o.ponderation !== null ? Number(o.ponderation) : 0;
    const noteSal = evalSal?.note !== undefined && evalSal?.note !== null ? Number(evalSal.note) : undefined;
    const noteN1 = evalN1?.note !== undefined && evalN1?.note !== null ? Number(evalN1.note) : (o.noteGlobale ? Number(o.noteGlobale) : undefined);

    if (noteSal !== undefined) {
      hasAutoEvaluations = true;
      sumPondereeAuto += noteSal * (pond / 100);
      totalPonderationAuto += pond;
    }

    return {
      id: o.id,
      intitule: o.intitule,
      description: o.description || '',
      ponderation: pond,
      noteSalarie: noteSal,
      commentaireSalarie: evalSal?.observation || '',
      noteObtenue: noteN1,
      commentaire: evalN1?.observation || '',
      noteGlobale: noteN1,
      indicateurs: o.indicateurs || [],
      evaluations: o.evaluations || [],
    };
  });

  const noteAutoEvaluation = hasAutoEvaluations && totalPonderationAuto > 0
    ? Number(sumPondereeAuto.toFixed(2))
    : undefined;

  // Résolution dynamique et fluide du statut :
  let resolvedStatut = f.statut;

  // 1. Si des objectifs sont déjà enregistrés mais que la fiche est encore marquée FIXATION_OBJECTIFS -> AUTO_EVALUATION
  if (resolvedStatut === 'FIXATION_OBJECTIFS' && (f.objectifs || []).length > 0) {
    resolvedStatut = 'AUTO_EVALUATION';
  }

  // 2. Si le salarié a saisi son auto-évaluation -> EVALUATION_N2 si N1 direct, sinon EVALUATION_N1
  if ((resolvedStatut === 'FIXATION_OBJECTIFS' || resolvedStatut === 'AUTO_EVALUATION') && hasAutoEvaluations) {
    const isDirectN2 = f.utilisateurs_cache?.role === 'N1' || f.utilisateurs_cache?.managerId === 'drh-id-1234';
    resolvedStatut = isDirectN2 ? 'EVALUATION_N2' : 'EVALUATION_N1';
  }

  return {
    id: f.id,
    statut: resolvedStatut,
    noteGlobale: f.noteGlobale ? Number(f.noteGlobale) : undefined,
    noteAutoEvaluation: noteAutoEvaluation,
    hasAutoEvaluation: hasAutoEvaluations,
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
          managerId: f.utilisateurs_cache.managerId || null,
        }
      : { id: f.salarieId, nom: 'Salarié', prenom: '', email: '', role: 'SALARIE', poste: '', managerId: null },
    objectifs: mappedObjectifs,
    competences: f.competences || [],
    formations: (f.formations || []).map((form: any) => ({
      id: form.id,
      intitule: form.intitule,
      delai: form.delai || '',
      priorite: form.priorite || 'MOYENNE',
      objectifVise: form.objectifVise || '',
      statut: form.statut || 'DEMANDE',
      ficheId: form.ficheId,
      createdAt: form.createdAt ? new Date(form.createdAt).toISOString() : undefined,
    })),
    feedbacks360: f.feedbacks_360 || [],
    bonus: f.bonus_commissions || null,
    historique: f.historique_evaluation || [],
    dateCreation: f.createdAt ? new Date(f.createdAt).toISOString() : new Date().toISOString(),
    updatedAt: f.updatedAt ? new Date(f.updatedAt).toISOString() : new Date().toISOString(),
  };
}
