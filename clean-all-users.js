const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function cleanAllUsers() {
  console.log('=== SUPPRESSION TOTALE DE TOUTES LES DONNÉES ET UTILISATEURS DE TEST ===\n');

  // 1. Supprimer toutes les données liées aux fiches
  await prisma.feedbacks_360.deleteMany({});
  await prisma.bonus_commissions.deleteMany({});
  await prisma.formations.deleteMany({});
  await prisma.competences.deleteMany({});
  await prisma.suggestions.deleteMany({});
  await prisma.historique_evaluation.deleteMany({});
  await prisma.evaluations.deleteMany({});
  await prisma.indicateurs.deleteMany({});
  await prisma.objectifs.deleteMany({});
  await prisma.fiches_evaluation.deleteMany({});

  // 2. Réinitialiser le cycle (détacher de tout créateur)
  await prisma.cycles_evaluation.updateMany({
    data: { creeParUserId: null },
  });

  // 3. Supprimer tous les utilisateurs de la table utilisateurs_cache
  const delUsers = await prisma.utilisateurs_cache.deleteMany({});
  console.log(`✓ Utilisateurs de test supprimés de la base : ${delUsers.count}`);

  const userCount = await prisma.utilisateurs_cache.count();
  const ficheCount = await prisma.fiches_evaluation.count();
  console.log(`\n=== BASE TOTALEMENT VIERGE : ${userCount} UTILISATEURS, ${ficheCount} FICHES ===`);
}

cleanAllUsers()
  .catch((err) => {
    console.error('Erreur:', err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());

