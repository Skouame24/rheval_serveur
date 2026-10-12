const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('=== Réinitialisation complète des données (Départ simulation à blanc) ===\n');

  // 1. Suppression de toutes les données d'évaluation (ordres respectant les contraintes FK)
  console.log('1. Suppression des évaluations, objectifs, formations et historiques...');
  await prisma.evaluations.deleteMany({});
  await prisma.indicateurs.deleteMany({});
  await prisma.objectifs.deleteMany({});
  await prisma.formations.deleteMany({});
  await prisma.competences.deleteMany({});
  await prisma.feedbacks_360.deleteMany({});
  await prisma.suggestions.deleteMany({});
  await prisma.bonus_commissions.deleteMany({});
  await prisma.historique_evaluation.deleteMany({});
  await prisma.fiches_evaluation.deleteMany({});
  await prisma.cycles_evaluation.deleteMany({});
  console.log('✓ Toutes les fiches, objectifs, notes et historiques ont été purgés.');

  // 2. Nettoyage des utilisateurs et conservation stricte des 5 comptes de test
  const testIds = [
    'drh-agilly-9933-4a48-bed2-72b525325c81', // Aissatou BAH (DRH)
    'dir-digital-8822-4a48-bed2-72b525325c81', // Didier KABLAN (Directeur)
    'abe87afa-a80b-4a48-bed2-72b525325c81',   // Jean-Marc KOFFI (Responsable)
    '0a5c4c64-abdd-4f4f-a3af-00057ebdddfb',   // Ebenezer Samuel KOUAME (Salarié)
    'asst-rh-1144-4a48-bed2-72b525325c81',   // Fatou DIOP (Assistante RH)
  ];

  await prisma.utilisateurs_cache.deleteMany({
    where: {
      id_microsoft: { notIn: testIds },
    },
  });

  // Mise à jour propre des 5 comptes de test
  const drhId = testIds[0];
  const dirId = testIds[1];
  const respId = testIds[2];
  const salarieId = testIds[3];
  const asstRhId = testIds[4];

  // DRH : Aissatou BAH
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

  // DIRECTEUR : Didier KABLAN
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

  // RESPONSABLE : Jean-Marc KOFFI
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

  // SALARIÉ : Ebenezer Samuel KOUAME
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

  // ASSISTANTE RH : Fatou DIOP
  await prisma.utilisateurs_cache.upsert({
    where: { id_microsoft: asstRhId },
    update: {
      nom: 'Fatou DIOP',
      email: 'assistante.rh@agilly.net',
      poste: 'Assistante Ressources Humaines',
      role: 'RH',
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
      role: 'RH',
      departement: 'Direction des Ressources Humaines',
      managerId: drhId,
      isCodir: false,
      updatedAt: new Date(),
    },
  });

  console.log('✓ 5 comptes de test configurés et liés hiérarchiquement.');

  // 3. Création du Cycle Annuel 2026 Actif (sans fiches générées)
  const cycle = await prisma.cycles_evaluation.create({
    data: {
      id: 'cyc-campagne-2026',
      libelle: 'Campagne Annuelle 2026',
      annee: 2026,
      typeCycle: 'ANNUEL',
      dateOuverture: new Date('2026-01-01T00:00:00Z'),
      dateFermeture: new Date('2026-12-31T23:59:59Z'),
      statut: 'ACTIF',
      creeParUserId: drhId,
      updatedAt: new Date(),
    },
  });
  console.log('✓ Campagne Annuelle 2026 ouverte et active (zéro fiche existante).');

  console.log('\n=== Base prête pour votre simulation étape par étape ! ===');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

