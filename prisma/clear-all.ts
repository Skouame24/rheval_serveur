// ============================================================
// prisma/clear-all.ts
// Vidage intégral de TOUTES les tables de la base de données
// Remise à zéro totale (0 donnée) pour tests réels en direct
// ============================================================

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function clearAll() {
  console.log('\n============================================================');
  console.log('🗑️   VIDAGE INTÉGRAL DE LA BASE DE DONNÉES (0 DONNÉE)');
  console.log('============================================================\n');

  console.log('Suppression de toutes les données en cours...');

  await prisma.notifications.deleteMany({});
  console.log('   ✓ notifications : 0');

  await prisma.evaluations.deleteMany({});
  console.log('   ✓ evaluations : 0');

  await prisma.indicateurs.deleteMany({});
  console.log('   ✓ indicateurs : 0');

  await prisma.objectifs.deleteMany({});
  console.log('   ✓ objectifs : 0');

  await prisma.formations.deleteMany({});
  console.log('   ✓ formations : 0');

  await prisma.bonus_commissions.deleteMany({});
  console.log('   ✓ bonus_commissions : 0');

  await prisma.competences.deleteMany({});
  console.log('   ✓ competences : 0');

  await prisma.feedbacks_360.deleteMany({});
  console.log('   ✓ feedbacks_360 : 0');

  await prisma.suggestions.deleteMany({});
  console.log('   ✓ suggestions : 0');

  await prisma.historique_evaluation.deleteMany({});
  console.log('   ✓ historique_evaluation : 0');

  await prisma.fiches_evaluation.deleteMany({});
  console.log('   ✓ fiches_evaluation : 0');

  await prisma.cycles_evaluation.deleteMany({});
  console.log('   ✓ cycles_evaluation : 0');

  await prisma.utilisateurs_cache.deleteMany({});
  console.log('   ✓ utilisateurs_cache : 0');

  console.log('\n============================================================');
  console.log('✨  BASE DE DONNÉES ENTIÈREMENT VIDE !');
  console.log('    Toutes les tables sont conservées mais contiennent 0 donnée.');
  console.log('    Vous pouvez démarrer vos tests réels à blanc.');
  console.log('============================================================\n');
}

clearAll()
  .catch((err) => {
    console.error('❌ Erreur lors du vidage :', err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

