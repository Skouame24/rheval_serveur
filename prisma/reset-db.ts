// ============================================================
// prisma/reset-db.ts
// Script de réinitialisation complète de la base de données RHEVAL
// Configuration officielle de la hiérarchie pour démonstrations & tests
// Hiérarchie : PDG -> DRH + Managers -> Assistante RH + Collaborateurs
// Usage : npm run db:reset
// ============================================================

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function resetDatabase() {
  console.log('\n============================================================');
  console.log('🔄  RÉINITIALISATION DE LA BASE DE DONNÉES AGILLY RHEVAL');
  console.log('    Configuration Hiérarchie Complète (PDG, DRH, Assistante, Managers, Salarié)');
  console.log('============================================================\n');

  // 1. Nettoyage des tables transactionnelles dans l'ordre strict
  console.log('1️⃣  Nettoyage des données de test précédentes...');

  await prisma.notifications.deleteMany({});
  console.log('   ✓ Notifications supprimées (badge cloche remis à 0)');

  await prisma.evaluations.deleteMany({});
  console.log('   ✓ Notes et appréciations détaillées supprimées');

  await prisma.indicateurs.deleteMany({});
  console.log('   ✓ Indicateurs supprimés');

  await prisma.objectifs.deleteMany({});
  console.log('   ✓ Objectifs supprimés');

  await prisma.formations.deleteMany({});
  console.log('   ✓ Besoins de formation supprimés');

  await prisma.bonus_commissions.deleteMany({});
  console.log('   ✓ Bonus & commissions supprimés');

  await prisma.competences.deleteMany({});
  console.log('   ✓ Compétences supprimées');

  await prisma.feedbacks_360.deleteMany({});
  console.log('   ✓ Feedbacks 360 supprimés');

  await prisma.suggestions.deleteMany({});
  console.log('   ✓ Suggestions supprimées');

  await prisma.historique_evaluation.deleteMany({});
  console.log('   ✓ Historique d\'audit des fiches réinitialisé');

  await prisma.fiches_evaluation.deleteMany({});
  console.log('   ✓ Fiches d\'évaluation supprimées');

  // 2. Initialisation de la Campagne d'Évaluation 2026
  console.log('\n2️⃣  Création / Mise à jour de la Campagne 2026...');
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
  console.log(`   ✓ Campagne active : "${cycle.libelle}" (Statut: ${cycle.statut})`);

  // 3. Configuration de la hiérarchie d'entreprise réelle dans utilisateurs_cache
  console.log('\n3️⃣  Configuration de la hiérarchie officielle...');

  // A. PDG / Direction Générale
  const pdg = await prisma.utilisateurs_cache.upsert({
    where: { id_microsoft: 'aaf364d4-b002-4ae1-943d-d7ab5ec90a9a' },
    update: {
      nom: 'Christian BAMBA',
      email: 'christian.bamba@agilly.net',
      poste: 'PDG & Directeur Général',
      departement: 'Direction Générale',
      role: 'N2',
      isCodir: true,
      managerId: null,
      updatedAt: new Date(),
    },
    create: {
      id_microsoft: 'aaf364d4-b002-4ae1-943d-d7ab5ec90a9a',
      nom: 'Christian BAMBA',
      email: 'christian.bamba@agilly.net',
      poste: 'PDG & Directeur Général',
      departement: 'Direction Générale',
      role: 'N2',
      isCodir: true,
      managerId: null,
      updatedAt: new Date(),
    },
  });
  console.log(`   👑 PDG : ${pdg.nom} (${pdg.email}) - Poste: ${pdg.poste}`);

  // B. Directrice des Ressources Humaines (DRH) -> Reporte au PDG
  const drh = await prisma.utilisateurs_cache.upsert({
    where: { id_microsoft: 'c970e84d-5fd5-4cb9-8c4e-7cccc14ad269' },
    update: {
      nom: 'Germaine YAO',
      email: 'germaine.yao@agilly.net',
      poste: 'Directrice des Ressources Humaines',
      departement: 'Direction des Ressources Humaines',
      role: 'DRH',
      isCodir: true,
      managerId: pdg.id_microsoft,
      updatedAt: new Date(),
    },
    create: {
      id_microsoft: 'c970e84d-5fd5-4cb9-8c4e-7cccc14ad269',
      nom: 'Germaine YAO',
      email: 'germaine.yao@agilly.net',
      poste: 'Directrice des Ressources Humaines',
      departement: 'Direction des Ressources Humaines',
      role: 'DRH',
      isCodir: true,
      managerId: pdg.id_microsoft,
      updatedAt: new Date(),
    },
  });
  console.log(`   💼 DRH : ${drh.nom} (${drh.email}) - N+1 direct: PDG (${pdg.nom})`);

  // C. Assistante RH -> Reporte directement à la DRH (Germaine YAO)
  const assistanteRh = await prisma.utilisateurs_cache.upsert({
    where: { id_microsoft: 'asst-rh-1144-4a48-bed2-72b525325c81' },
    update: {
      nom: 'Fatou DIOP',
      email: 'assistante.rh@agilly.net',
      poste: 'Assistante Ressources Humaines',
      departement: 'Direction des Ressources Humaines',
      role: 'RH',
      isCodir: false,
      managerId: drh.id_microsoft,
      updatedAt: new Date(),
    },
    create: {
      id_microsoft: 'asst-rh-1144-4a48-bed2-72b525325c81',
      nom: 'Fatou DIOP',
      email: 'assistante.rh@agilly.net',
      poste: 'Assistante Ressources Humaines',
      departement: 'Direction des Ressources Humaines',
      role: 'RH',
      isCodir: false,
      managerId: drh.id_microsoft,
      updatedAt: new Date(),
    },
  });
  console.log(`   📋 Assistante RH : ${assistanteRh.nom} (${assistanteRh.email}) - Manager N+1: DRH (${drh.nom})`);

  // D. Directeur N+2 (Technique & Opérations) -> Reporte au PDG
  const directeurN2 = await prisma.utilisateurs_cache.upsert({
    where: { id_microsoft: 'dir-n2-7777-4a48-bed2-72b525325c81' },
    update: {
      nom: 'Marc KOFFI',
      email: 'directeur.n2@agilly.net',
      poste: 'Directeur Technique & Opérations',
      departement: 'Technique & Digital',
      role: 'N2',
      isCodir: true,
      managerId: pdg.id_microsoft,
      updatedAt: new Date(),
    },
    create: {
      id_microsoft: 'dir-n2-7777-4a48-bed2-72b525325c81',
      nom: 'Marc KOFFI',
      email: 'directeur.n2@agilly.net',
      poste: 'Directeur Technique & Opérations',
      departement: 'Technique & Digital',
      role: 'N2',
      isCodir: true,
      managerId: pdg.id_microsoft,
      updatedAt: new Date(),
    },
  });
  console.log(`   👔 Directeur N+2 : ${directeurN2.nom} (${directeurN2.email}) - N+1: PDG (${pdg.nom})`);

  // E. Managers N+1
  const n1Managers = [
    {
      id_microsoft: 'abe87afa-a80b-4a48-bed2-72b525325c81',
      nom: 'Sevan AKOUMIA',
      email: 'sevan.akoumia@agilly.net',
      poste: 'Responsable Technique Digital',
      departement: 'Technique & Digital',
      role: 'N1',
      managerId: directeurN2.id_microsoft,
    },
    {
      id_microsoft: '4f1e0426-b3f2-446b-9279-d830964cc8c8',
      nom: 'Ange Donatien EFFOLI',
      email: 'donatien.effoli@agilly.net',
      poste: 'Manager des Services',
      departement: 'Services',
      role: 'N1',
      managerId: pdg.id_microsoft,
    },
    {
      id_microsoft: '8eb2a86c-e426-49b6-ad49-50d19bf55ce5',
      nom: "Wilfried N'GUETTA",
      email: 'anicet.nguetta@agilly.net',
      poste: 'Responsable IT Interne',
      departement: 'IT',
      role: 'N1',
      managerId: pdg.id_microsoft,
    },
  ];

  for (const m of n1Managers) {
    const mgr = await prisma.utilisateurs_cache.upsert({
      where: { id_microsoft: m.id_microsoft },
      update: {
        nom: m.nom,
        email: m.email,
        poste: m.poste,
        departement: m.departement,
        role: m.role,
        managerId: m.managerId,
        updatedAt: new Date(),
      },
      create: {
        id_microsoft: m.id_microsoft,
        nom: m.nom,
        email: m.email,
        poste: m.poste,
        departement: m.departement,
        role: m.role,
        managerId: m.managerId,
        updatedAt: new Date(),
      },
    });
    console.log(`   👔 Responsable N+1 : ${mgr.nom} (${mgr.email}) -> Reporte au PDG (${pdg.nom})`);
  }

  // E. Salarié sous Sevan AKOUMIA
  const salarie = await prisma.utilisateurs_cache.upsert({
    where: { id_microsoft: '0a5c4c64-abdd-4f4f-a3af-00057ebdddfb' },
    update: {
      nom: 'Ebenezer Samuel KOUAME',
      email: 'ebenezer.kouame@agilly.net',
      poste: 'Développeur Fullstack',
      departement: 'Technique & Digital',
      role: 'SALARIE',
      managerId: 'abe87afa-a80b-4a48-bed2-72b525325c81',
      updatedAt: new Date(),
    },
    create: {
      id_microsoft: '0a5c4c64-abdd-4f4f-a3af-00057ebdddfb',
      nom: 'Ebenezer Samuel KOUAME',
      email: 'ebenezer.kouame@agilly.net',
      poste: 'Développeur Fullstack',
      departement: 'Technique & Digital',
      role: 'SALARIE',
      managerId: 'abe87afa-a80b-4a48-bed2-72b525325c81',
      updatedAt: new Date(),
    },
  });
  console.log(`   👤 Collaborateur : ${salarie.nom} (${salarie.email}) -> N+1: Sevan AKOUMIA -> N+2: PDG (${pdg.nom})`);

  // 4. Création des fiches d'évaluation initiales prêtes pour les tests
  console.log('\n4️⃣  Génération des fiches d\'évaluation initiales (Statut : FIXATION_OBJECTIFS)...');

  // Fiches pour : Collaborateur, Assistante RH, DRH, Directeur N2, et Managers N+1
  const evaluatedUsers = [salarie, assistanteRh, drh, directeurN2, ...n1Managers];

  for (const user of evaluatedUsers) {
    const ficheId = 'fic-' + user.id_microsoft.substring(0, 8) + '-2026';
    const fiche = await prisma.fiches_evaluation.create({
      data: {
        id: ficheId,
        statut: 'FIXATION_OBJECTIFS',
        cycleId: cycleId,
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
        effectueParId: drh.id_microsoft,
        ficheId: fiche.id,
        dateAction: new Date(),
      },
    });

    console.log(`   ✓ Fiche créée pour ${user.nom} (ID: ${fiche.id}, Statut: FIXATION_OBJECTIFS)`);
  }

  console.log('\n============================================================');
  console.log('✅  BASE DE DONNÉES PRÊTE POUR TOUS LES TESTS !');
  console.log('============================================================');
  console.log(`
📋 COMPTES DE TEST DISPONIBLES :

1. PDG & Directeur Général :
   - Nom   : Christian BAMBA
   - Email : christian.bamba@agilly.net
   - Rôle  : N2 / PDG
   - Voit  : Ensemble de l'entreprise (N2 pour toute la structure), valide les objectifs et notes des managers et de la DRH.

2. Directrice des Ressources Humaines (DRH) :
   - Nom   : Germaine YAO
   - Email : germaine.yao@agilly.net
   - Rôle  : DRH
   - Double casquette :
     a) Manager N+1 de son Assistante RH (Fatou DIOP) -> fixe ses objectifs et l'évalue dans "Mon Équipe".
     b) Pilotage RH central de l'entreprise (Arbitrages, clôtures, synthèse globale).
   - N+1   : Le PDG (Christian BAMBA) qui l'évalue.

3. Assistante RH :
   - Nom   : Fatou DIOP
   - Email : assistante.rh@agilly.net
   - Rôle  : RH / Salarié
   - Évaluée par : Germaine YAO (DRH).

4. Responsable Technique Digital (Manager N+1) :
   - Nom   : Sevan AKOUMIA
   - Email : sevan.akoumia@agilly.net
   - Rôle  : N1
   - Voit  : Son collaborateur direct (Ebenezer Samuel KOUAME).
   - N+2   : Le PDG (Christian BAMBA).

5. Collaborateur Développeur :
   - Nom   : Ebenezer Samuel KOUAME
   - Email : ebenezer.kouame@agilly.net
   - Rôle  : SALARIE
   - Voit  : "Mon Espace" avec ses objectifs et sa fiche d'évaluation en lecture seule.
`);
}

resetDatabase()
  .catch((e) => {
    console.error('❌ Erreur lors de la réinitialisation :', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
