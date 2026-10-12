const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('=== Mise à jour du parcours de test RH : Salarié -> Responsable -> Directeur -> DRH ===\n');

  // 1. DRH : Aissatou BAH
  const drhId = 'drh-agilly-9933-4a48-bed2-72b525325c81';
  await prisma.utilisateurs_cache.upsert({
    where: { id_microsoft: drhId },
    update: {
      nom: 'Aissatou BAH',
      email: 'drh@agilly.net',
      poste: 'Directrice des Ressources Humaines',
      role: 'DRH',
      departement: 'Direction des Ressources Humaines',
      managerId: null,
      isCodir: true,
      updatedAt: new Date(),
    },
    create: {
      id_microsoft: drhId,
      nom: 'Aissatou BAH',
      email: 'drh@agilly.net',
      poste: 'Directrice des Ressources Humaines',
      role: 'DRH',
      departement: 'Direction des Ressources Humaines',
      managerId: null,
      isCodir: true,
      updatedAt: new Date(),
    },
  });
  console.log('✓ DRH configurée : Aissatou BAH');

  // 2. DIRECTEUR : Didier KABLAN (Directeur Digital, manager de Jean-Marc KOFFI)
  const dirId = 'dir-digital-8822-4a48-bed2-72b525325c81';
  await prisma.utilisateurs_cache.upsert({
    where: { id_microsoft: dirId },
    update: {
      nom: 'Didier KABLAN',
      email: 'directeur.digital@agilly.net',
      poste: 'Directeur des Systèmes d\'Information & Digital',
      role: 'N2',
      departement: 'Direction Générale / Digital',
      managerId: drhId,
      isCodir: true,
      updatedAt: new Date(),
    },
    create: {
      id_microsoft: dirId,
      nom: 'Didier KABLAN',
      email: 'directeur.digital@agilly.net',
      poste: 'Directeur des Systèmes d\'Information & Digital',
      role: 'N2',
      departement: 'Direction Générale / Digital',
      managerId: drhId,
      isCodir: true,
      updatedAt: new Date(),
    },
  });
  console.log('✓ Directeur configuré : Didier KABLAN (rapporte à la DRH)');

  // 3. RESPONSABLE : Jean-Marc KOFFI (Responsable Pôle Web, manager direct d\'Ebenezer)
  const respId = 'abe87afa-a80b-4a48-bed2-72b525325c81';
  await prisma.utilisateurs_cache.upsert({
    where: { id_microsoft: respId },
    update: {
      nom: 'Jean-Marc KOFFI',
      email: 'responsable.digital@agilly.net',
      poste: 'Responsable Pôle Digital & Web',
      role: 'N1',
      departement: 'Holding/Business Unit Digital',
      managerId: dirId,
      isCodir: false,
      updatedAt: new Date(),
    },
    create: {
      id_microsoft: respId,
      nom: 'Jean-Marc KOFFI',
      email: 'responsable.digital@agilly.net',
      poste: 'Responsable Pôle Digital & Web',
      role: 'N1',
      departement: 'Holding/Business Unit Digital',
      managerId: dirId,
      isCodir: false,
      updatedAt: new Date(),
    },
  });
  console.log('✓ Responsable configuré : Jean-Marc KOFFI (rapporte à Didier KABLAN)');

  // 4. SALARIÉ : Ebenezer Samuel KOUAME (Développeur, collaborateur direct de Jean-Marc)
  const salarieId = '0a5c4c64-abdd-4f4f-a3af-00057ebdddfb';
  await prisma.utilisateurs_cache.upsert({
    where: { id_microsoft: salarieId },
    update: {
      nom: 'Ebenezer Samuel KOUAME',
      email: 'ebenezer.kouame@agilly.net',
      poste: 'Développeur Fullstack',
      role: 'SALARIE',
      departement: 'Holding/Business Unit Digital',
      managerId: respId,
      isCodir: false,
      updatedAt: new Date(),
    },
    create: {
      id_microsoft: salarieId,
      nom: 'Ebenezer Samuel KOUAME',
      email: 'ebenezer.kouame@agilly.net',
      poste: 'Développeur Fullstack',
      role: 'SALARIE',
      departement: 'Holding/Business Unit Digital',
      managerId: respId,
      isCodir: false,
      updatedAt: new Date(),
    },
  });
  console.log('✓ Salarié configuré : Ebenezer Samuel KOUAME (rapporte à Jean-Marc KOFFI)');

  // 4b. ASSISTANTE RH : Fatou DIOP (Collaboratrice directe de la DRH Aissatou BAH)
  const asstRhId = 'asst-rh-1144-4a48-bed2-72b525325c81';
  await prisma.utilisateurs_cache.upsert({
    where: { id_microsoft: asstRhId },
    update: {
      nom: 'Fatou DIOP',
      email: 'assistante.rh@agilly.net',
      poste: 'Assistante Ressources Humaines',
      role: 'SALARIE',
      departement: 'Direction des Ressources Humaines',
      managerId: drhId,
      isCodir: false,
      updatedAt: new Date(),
    },
    create: {
      id_microsoft: asstRhId,
      nom: 'Fatou DIOP',
      email: 'assistante.rh@agilly.net',
      poste: 'Assistante Ressources Humaines',
      role: 'SALARIE',
      departement: 'Direction des Ressources Humaines',
      managerId: drhId,
      isCodir: false,
      updatedAt: new Date(),
    },
  });
  console.log('✓ Assistante RH configurée : Fatou DIOP (rapporte à la DRH Aissatou BAH)');

  // 5. CYCLE ACTIF
  let cycle = await prisma.cycles_evaluation.findFirst({
    where: { statut: { in: ['ACTIF', 'EN_COURS'] } },
    orderBy: { annee: 'desc' },
  });
  if (!cycle) {
    cycle = await prisma.cycles_evaluation.create({
      data: {
        id: 'cyc-test-2026',
        libelle: 'Campagne Annuelle 2026',
        annee: 2026,
        typeCycle: 'ANNUEL',
        dateOuverture: new Date('2026-06-01T00:00:00Z'),
        dateFermeture: new Date('2027-02-28T23:59:59Z'),
        statut: 'ACTIF',
        creeParUserId: drhId,
        updatedAt: new Date(),
      },
    });
  }
  console.log('✓ Cycle actif :', cycle.libelle);

  // 6. FICHE D\'EBENEZER : STATUT = VALIDATION_N2 (Noté par le Responsable, en attente de visa Direction)
  const ficheEbenezerId = `fic-${salarieId.substring(0, 8)}-2026`;
  const ficheEbenezer = await prisma.fiches_evaluation.upsert({
    where: { id: ficheEbenezerId },
    update: {
      statut: 'VALIDATION_N2',
      noteGlobale: 15.40,
      observation: 'Très bon bilan annuel d\'Ebenezer. Objectifs dépassés avec rigueur technique. Recommandé pour validation de la Direction.',
      cycleId: cycle.id,
      salarieId: salarieId,
      updatedAt: new Date(),
    },
    create: {
      id: ficheEbenezerId,
      statut: 'VALIDATION_N2',
      noteGlobale: 15.40,
      observation: 'Très bon bilan annuel d\'Ebenezer. Objectifs dépassés avec rigueur technique. Recommandé pour validation de la Direction.',
      cycleId: cycle.id,
      salarieId: salarieId,
      updatedAt: new Date(),
    },
  });

  // Objectifs d\'Ebenezer
  await prisma.objectifs.deleteMany({ where: { ficheId: ficheEbenezer.id } });
  const obj1 = await prisma.objectifs.create({
    data: {
      id: 'obj-ebenezer-1',
      ficheId: ficheEbenezer.id,
      intitule: 'Conception et refonte de l\'architecture Portail RH & SSO',
      description: 'Livrer la version stable du module d\'évaluation avec synchronisation Microsoft Entra ID',
      ponderation: 40,
      updatedAt: new Date(),
    },
  });
  const obj2 = await prisma.objectifs.create({
    data: {
      id: 'obj-ebenezer-2',
      ficheId: ficheEbenezer.id,
      intitule: 'Optimisation de la performance et réduction de la latence API',
      description: 'Garantir un temps de réponse moyen inférieur à 200ms sur l\'ensemble des endpoints de scoring',
      ponderation: 30,
      updatedAt: new Date(),
    },
  });
  const obj3 = await prisma.objectifs.create({
    data: {
      id: 'obj-ebenezer-3',
      ficheId: ficheEbenezer.id,
      intitule: 'Documentation technique et accompagnement de l\'équipe projet',
      description: 'Rédiger le manuel d\'architecture et guider les tests utilisateurs',
      ponderation: 30,
      updatedAt: new Date(),
    },
  });

  // Notes Salarié (Auto-évaluation) et Notes Responsable (Jean-Marc KOFFI)
  await prisma.evaluations.deleteMany({
    where: { objectifId: { in: [obj1.id, obj2.id, obj3.id] } },
  });

  // 1. Auto-évaluation Ebenezer
  await prisma.evaluations.createMany({
    data: [
      { examinateurId: salarieId, objectifId: obj1.id, note: 16.00, observation: 'SSO et intégration Entra ID livrés conformément aux attentes.', updatedAt: new Date() },
      { examinateurId: salarieId, objectifId: obj2.id, note: 15.00, observation: 'Latence divisée par 2 grâce aux optimisations SQL Prisma.', updatedAt: new Date() },
      { examinateurId: salarieId, objectifId: obj3.id, note: 14.00, observation: 'Documentation technique rédigée sur le wiki interne.', updatedAt: new Date() },
    ],
  });

  // 2. Évaluation Responsable (Jean-Marc KOFFI)
  await prisma.evaluations.createMany({
    data: [
      { examinateurId: respId, objectifId: obj1.id, note: 16.00, observation: 'Excellente maîtrise technique. Respect scrupuleux des normes de sécurité.', updatedAt: new Date() },
      { examinateurId: respId, objectifId: obj2.id, note: 15.00, observation: 'Temps de réponse stabilisé sous 150ms. Objectif atteint.', updatedAt: new Date() },
      { examinateurId: respId, objectifId: obj3.id, note: 15.00, observation: 'Très bonne clarté documentaire et disponibilité pour l\'équipe.', updatedAt: new Date() },
    ],
  });

  // Formations recommandées par le Responsable pour Ebenezer
  await prisma.formations.deleteMany({ where: { ficheId: ficheEbenezer.id } });
  await prisma.formations.create({
    data: {
      id: 'form-ebenezer-1',
      ficheId: ficheEbenezer.id,
      intitule: 'Architecture Cloud AWS & Microservices',
      delai: 'Court terme (1 à 3 mois)',
      priorite: 'HAUTE',
      objectifVise: 'Permettre à Ebenezer de concevoir les futurs modules distribués à haute disponibilité',
      statut: 'DEMANDE',
      updatedAt: new Date(),
    },
  });
  console.log('✓ Dossier d\'Ebenezer prêt au statut VALIDATION_N2 (Note Auto: 15/20, Note Responsable: 15.4/20, 1 Formation demandée)');

  // 7. FICHE DU RESPONSABLE (Jean-Marc KOFFI) : Évalué par Didier KABLAN
  const ficheRespId = `fic-${respId.substring(0, 8)}-2026`;
  const ficheResp = await prisma.fiches_evaluation.upsert({
    where: { id: ficheRespId },
    update: {
      statut: 'EVALUATION_N1',
      noteGlobale: 14.50,
      observation: 'Jean-Marc pilote efficacement ses projets web et encadre bien son équipe.',
      cycleId: cycle.id,
      salarieId: respId,
      updatedAt: new Date(),
    },
    create: {
      id: ficheRespId,
      statut: 'EVALUATION_N1',
      noteGlobale: 14.50,
      observation: 'Jean-Marc pilote efficacement ses projets web et encadre bien son équipe.',
      cycleId: cycle.id,
      salarieId: respId,
      updatedAt: new Date(),
    },
  });

  await prisma.objectifs.deleteMany({ where: { ficheId: ficheResp.id } });
  const objResp1 = await prisma.objectifs.create({
    data: {
      id: 'obj-resp-1',
      ficheId: ficheResp.id,
      intitule: 'Management et montée en compétences de l\'équipe Digital',
      description: 'Assurer 100% de réalisation des entretiens périodiques et le respect des jalons projets',
      ponderation: 50,
      updatedAt: new Date(),
    },
  });
  const objResp2 = await prisma.objectifs.create({
    data: {
      id: 'obj-resp-2',
      ficheId: ficheResp.id,
      intitule: 'Pilotage budgétaire et livraison des chantiers stratégiques',
      description: 'Respecter le budget alloué et livrer les livrables dans les délais convenus avec la Direction',
      ponderation: 50,
      updatedAt: new Date(),
    },
  });

  // Auto-évaluation Jean-Marc
  await prisma.evaluations.deleteMany({
    where: { objectifId: { in: [objResp1.id, objResp2.id] } },
  });
  await prisma.evaluations.createMany({
    data: [
      { examinateurId: respId, objectifId: objResp1.id, note: 15.00, observation: 'Entretiens menés et suivi régulier de l\'équipe.', updatedAt: new Date() },
      { examinateurId: respId, objectifId: objResp2.id, note: 14.00, observation: 'Budget respecté, deux releases livrées dans les temps.', updatedAt: new Date() },
    ],
  });
  console.log('✓ Dossier de Jean-Marc KOFFI prêt au statut EVALUATION_N1 (à évaluer par Didier KABLAN)');

  // 8. FICHE DU DIRECTEUR (Didier KABLAN) : Évalué par la DRH Aissatou BAH
  const ficheDirId = `fic-${dirId.substring(0, 8)}-2026`;
  const ficheDir = await prisma.fiches_evaluation.upsert({
    where: { id: ficheDirId },
    update: {
      statut: 'FIXATION_OBJECTIFS',
      cycleId: cycle.id,
      salarieId: dirId,
      updatedAt: new Date(),
    },
    create: {
      id: ficheDirId,
      statut: 'FIXATION_OBJECTIFS',
      cycleId: cycle.id,
      salarieId: dirId,
      updatedAt: new Date(),
    },
  });

  await prisma.objectifs.deleteMany({ where: { ficheId: ficheDir.id } });
  await prisma.objectifs.createMany({
    data: [
      {
        id: 'obj-dir-1',
        ficheId: ficheDir.id,
        intitule: 'Transformation digitale et modernisation du système d\'information',
        description: 'Superviser l\'alignement des projets digitaux avec la stratégie du groupe',
        ponderation: 60,
        updatedAt: new Date(),
      },
      {
        id: 'obj-dir-2',
        ficheId: ficheDir.id,
        intitule: 'Excellence opérationnelle et conformité des processus',
        description: 'Garantir la sécurité des données et le taux de disponibilité des plateformes à 99.9%',
        ponderation: 40,
        updatedAt: new Date(),
      },
    ],
  });
  console.log('✓ Dossier de Didier KABLAN prêt (évalué par la DRH Aissatou BAH)');

  // 9. FICHE DE L'ASSISTANTE RH (Fatou DIOP) : Évaluée par la DRH Aissatou BAH
  const ficheAsstId = `fic-${asstRhId.substring(0, 8)}-2026`;
  const ficheAsst = await prisma.fiches_evaluation.upsert({
    where: { id: ficheAsstId },
    update: {
      statut: 'EVALUATION_N1',
      noteGlobale: 15.50,
      observation: 'Fatou gère remarquablement l\'administration du personnel et le suivi des dossiers RH.',
      cycleId: cycle.id,
      salarieId: asstRhId,
      updatedAt: new Date(),
    },
    create: {
      id: ficheAsstId,
      statut: 'EVALUATION_N1',
      noteGlobale: 15.50,
      observation: 'Fatou gère remarquablement l\'administration du personnel et le suivi des dossiers RH.',
      cycleId: cycle.id,
      salarieId: asstRhId,
      updatedAt: new Date(),
    },
  });

  await prisma.objectifs.deleteMany({ where: { ficheId: ficheAsst.id } });
  const objAsst1 = await prisma.objectifs.create({
    data: {
      id: 'obj-asst-1',
      ficheId: ficheAsst.id,
      intitule: 'Gestion administrative du personnel et suivi des dossiers de paie',
      description: 'Tenue à jour des dossiers salariés et transmission des éléments variables de paie',
      ponderation: 50,
      updatedAt: new Date(),
    },
  });
  const objAsst2 = await prisma.objectifs.create({
    data: {
      id: 'obj-asst-2',
      ficheId: ficheAsst.id,
      intitule: 'Coordination logistique des formations et accueil des nouveaux arrivants',
      description: 'Organiser le parcours d\'onboarding et planifier les sessions de formation interne',
      ponderation: 50,
      updatedAt: new Date(),
    },
  });

  // Auto-évaluation Fatou DIOP
  await prisma.evaluations.deleteMany({
    where: { objectifId: { in: [objAsst1.id, objAsst2.id] } },
  });
  await prisma.evaluations.createMany({
    data: [
      { examinateurId: asstRhId, objectifId: objAsst1.id, note: 15.00, observation: 'Dossiers tenus avec rigueur, zéro retard paie.', updatedAt: new Date() },
      { examinateurId: asstRhId, objectifId: objAsst2.id, note: 16.00, observation: 'Onboarding réussi pour 100% des nouvelles recrues.', updatedAt: new Date() },
    ],
  });
  console.log('✓ Dossier de Fatou DIOP prêt au statut EVALUATION_N1 (à évaluer par la DRH Aissatou BAH dans Mon Équipe)');

  console.log('\n=== Configuration terminée avec succès ! ===');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
