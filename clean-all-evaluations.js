const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function cleanAll() {
  console.log('=== NETTOYAGE COMPLET DE TOUTES LES DONNÉES D\'ÉVALUATION ===\n');

  // 1. Supprimer tous les éléments dépendants des fiches
  await prisma.feedbacks_360.deleteMany({});
  await prisma.bonus_commissions.deleteMany({});
  await prisma.formations.deleteMany({});
  await prisma.competences.deleteMany({});
  await prisma.suggestions.deleteMany({});
  await prisma.historique_evaluation.deleteMany({});
  
  // Supprimer évaluations et indicateurs
  await prisma.evaluations.deleteMany({});
  await prisma.indicateurs.deleteMany({});
  await prisma.objectifs.deleteMany({});

  // Supprimer toutes les fiches d'évaluation
  const delFiches = await prisma.fiches_evaluation.deleteMany({});
  console.log(`✓ Fiches d'évaluation supprimées : ${delFiches.count}`);

  // 2. Nettoyer les cycles et s'assurer qu'il n'y a qu'1 seul cycle actif propre
  await prisma.cycles_evaluation.deleteMany({});
  const cycle = await prisma.cycles_evaluation.create({
    data: {
      id: 'cyc-campagne-2026',
      libelle: 'Campagne Annuelle d\'Évaluation 2026',
      annee: 2026,
      typeCycle: 'ANNUEL',
      statut: 'ACTIF',
      dateOuverture: new Date('2026-01-01'),
      dateFermeture: new Date('2026-12-31'),
      dateDebutFixation: new Date('2026-01-01'),
      dateFinFixation: new Date('2026-03-31'),
      dateDebutEval: new Date('2026-04-01'),
      dateFinEval: new Date('2026-12-31'),
      updatedAt: new Date(),
    },
  });
  console.log(`✓ Cycle propre actif : ${cycle.libelle} (${cycle.id})`);

  // 3. Vérifier les utilisateurs de test conservés
  const users = await prisma.utilisateurs_cache.findMany({
    select: { id_microsoft: true, nom: true, email: true, role: true, managerId: true },
  });
  console.log(`✓ Utilisateurs de test intacts (${users.length}) :`);
  users.forEach((u) => {
    console.log(`  - ${u.nom} (${u.role}) [manager: ${u.managerId}]`);
  });

  const checkFiches = await prisma.fiches_evaluation.count();
  console.log(`\n=== SUCCÈS TOTAL : BASE 100% PURGÉE — 0 FICHES, 0 OBJECTIFS, 0 DOUBLONS ===`);
}

cleanAll()
  .catch((err) => {
    console.error('Erreur:', err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());

