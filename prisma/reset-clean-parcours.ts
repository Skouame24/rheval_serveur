import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('============================================================');
  console.log('🧹 VIDAGE DE LA BASE ET CONFIGURATION DU PARCOURS COMPLET');
  console.log('============================================================');

  // 1. Vider toutes les données transactionnelles d'évaluation et notifications
  console.log('1. Nettoyage de toutes les actions, fiches, objectifs et notifications...');
  await prisma.notifications.deleteMany({});
  await prisma.evaluations.deleteMany({});
  await prisma.indicateurs.deleteMany({});
  await prisma.objectifs.deleteMany({});
  await prisma.formations.deleteMany({});
  await prisma.bonus_commissions.deleteMany({});
  await prisma.feedbacks_360.deleteMany({});
  await prisma.suggestions.deleteMany({});
  await prisma.competences.deleteMany({});
  await prisma.historique_evaluation.deleteMany({});
  await prisma.fiches_evaluation.deleteMany({});
  console.log('   ✓ Toutes les fiches, objectifs, notes et historiques ont été vidés.');

  // Identifiants des acteurs clés
  const samuelId = '0a5c4c64-abdd-4f4f-a3af-00057ebdddfb';
  const tiangboId = '1f77edad-716c-4552-b96f-58ec7d1ee1d7';
  const akpaId = 'aaf364d4-b002-4ae1-943d-d7ab5ec90a9a';
  const yaoId = 'c970e84d-5fd5-4cb9-8c4e-7cccc14ad269';
  const sylvainId = '1e088664-6faf-484a-98ce-92de8fbdfb39';
  const ruthId = '4d8b00e4-b383-4beb-b819-c184b5eddce4';
  const cycleId = 'cyc-campagne-2026';

  console.log('\n2. Configuration de la hiérarchie et des rôles...');

  // 2. David Martial AKPA -> Direction N+2
  await prisma.utilisateurs_cache.upsert({
    where: { id_microsoft: akpaId },
    update: {
      nom: 'David Martial AKPA',
      email: 'david.akpa@agilly.net',
      role: 'N2',
      poste: 'Directeur Exécutif',
      departement: 'Direction Générale',
      managerId: null,
      updatedAt: new Date(),
    },
    create: {
      id_microsoft: akpaId,
      nom: 'David Martial AKPA',
      email: 'david.akpa@agilly.net',
      role: 'N2',
      poste: 'Directeur Exécutif',
      departement: 'Direction Générale',
      managerId: null,
      updatedAt: new Date(),
    },
  });
  console.log('   ✓ N+2 : David Martial AKPA (Directeur Exécutif)');

  // 3. Germaine YAO -> DRH
  await prisma.utilisateurs_cache.upsert({
    where: { id_microsoft: yaoId },
    update: {
      nom: 'Germaine YAO',
      email: 'germaine.yao@agilly.net',
      role: 'DRH',
      poste: 'Directrice des Ressources Humaines',
      departement: 'Direction des Ressources Humaines',
      managerId: akpaId,
      updatedAt: new Date(),
    },
    create: {
      id_microsoft: yaoId,
      nom: 'Germaine YAO',
      email: 'germaine.yao@agilly.net',
      role: 'DRH',
      poste: 'Directrice des Ressources Humaines',
      departement: 'Direction des Ressources Humaines',
      managerId: akpaId,
      updatedAt: new Date(),
    },
  });
  console.log('   ✓ DRH : Germaine YAO (N+2 : David Martial AKPA)');

  // 4. Ange-Dieudonne TIANGBO -> Manager N+1
  await prisma.utilisateurs_cache.upsert({
    where: { id_microsoft: tiangboId },
    update: {
      nom: 'Ange-Dieudonne TIANGBO',
      email: 'ange.tiangbo@agilly.net',
      role: 'N1',
      poste: 'Directeur Juridique & Conformité / DPO',
      departement: 'Direction Juridique/COVERPOINT',
      managerId: akpaId,
      updatedAt: new Date(),
    },
    create: {
      id_microsoft: tiangboId,
      nom: 'Ange-Dieudonne TIANGBO',
      email: 'ange.tiangbo@agilly.net',
      role: 'N1',
      poste: 'Directeur Juridique & Conformité / DPO',
      departement: 'Direction Juridique/COVERPOINT',
      managerId: akpaId,
      updatedAt: new Date(),
    },
  });
  console.log('   ✓ N+1 : Ange-Dieudonne TIANGBO (N+2 : David Martial AKPA)');

  // 5. Ebenezer Samuel KOUAME -> Salarié évalué rattaché à Ange TIANGBO
  await prisma.utilisateurs_cache.upsert({
    where: { id_microsoft: samuelId },
    update: {
      nom: 'Ebenezer Samuel KOUAME',
      email: 'ebenezer.kouame@agilly.net',
      role: 'SALARIE',
      poste: 'Développeur Fullstack',
      departement: 'Technique & Digital',
      managerId: tiangboId,
      updatedAt: new Date(),
    },
    create: {
      id_microsoft: samuelId,
      nom: 'Ebenezer Samuel KOUAME',
      email: 'ebenezer.kouame@agilly.net',
      role: 'SALARIE',
      poste: 'Développeur Fullstack',
      departement: 'Technique & Digital',
      managerId: tiangboId,
      updatedAt: new Date(),
    },
  });
  console.log('   ✓ Salarié évalué : Ebenezer Samuel KOUAME -> Manager N+1: Ange TIANGBO -> N+2: David AKPA -> DRH: Germaine YAO');

  // 6. Sylvain OUEDRAOGO & Marie Ruth GNAGNE
  await prisma.utilisateurs_cache.upsert({
    where: { id_microsoft: sylvainId },
    update: {
      nom: 'Sylvain Windigoudou OUEDRAOGO',
      email: 'sylvain.ouedraogo@agilly.net',
      role: 'SALARIE',
      poste: 'Chargé de mission GRC',
      departement: 'COVERPOINT',
      managerId: tiangboId,
      updatedAt: new Date(),
    },
    create: {
      id_microsoft: sylvainId,
      nom: 'Sylvain Windigoudou OUEDRAOGO',
      email: 'sylvain.ouedraogo@agilly.net',
      role: 'SALARIE',
      poste: 'Chargé de mission GRC',
      departement: 'COVERPOINT',
      managerId: tiangboId,
      updatedAt: new Date(),
    },
  });

  await prisma.utilisateurs_cache.upsert({
    where: { id_microsoft: ruthId },
    update: {
      nom: 'Marie Ruth GNAGNE',
      email: 'ruth.gnagne@agilly.net',
      role: 'SALARIE',
      poste: 'Juriste Affaires et PDCP',
      departement: 'Direction Juridique',
      managerId: tiangboId,
      updatedAt: new Date(),
    },
    create: {
      id_microsoft: ruthId,
      nom: 'Marie Ruth GNAGNE',
      email: 'ruth.gnagne@agilly.net',
      role: 'SALARIE',
      poste: 'Juriste Affaires et PDCP',
      departement: 'Direction Juridique',
      managerId: tiangboId,
      updatedAt: new Date(),
    },
  });

  console.log('\n3. Vérification du Cycle d\'évaluation 2026...');
  await prisma.cycles_evaluation.upsert({
    where: { id: cycleId },
    update: {
      libelle: 'Campagne Annuelle 2026',
      annee: 2026,
      typeCycle: 'ANNUELLE',
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
      libelle: 'Campagne Annuelle 2026',
      annee: 2026,
      typeCycle: 'ANNUELLE',
      statut: 'ACTIF',
      dateOuverture: new Date('2026-01-01T00:00:00.000Z'),
      dateFermeture: new Date('2026-12-31T23:59:59.000Z'),
      dateDebutFixation: new Date('2026-01-01T00:00:00.000Z'),
      dateFinFixation: new Date('2026-03-31T23:59:59.000Z'),
      dateDebutEval: new Date('2026-10-01T00:00:00.000Z'),
      dateFinEval: new Date('2026-12-31T23:59:59.000Z'),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });
  console.log('   ✓ Cycle 2026 configuré (Statut: ACTIF)');

  console.log('\n4. Création de la fiche d\'évaluation vierge pour Ebenezer Samuel KOUAME...');
  const ficheSamuel = await prisma.fiches_evaluation.create({
    data: {
      id: 'fic-samuel-2026',
      statut: 'FIXATION_OBJECTIFS',
      cycleId: cycleId,
      salarieId: samuelId,
      typeEvaluation: 'STANDARD',
      updatedAt: new Date(),
    },
  });

  await prisma.historique_evaluation.create({
    data: {
      id: 'hist-init-samuel',
      statutFiche: 'FIXATION_OBJECTIFS',
      action: 'OUVERTURE_CYCLE',
      commentaire: 'Ouverture de la campagne 2026. Phase initiale : fixation des objectifs par le manager.',
      effectueParId: tiangboId,
      ficheId: ficheSamuel.id,
      dateAction: new Date(),
    },
  });
  console.log(`   ✓ Fiche de Samuel créée : ${ficheSamuel.id} (Statut: FIXATION_OBJECTIFS)`);

  // Fiche pour Sylvain aussi
  const ficheSylvain = await prisma.fiches_evaluation.create({
    data: {
      id: 'fic-sylvain-2026',
      statut: 'FIXATION_OBJECTIFS',
      cycleId: cycleId,
      salarieId: sylvainId,
      typeEvaluation: 'STANDARD',
      updatedAt: new Date(),
    },
  });
  await prisma.historique_evaluation.create({
    data: {
      id: 'hist-init-sylvain',
      statutFiche: 'FIXATION_OBJECTIFS',
      action: 'OUVERTURE_CYCLE',
      commentaire: 'Ouverture de la campagne 2026. Phase initiale : fixation des objectifs.',
      effectueParId: tiangboId,
      ficheId: ficheSylvain.id,
      dateAction: new Date(),
    },
  });
  console.log(`   ✓ Fiche de Sylvain créée : ${ficheSylvain.id} (Statut: FIXATION_OBJECTIFS)`);

  console.log('\n============================================================');
  console.log('✅ BASE DE DONNÉES PRÊTE POUR LE PARCOURS END-TO-END !');
  console.log('============================================================');
}

main()
  .catch((e) => {
    console.error('Erreur lors du reset :', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

