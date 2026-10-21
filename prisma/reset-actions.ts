// ============================================================
// prisma/reset-actions.ts
// Réinitialise toutes les actions et évaluations tout en conservant les utilisateurs
// Permet de dérouler le parcours manuellement écran par écran depuis le début
// ============================================================

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('\n============================================================');
  console.log('🔄  RÉINITIALISATION DU PARCOURS ÉVALUATION');
  console.log('    Conservation intégrale des utilisateurs et hiérarchie');
  console.log('    Remise à zéro des fiches au statut : FIXATION_OBJECTIFS');
  console.log('============================================================\n');

  // 1. Vidage de toutes les tables transactionnelles
  console.log('1️⃣  Suppression des données transactionnelles (0 résidu)...');
  await prisma.notifications.deleteMany({});
  console.log('   ✓ Notifications supprimées');

  await prisma.evaluations.deleteMany({});
  console.log('   ✓ Notes et appréciations supprimées');

  await prisma.indicateurs.deleteMany({});
  console.log('   ✓ Indicateurs supprimés');

  await prisma.objectifs.deleteMany({});
  console.log('   ✓ Objectifs supprimés');

  await prisma.formations.deleteMany({});
  console.log('   ✓ Formations supprimées');

  await prisma.bonus_commissions.deleteMany({});
  console.log('   ✓ Bonus & commissions supprimés');

  await prisma.competences.deleteMany({});
  console.log('   ✓ Compétences supprimées');

  await prisma.feedbacks_360.deleteMany({});
  console.log('   ✓ Feedbacks 360 supprimés');

  await prisma.suggestions.deleteMany({});
  console.log('   ✓ Suggestions supprimées');

  await prisma.historique_evaluation.deleteMany({});
  console.log('   ✓ Historiques d\'audit supprimés');

  await prisma.fiches_evaluation.deleteMany({});
  console.log('   ✓ Fiches d\'évaluation supprimées');

  // 2. Cycle actif 2026
  console.log('\n2️⃣  Vérification de la Campagne Annuelle 2026...');
  const cycleId = 'cyc-campagne-2026';
  const cycle = await prisma.cycles_evaluation.upsert({
    where: { id: cycleId },
    update: {
      libelle: "Campagne Annuelle d'Évaluation 2026",
      annee: 2026,
      typeCycle: 'ANNUEL',
      statut: 'ACTIF',
      dateOuverture: new Date('2026-01-01T00:00:00.000Z'),
      dateFermeture: new Date('2026-12-31T23:59:59.000Z'),
      dateDebutFixation: new Date('2026-01-01T00:00:00.000Z'),
      dateFinFixation: new Date('2026-03-31T23:59:59.000Z'),
      dateDebutEval: new Date('2026-10-01T00:00:00.000Z'),
      dateFinEval: new Date('2026-12-31T23:59:59.000Z'),
      updatedAt: new Date(),
    },
    create: {
      id: cycleId,
      libelle: "Campagne Annuelle d'Évaluation 2026",
      annee: 2026,
      typeCycle: 'ANNUEL',
      statut: 'ACTIF',
      dateOuverture: new Date('2026-01-01T00:00:00.000Z'),
      dateFermeture: new Date('2026-12-31T23:59:59.000Z'),
      dateDebutFixation: new Date('2026-01-01T00:00:00.000Z'),
      dateFinFixation: new Date('2026-03-31T23:59:59.000Z'),
      dateDebutEval: new Date('2026-10-01T00:00:00.000Z'),
      dateFinEval: new Date('2026-12-31T23:59:59.000Z'),
      updatedAt: new Date(),
    },
  });
  console.log(`   ✓ Campagne active : ${cycle.libelle} (Du 01/01/2026 au 31/12/2026)`);

  // 3. Récupération des utilisateurs conservés
  console.log('\n3️⃣  Vérification des utilisateurs dans la hiérarchie...');
  const users = await prisma.utilisateurs_cache.findMany({
    orderBy: { nom: 'asc' },
  });
  console.log(`   ✓ ${users.length} utilisateurs conservés dans la base.`);

  // 4. Création des fiches vierges au statut FIXATION_OBJECTIFS
  console.log('\n4️⃣  Génération des fiches vierges (Statut : FIXATION_OBJECTIFS)...');
  const evaluatees = users.filter((u) => u.managerId !== null);

  for (const user of evaluatees) {
    const ficheId = 'fic-' + user.id_microsoft.substring(0, 8) + '-2026';
    const fiche = await prisma.fiches_evaluation.create({
      data: {
        id: ficheId,
        statut: 'FIXATION_OBJECTIFS',
        cycleId: cycle.id,
        salarieId: user.id_microsoft,
        typeEvaluation: 'STANDARD',
        updatedAt: new Date(),
      },
    });

    await prisma.historique_evaluation.create({
      data: {
        id: 'hist-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6),
        statutFiche: 'FIXATION_OBJECTIFS',
        action: 'OUVERTURE_CYCLE',
        commentaire: 'Ouverture de la campagne 2026. Phase de fixation des objectifs.',
        effectueParId: user.managerId || user.id_microsoft,
        ficheId: fiche.id,
        dateAction: new Date(),
      },
    });

    console.log(`   ✓ Fiche vierge créée : ${user.nom} (${user.poste}) -> Statut: FIXATION_OBJECTIFS`);
  }

  console.log('\n============================================================');
  console.log('✨  PRÊT POUR DÉROULER LE PARCOURS ÉCRAN PAR ÉCRAN !');
  console.log('    1. Connectez-vous en tant que Manager N+1 (Ange TIANGBO)');
  console.log('    2. Cliquez sur "Fixer les objectifs" pour Sylvain ou Ruth');
  console.log('    3. Déroulez la validation N+2, l\'évaluation, le visa et l\'arbitrage !');
  console.log('============================================================\n');
}

main()
  .catch((e) => {
    console.error('❌ Erreur :', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
