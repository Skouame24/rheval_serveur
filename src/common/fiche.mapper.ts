export function mapFicheToDto(f: any): any {
  if (!f) return null;

  // Calcul dynamique de la note d'auto-évaluation et note N+1 depuis les objectifs et évaluations
  let totalPonderationAuto = 0;
  let sumPondereeAuto = 0;
  let hasAutoEvaluations = false;

  const mappedObjectifs = (f.objectifs || []).map((o: any) => {
    const allEvals = o.evaluations || [];
    const evalSal = allEvals.find(
      (e: any) => e.examinateurId === f.salarieId || e.type === 'SALARIE'
    );
    const nonSalEvals = allEvals.filter(
      (e: any) => e.examinateurId !== f.salarieId && e.type !== 'SALARIE'
    );
    const evalN1 = nonSalEvals.find(
      (e: any) => e.examinateurId === f.utilisateurs_cache?.managerId || !e.examinateurId?.includes('n2')
    ) || nonSalEvals[0];
    const evalN2 = nonSalEvals.find(
      (e: any) => e !== evalN1 && (e.examinateurId?.includes('n2') || e.examinateurId === 'drh-id-1234' || e.examinateurId !== evalN1?.examinateurId)
    );

    const pond = o.ponderation !== undefined && o.ponderation !== null ? Number(o.ponderation) : 0;
    const noteSal = evalSal?.note !== undefined && evalSal?.note !== null ? Number(evalSal.note) : undefined;
    const noteN1 = evalN1?.note !== undefined && evalN1?.note !== null ? Number(evalN1.note) : (o.noteGlobale ? Number(o.noteGlobale) : undefined);
    const noteN2 = evalN2?.note !== undefined && evalN2?.note !== null ? Number(evalN2.note) : undefined;

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
      noteN2: noteN2,
      commentaireN2: evalN2?.observation || '',
      noteGlobale: noteN1,
      indicateurs: o.indicateurs || [],
      evaluations: o.evaluations || [],
    };
  });

  const noteAutoEvaluation = hasAutoEvaluations && totalPonderationAuto > 0
    ? Number(sumPondereeAuto.toFixed(2))
    : undefined;

  // Si le salarié a auto-évalué et le statut est encore FIXATION_OBJECTIFS, on avance dynamiquement à EN_ATTENTE_N1
  let resolvedStatut = f.statut;
  if (resolvedStatut === 'FIXATION_OBJECTIFS' && hasAutoEvaluations) {
    resolvedStatut = 'EN_ATTENTE_N1';
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
        }
      : { id: f.salarieId, nom: 'Salarié', prenom: '', email: '', role: 'SALARIE', poste: '' },
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
      createdAt: form.createdAt ? new Date(form.createdAt).toISOString() : '',
    })),
    feedbacks360: f.feedbacks_360 || [],
    bonus: f.bonus_commissions || null,
    historique: f.historique_evaluation || [],
    dateCreation: f.createdAt ? new Date(f.createdAt).toISOString() : new Date().toISOString(),
    updatedAt: f.updatedAt ? new Date(f.updatedAt).toISOString() : new Date().toISOString(),
  };
}
