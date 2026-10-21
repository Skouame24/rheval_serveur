// ============================================================
// prisma/seed-parcours.ts
// Script de génération des données de test pour le parcours d'évaluation
// ============================================================

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('\n============================================================');
  console.log('🌱  INITIALISATION DU JEU DE DONNÉES DU PARCOURS D\'ÉVALUATION');
  console.log('============================================================\n');

  // 1. Initialisation / Mise à jour du Cycle 2026
  console.log('1️⃣  Configuration du Cycle Annuel 2026...');
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
  console.log(`   ✓ Cycle actif : ${cycle.libelle} (Période: Du 01/01/2026 au 31/12/2026)`);

  // 2. Configuration des acteurs clés
  console.log('\n2️⃣  Configuration des comptes et hiérarchie...');

  // A. N+2 : David Martial AKPA
  const n2Akpa = await prisma.utilisateurs_cache.upsert({
    where: { id_microsoft: 'aaf364d4-b002-4ae1-943d-d7ab5ec90a9a' },
    update: {
      nom: 'David Martial AKPA',
      email: 'david.akpa@agilly.net',
      poste: 'Directeur Exécutif',
      departement: 'Direction Générale',
      role: 'N2',
      isCodir: true,
      updatedAt: new Date(),
    },
    create: {
      id_microsoft: 'aaf364d4-b002-4ae1-943d-d7ab5ec90a9a',
      nom: 'David Martial AKPA',
      email: 'david.akpa@agilly.net',
      poste: 'Directeur Exécutif',
      departement: 'Direction Générale',
      role: 'N2',
      isCodir: true,
      updatedAt: new Date(),
    },
  });
  console.log(`   👑 N+2 Direction : ${n2Akpa.nom} (${n2Akpa.email})`);

  // B. DRH : Germaine YAO
  const drhYao = await prisma.utilisateurs_cache.upsert({
    where: { id_microsoft: 'c970e84d-5fd5-4cb9-8c4e-7cccc14ad269' },
    update: {
      nom: 'Germaine YAO',
      email: 'germaine.yao@agilly.net',
      poste: 'Directrice des Ressources Humaines',
      departement: 'Direction des Ressources Humaines',
      role: 'DRH',
      isCodir: true,
      managerId: n2Akpa.id_microsoft,
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
      managerId: n2Akpa.id_microsoft,
      updatedAt: new Date(),
    },
  });
  console.log(`   💼 DRH : ${drhYao.nom} (${drhYao.email})`);

  // C. Manager N+1 : Ange-Dieudonne TIANGBO
  const n1Tiangbo = await prisma.utilisateurs_cache.upsert({
    where: { id_microsoft: '1f77edad-716c-4552-b96f-58ec7d1ee1d7' },
    update: {
      nom: 'Ange-Dieudonne TIANGBO',
      email: 'ange.tiangbo@agilly.net',
      poste: 'Directeur Juridique et conformité/DPO',
      departement: 'Direction Juridique/COVERPOINT',
      role: 'N1',
      managerId: n2Akpa.id_microsoft,
      updatedAt: new Date(),
    },
    create: {
      id_microsoft: '1f77edad-716c-4552-b96f-58ec7d1ee1d7',
      nom: 'Ange-Dieudonne TIANGBO',
      email: 'ange.tiangbo@agilly.net',
      poste: 'Directeur Juridique et conformité/DPO',
      departement: 'Direction Juridique/COVERPOINT',
      role: 'N1',
      managerId: n2Akpa.id_microsoft,
      updatedAt: new Date(),
    },
  });
  console.log(`   👔 Manager N+1 : ${n1Tiangbo.nom} (${n1Tiangbo.email})`);

  // D. Salarié 1 : Sylvain Windigoudou OUEDRAOGO (Dossier Parcours Principal)
  const salarieSylvain = await prisma.utilisateurs_cache.upsert({
    where: { id_microsoft: '1e088664-6faf-484a-98ce-92de8fbdfb39' },
    update: {
      nom: 'Sylvain Windigoudou OUEDRAOGO',
      email: 'sylvain.ouedraogo@agilly.net',
      poste: 'Chargé de mission GRC',
      departement: 'COVERPOINT',
      role: 'SALARIE',
      managerId: n1Tiangbo.id_microsoft,
      updatedAt: new Date(),
    },
    create: {
      id_microsoft: '1e088664-6faf-484a-98ce-92de8fbdfb39',
      nom: 'Sylvain Windigoudou OUEDRAOGO',
      email: 'sylvain.ouedraogo@agilly.net',
      poste: 'Chargé de mission GRC',
      departement: 'COVERPOINT',
      role: 'SALARIE',
      managerId: n1Tiangbo.id_microsoft,
      updatedAt: new Date(),
    },
  });
  console.log(`   👤 Salarié (Parcours) : ${salarieSylvain.nom} (${salarieSylvain.email})`);

  // E. Salarié 2 : Marie Ruth GNAGNE (Dossier Prêt pour Visa / Contestation)
  const salarieRuth = await prisma.utilisateurs_cache.upsert({
    where: { id_microsoft: '4d8b00e4-b383-4beb-b819-c184b5eddce4' },
    update: {
      nom: 'Marie Ruth GNAGNE',
      email: 'ruth.gnagne@agilly.net',
      poste: 'Juriste Affaires et PDCP',
      departement: 'Direction Juridique',
      role: 'SALARIE',
      managerId: n1Tiangbo.id_microsoft,
      updatedAt: new Date(),
    },
    create: {
      id_microsoft: '4d8b00e4-b383-4beb-b819-c184b5eddce4',
      nom: 'Marie Ruth GNAGNE',
      email: 'ruth.gnagne@agilly.net',
      poste: 'Juriste Affaires et PDCP',
      departement: 'Direction Juridique',
      role: 'SALARIE',
      managerId: n1Tiangbo.id_microsoft,
      updatedAt: new Date(),
    },
  });
  console.log(`   👤 Salariée (Test Visa/Contestation) : ${salarieRuth.nom} (${salarieRuth.email})`);

  // F. Salarié 3 : Ebenezer Samuel KOUAME (Dossier Prêt pour Arbitrage RH)
  const salarieSamuel = await prisma.utilisateurs_cache.upsert({
    where: { id_microsoft: '0a5c4c64-abdd-4f4f-a3af-00057ebdddfb' },
    update: {
      nom: 'Ebenezer Samuel KOUAME',
      email: 'ebenezer.kouame@agilly.net',
      poste: 'Développeur Fullstack',
      departement: 'Holding/Business Unit Digital',
      role: 'SALARIE',
      managerId: n1Tiangbo.id_microsoft,
      updatedAt: new Date(),
    },
    create: {
      id_microsoft: '0a5c4c64-abdd-4f4f-a3af-00057ebdddfb',
      nom: 'Ebenezer Samuel KOUAME',
      email: 'ebenezer.kouame@agilly.net',
      poste: 'Développeur Fullstack',
      departement: 'Holding/Business Unit Digital',
      role: 'SALARIE',
      managerId: n1Tiangbo.id_microsoft,
      updatedAt: new Date(),
    },
  });
  console.log(`   👤 Salarié (Test Arbitrage RH) : ${salarieSamuel.nom} (${salarieSamuel.email})`);

  // 3. Préparation des Dossiers d'évaluation
  console.log('\n3️⃣  Génération des fiches et des scénarios de test...');

  // Nettoyage ciblé des fiches existantes de ces 3 salariés pour recréer proprement
  const userIds = [salarieSylvain.id_microsoft, salarieRuth.id_microsoft, salarieSamuel.id_microsoft];
  const oldFiches = await prisma.fiches_evaluation.findMany({
    where: { salarieId: { in: userIds } },
    select: { id: true },
  });
  const oldFicheIds = oldFiches.map((f) => f.id);

  if (oldFicheIds.length > 0) {
    await prisma.notifications.deleteMany({ where: { ficheId: { in: oldFicheIds } } });
    await prisma.evaluations.deleteMany({ where: { objectifs: { ficheId: { in: oldFicheIds } } } });
    await prisma.indicateurs.deleteMany({ where: { objectifs: { ficheId: { in: oldFicheIds } } } });
    await prisma.objectifs.deleteMany({ where: { ficheId: { in: oldFicheIds } } });
    await prisma.formations.deleteMany({ where: { ficheId: { in: oldFicheIds } } });
    await prisma.bonus_commissions.deleteMany({ where: { ficheId: { in: oldFicheIds } } });
    await prisma.competences.deleteMany({ where: { ficheId: { in: oldFicheIds } } });
    await prisma.feedbacks_360.deleteMany({ where: { ficheId: { in: oldFicheIds } } });
    await prisma.suggestions.deleteMany({ where: { ficheId: { in: oldFicheIds } } });
    await prisma.historique_evaluation.deleteMany({ where: { ficheId: { in: oldFicheIds } } });
    await prisma.fiches_evaluation.deleteMany({ where: { id: { in: oldFicheIds } } });
  }

  // -------------------------------------------------------------
  // SCÉNARIO 1 : Sylvain Windigoudou OUEDRAOGO -> Prêt pour Évaluation N+1
  // Statut: EVALUATION_N1 (Objectifs fixés à 100%, prêt à être noté par le manager N+1 Ange TIANGBO)
  // -------------------------------------------------------------
  const ficheSylvainId = 'fic-sylvain-2026';
  const ficheSylvain = await prisma.fiches_evaluation.create({
    data: {
      id: ficheSylvainId,
      statut: 'EVALUATION_N1',
      cycleId: cycle.id,
      salarieId: salarieSylvain.id_microsoft,
      typeEvaluation: 'STANDARD',
      updatedAt: new Date(),
    },
  });

  const objSylvain1 = await prisma.objectifs.create({
    data: {
      id: 'obj-sylv-1',
      ficheId: ficheSylvain.id,
      intitule: 'Mise en conformité du dispositif GRC et cartographie des risques',
      description: 'Actualiser la cartographie des risques opérationnels et de conformité pour COVERPOINT.',
      ponderation: 40,
      updatedAt: new Date(),
    },
  });
  await prisma.indicateurs.create({
    data: {
      id: 'ind-sylv-1',
      objectifId: objSylvain1.id,
      intitule: 'Taux de couverture des risques cartographiés >= 95%',
      noteMin: 0,
      noteMax: 20,
    },
  });

  const objSylvain2 = await prisma.objectifs.create({
    data: {
      id: 'obj-sylv-2',
      ficheId: ficheSylvain.id,
      intitule: 'Déploiement des audits internes et suivi des recommandations',
      description: 'Conduire les revues de conformité prévues au plan annuel et s\'assurer de la levée des réserves.',
      ponderation: 35,
      updatedAt: new Date(),
    },
  });
  await prisma.indicateurs.create({
    data: {
      id: 'ind-sylv-2',
      objectifId: objSylvain2.id,
      intitule: '100% des recommandations d\'audit traitées dans les délais impartis',
      noteMin: 0,
      noteMax: 20,
    },
  });

  const objSylvain3 = await prisma.objectifs.create({
    data: {
      id: 'obj-sylv-3',
      ficheId: ficheSylvain.id,
      intitule: 'Sensibilisation des équipes et culture de la conformité',
      description: 'Organiser des sessions régulières de sensibilisation aux bonnes pratiques réglementaires.',
      ponderation: 25,
      updatedAt: new Date(),
    },
  });
  await prisma.indicateurs.create({
    data: {
      id: 'ind-sylv-3',
      objectifId: objSylvain3.id,
      intitule: 'Au minimum 4 sessions de sensibilisation délivrées avec taux de satisfaction >= 85%',
      noteMin: 0,
      noteMax: 20,
    },
  });

  await prisma.historique_evaluation.create({
    data: {
      id: 'hist-sylv-init',
      statutFiche: 'EVALUATION_N1',
      action: 'OBJECTIFS_FIXES',
      commentaire: 'Objectifs 2026 validés par le Manager N+1. Prêt pour l\'évaluation.',
      effectueParId: n1Tiangbo.id_microsoft,
      ficheId: ficheSylvain.id,
      dateAction: new Date(),
    },
  });

  console.log(`   🎯 SCÉNARIO 1 : Sylvain Windigoudou OUEDRAOGO`);
  console.log(`      - Fiche ID : ${ficheSylvain.id}`);
  console.log(`      - Statut   : EVALUATION_N1 (Prêt pour la notation par le N+1)`);
  console.log(`      - 3 Objectifs pondérés (40% + 35% + 25% = 100%)`);

  // -------------------------------------------------------------
  // SCÉNARIO 2 : Marie Ruth GNAGNE -> Prête pour le Visa Salarié (ou Contestation)
  // Statut: ACCORD_SALARIE (Notes déjà renseignées par le Manager : 14.75/20, attend visa ou contestation)
  // -------------------------------------------------------------
  const ficheRuthId = 'fic-ruth-2026';
  const ficheRuth = await prisma.fiches_evaluation.create({
    data: {
      id: ficheRuthId,
      statut: 'ACCORD_SALARIE',
      noteGlobale: 14.75,
      observation: 'Très bon travail juridique tout au long de l\'année. Dynamisme et rigueur.',
      cycleId: cycle.id,
      salarieId: salarieRuth.id_microsoft,
      typeEvaluation: 'STANDARD',
      updatedAt: new Date(),
    },
  });

  const objRuth1 = await prisma.objectifs.create({
    data: {
      id: 'obj-ruth-1',
      ficheId: ficheRuth.id,
      intitule: 'Sécurisation contractuelle et revue des conventions partenariats',
      description: 'Revue et validation de l\'ensemble des contrats clients et fournisseurs.',
      ponderation: 50,
      noteGlobale: 15,
      updatedAt: new Date(),
    },
  });
  await prisma.evaluations.create({
    data: {
      examinateurId: n1Tiangbo.id_microsoft,
      objectifId: objRuth1.id,
      note: 15,
      observation: 'Excellente réactivité sur la négociation des clauses sensibles.',
      updatedAt: new Date(),
    },
  });

  const objRuth2 = await prisma.objectifs.create({
    data: {
      id: 'obj-ruth-2',
      ficheId: ficheRuth.id,
      intitule: 'Mise en conformité RGPD / Protection des Données à Caractère Personnel',
      description: 'Tenue à jour du registre des traitements et formalisation des procédures DPO.',
      ponderation: 50,
      noteGlobale: 14.5,
      updatedAt: new Date(),
    },
  });
  await prisma.evaluations.create({
    data: {
      examinateurId: n1Tiangbo.id_microsoft,
      objectifId: objRuth2.id,
      note: 14.5,
      observation: 'Bonne avancée, poursuivre le travail d\'audit des sous-traitants.',
      updatedAt: new Date(),
    },
  });

  await prisma.formations.create({
    data: {
      id: 'form-ruth-1',
      ficheId: ficheRuth.id,
      intitule: 'Certification DPO / Protection des Données Personnelles',
      priorite: 'HAUTE',
      delai: 'Q2 2026',
      objectifVise: 'Renforcer la maîtrise réglementaire RGPD internationale',
      statut: 'VALIDE',
    },
  });

  await prisma.historique_evaluation.create({
    data: {
      id: 'hist-ruth-eval',
      statutFiche: 'ACCORD_SALARIE',
      action: 'EVALUATION_N1_SOUMISE',
      commentaire: 'Évaluation N+1 validée avec une note de 14.75/20. En attente du visa du collaborateur.',
      effectueParId: n1Tiangbo.id_microsoft,
      ficheId: ficheRuth.id,
      dateAction: new Date(),
    },
  });

  console.log(`   ⚖️ SCÉNARIO 2 : Marie Ruth GNAGNE`);
  console.log(`      - Fiche ID : ${ficheRuth.id}`);
  console.log(`      - Statut   : ACCORD_SALARIE (Notes N+1 saisies : 14.75/20)`);
  console.log(`      - Prête pour : Visa salarié ou clic sur "Contester la note & Demander un Arbitrage RH"`);

  // -------------------------------------------------------------
  // SCÉNARIO 3 : Ebenezer Samuel KOUAME -> En Arbitrage RH
  // Statut: ARBITRAGE_RH (Contestation formulée par le collaborateur, en attente de conciliation DRH)
  // -------------------------------------------------------------
  const ficheSamuelId = 'fic-samuel-2026';
  const ficheSamuel = await prisma.fiches_evaluation.create({
    data: {
      id: ficheSamuelId,
      statut: 'ARBITRAGE_RH',
      noteGlobale: 12.0,
      observation: 'Évaluation technique contestée par le collaborateur. Demande d\'arbitrage transmise aux RH.',
      cycleId: cycle.id,
      salarieId: salarieSamuel.id_microsoft,
      typeEvaluation: 'STANDARD',
      updatedAt: new Date(),
    },
  });

  const objSam1 = await prisma.objectifs.create({
    data: {
      id: 'obj-sam-1',
      ficheId: ficheSamuel.id,
      intitule: 'Développement et refonte de la plateforme RHEVAL',
      description: 'Livraison de la nouvelle version avec parcours dématérialisé et alertes.',
      ponderation: 60,
      noteGlobale: 11,
      updatedAt: new Date(),
    },
  });
  await prisma.evaluations.create({
    data: {
      examinateurId: n1Tiangbo.id_microsoft,
      objectifId: objSam1.id,
      note: 11,
      observation: 'Délais respectés mais retouches demandées sur l\'interface.',
      updatedAt: new Date(),
    },
  });

  const objSam2 = await prisma.objectifs.create({
    data: {
      id: 'obj-sam-2',
      ficheId: ficheSamuel.id,
      intitule: 'Maintenance et support technique des applicatifs internes',
      description: 'Résolution des tickets d\'incidents et assistance aux utilisateurs.',
      ponderation: 40,
      noteGlobale: 13.5,
      updatedAt: new Date(),
    },
  });
  await prisma.evaluations.create({
    data: {
      examinateurId: n1Tiangbo.id_microsoft,
      objectifId: objSam2.id,
      note: 13.5,
      observation: 'Bonne disponibilité et accompagnement des équipes.',
      updatedAt: new Date(),
    },
  });

  await prisma.historique_evaluation.create({
    data: {
      id: 'hist-sam-litige',
      statutFiche: 'ARBITRAGE_RH',
      action: 'VISA_REFUSE_CONTESTATION',
      commentaire: 'Contestation du collaborateur : "La note sur le projet RHEVAL ne tient pas compte des changements de périmètre intervenus en cours d\'année."',
      effectueParId: salarieSamuel.id_microsoft,
      ficheId: ficheSamuel.id,
      dateAction: new Date(),
    },
  });

  console.log(`   🏛️ SCÉNARIO 3 : Ebenezer Samuel KOUAME`);
  console.log(`      - Fiche ID : ${ficheSamuel.id}`);
  console.log(`      - Statut   : ARBITRAGE_RH (Contestation active)`);
  console.log(`      - Prête pour : DRH Germaine YAO (Saisie de la note d'arbitrage finale et clôture)`);

  console.log('\n============================================================');
  console.log('✅  SEED TERMINÉ AVEC SUCCÈS ! LE PARCOURS PEUT COMMENCER.');
  console.log('============================================================\n');
}

main()
  .catch((e) => {
    console.error('❌ Erreur seed :', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
