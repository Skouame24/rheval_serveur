const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('--- Initialisation de la chaîne hiérarchique de test ---');

  // 1. DRH
  const drhId = 'drh-agilly-9933-4a48-bed2-72b525325c81';
  const drh = await prisma.utilisateurs_cache.upsert({
    where: { id_microsoft: drhId },
    update: {
      nom: 'Aissatou BAH',
      email: 'drh@agilly.net',
      poste: 'Directrice des Ressources Humaines',
      role: 'DRH',
      departement: 'Direction des Ressources Humaines',
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
      isCodir: true,
      updatedAt: new Date(),
    },
  });
  console.log('✓ DRH créée :', drh.nom);

  // 2. Directeur (N+2 d\'Ebenezer, N+1 du Responsable)
  const dirId = 'dir-digital-8822-4a48-bed2-72b525325c81';
  const directeur = await prisma.utilisateurs_cache.upsert({
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
  console.log('✓ Directeur (N+2) créé :', directeur.nom);

  // 3. Responsable (N+1 d\'Ebenezer, subordonné du Directeur)
  const respId = 'abe87afa-a80b-4a48-bed2-72b525325c81';
  const responsable = await prisma.utilisateurs_cache.upsert({
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
  console.log('✓ Responsable (N+1) créé :', responsable.nom);

  // 4. Salarié (Ebenezer Samuel KOUAME)
  const salarieId = '0a5c4c64-abdd-4f4f-a3af-00057ebdddfb';
  const salarie = await prisma.utilisateurs_cache.upsert({
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
  console.log('✓ Salarié mis à jour :', salarie.nom);

  // 5. Récupération ou création du cycle actif
  let cycle = await prisma.cycles_evaluation.findFirst({
    where: { statut: { in: ['ACTIF', 'EN_COURS'] } },
    orderBy: { annee: 'desc' },
  });

  if (!cycle) {
    cycle = await prisma.cycles_evaluation.create({
      data: {
        id: 'cyc-test-2026',
        libelle: 'Campagne Annuelle 2026 (Test)',
        annee: 2026,
        typeCycle: 'ANNUEL',
        dateOuverture: new Date('2026-06-01T00:00:00Z'),
        dateFermeture: new Date('2027-02-28T23:59:59Z'),
        statut: 'ACTIF',
        creeParUserId: drhId,
        updatedAt: new Date(),
      },
    });
    console.log('✓ Cycle actif créé :', cycle.libelle);
  }

  // 6. Fiche d\'évaluation du Salarié (Ebenezer)
  const ficheSalarieId = `fic-${salarieId.substring(0, 8)}-2026`;
  const ficheSalarie = await prisma.fiches_evaluation.upsert({
    where: { id: ficheSalarieId },
    update: {
      statut: 'FIXATION_OBJECTIFS',
      cycleId: cycle.id,
      salarieId: salarieId,
      updatedAt: new Date(),
    },
    create: {
      id: ficheSalarieId,
      statut: 'FIXATION_OBJECTIFS',
      cycleId: cycle.id,
      salarieId: salarieId,
      updatedAt: new Date(),
    },
  });

  // Objectifs pour Ebenezer
  await prisma.objectifs.deleteMany({ where: { ficheId: ficheSalarie.id } });
  await prisma.objectifs.createMany({
    data: [
      {
        id: 'obj-ebenezer-1',
        ficheId: ficheSalarie.id,
        intitule: 'Conception et refonte de l\'architecture Portail RH & SSO',
        description: 'Livrer la version stable du module d\'évaluation avec synchronisation Microsoft Entra ID',
        ponderation: 40,
        updatedAt: new Date(),
      },
      {
        id: 'obj-ebenezer-2',
        ficheId: ficheSalarie.id,
        intitule: 'Optimisation de la performance et réduction de la latence API',
        description: 'Garantir un temps de réponse moyen inférieur à 200ms sur l\'ensemble des endpoints de scoring',
        ponderation: 30,
        updatedAt: new Date(),
      },
      {
        id: 'obj-ebenezer-3',
        ficheId: ficheSalarie.id,
        intitule: 'Documentation technique et accompagnement de l\'équipe projet',
        description: 'Rédiger le manuel d\'architecture et guider les tests utilisateurs',
        ponderation: 30,
        updatedAt: new Date(),
      },
    ],
  });
  console.log('✓ Fiche d\'évaluation & objectifs créés pour Ebenezer');

  // 7. Fiche d\'évaluation du Responsable (Jean-Marc KOFFI)
  const ficheRespId = `fic-${respId.substring(0, 8)}-2026`;
  const ficheResp = await prisma.fiches_evaluation.upsert({
    where: { id: ficheRespId },
    update: {
      statut: 'FIXATION_OBJECTIFS',
      cycleId: cycle.id,
      salarieId: respId,
      updatedAt: new Date(),
    },
    create: {
      id: ficheRespId,
      statut: 'FIXATION_OBJECTIFS',
      cycleId: cycle.id,
      salarieId: respId,
      updatedAt: new Date(),
    },
  });

  // Objectifs pour le Responsable
  await prisma.objectifs.deleteMany({ where: { ficheId: ficheResp.id } });
  await prisma.objectifs.createMany({
    data: [
      {
        id: 'obj-resp-1',
        ficheId: ficheResp.id,
        intitule: 'Management et montée en compétences de l\'équipe Digital',
        description: 'Assurer 100% de réalisation des entretiens périodiques et le respect des jalons projets',
        ponderation: 50,
        updatedAt: new Date(),
      },
      {
        id: 'obj-resp-2',
        ficheId: ficheResp.id,
        intitule: 'Pilotage budgétaire et livraison des chantiers stratégiques',
        description: 'Respecter le budget alloué et livrer les livrables dans les délais convenus avec la Direction',
        ponderation: 50,
        updatedAt: new Date(),
      },
    ],
  });
  console.log('✓ Fiche d\'évaluation & objectifs créés pour le Responsable (évalué par le Directeur)');

  console.log('\n--- Configuration terminée avec succès ! ---');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

