// ============================================================
// scripts/reset-and-create-campaign.js
// Nettoyage complet des données fictives et création de la
// Campagne Annuelle 2026 pour Samuel KOUAME et son Manager Ange TIANGBO
// ============================================================

require('dotenv').config({ path: require('path').resolve(__dirname, '..', '.env') });
const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

let PrismaDemandesClient;
try {
  PrismaDemandesClient = require('@prisma-demandes/client').PrismaClient;
} catch (e) {
  console.log('Client Prisma Demandes non disponible directement, tentative alternative');
}

const prisma = new PrismaClient();
const prismaDemandes = PrismaDemandesClient ? new PrismaDemandesClient() : null;

async function cleanFrontendSwitchers() {
  console.log('--- 1. RETRAIT DU SWITCHER DANS LE FRONTEND ---');
  const headerPath = path.resolve(__dirname, '..', '..', 'rheval', 'components', 'layout', 'Header.tsx');
  if (fs.existsSync(headerPath)) {
    let content = fs.readFileSync(headerPath, 'utf8');
    // Supprime l'import UserRoleSwitcher
    content = content.replace(/import\s*\{\s*UserRoleSwitcher\s*\}\s*from\s*["']@\/components\/shared\/UserRoleSwitcher["'];\r?\n?/, '');
    // Supprime le bloc UserRoleSwitcher
    content = content.replace(/\{\/\*\s*Sélecteur de Rôles et d'Acteurs\s*\*\/\}[\s\S]*?<UserRoleSwitcher\s*\/>\r?\n?/, '');
    // Supprime la ligne séparatrice associée
    content = content.replace(/\{\/\*\s*Ligne séparatrice\s*\*\/\}[\s\S]*?<div className="w-px h-6 bg-slate-200"\s*\/>\r?\n?/, '');
    fs.writeFileSync(headerPath, content, 'utf8');
    console.log('  -> UserRoleSwitcher retiré du Header avec succès.');
  } else {
    console.log('  -> Header.tsx introuvable à', headerPath);
  }
}

async function cleanMainDatabase() {
  console.log('\n--- 2. NETTOYAGE DE LA BASE ÉVALUATIONS / PORTAIL ---');
  
  console.log('  -> Suppression des tables dépendantes...');
  await prisma.bonus_commissions.deleteMany({});
  await prisma.competences.deleteMany({});
  await prisma.feedbacks_360.deleteMany({});
  await prisma.formations.deleteMany({});
  await prisma.suggestions.deleteMany({});
  await prisma.historique_evaluation.deleteMany({});
  await prisma.objectifs.deleteMany({});
  await prisma.notifications.deleteMany({});
  await prisma.fiches_evaluation.deleteMany({});
  await prisma.cycles_evaluation.deleteMany({});
  console.log('  -> Fiches, Objectifs, Cycles et Notifications réinitialisés à 0.');
}

async function cleanDemandesDatabase() {
  console.log('\n--- 3. NETTOYAGE DE LA BASE ABSENCES & CONGÉS ---');
  if (prismaDemandes) {
    try {
      await prismaDemandes.historique_demande.deleteMany({});
      await prismaDemandes.justificatifs_demande.deleteMany({});
      await prismaDemandes.titres_absence.deleteMany({});
      await prismaDemandes.demandes_rh.deleteMany({});
      console.log('  -> Toutes les anciennes demandes et historiques supprimés.');

      // Réinitialiser les soldes 2026 pour Samuel et Ange
      await prismaDemandes.soldes_conges.deleteMany({});
      
      const samuelId = '0a5c4c64-abdd-4f4f-a3af-00057ebdddfb';
      const angeId = '1f77edad-716c-4552-b96f-58ec7d1ee1d7';

      await prismaDemandes.soldes_conges.create({
        data: {
          salarieId: samuelId,
          annee: 2026,
          joursAcquis: 26.0,
          joursPris: 0,
          joursEnAttente: 0,
          reliquatN1: 4.0, // Total = 30 jours
        },
      });

      await prismaDemandes.soldes_conges.create({
        data: {
          salarieId: angeId,
          annee: 2026,
          joursAcquis: 26.0,
          joursPris: 0,
          joursEnAttente: 0,
          reliquatN1: 4.0,
        },
      });
      console.log('  -> Soldes de congés 2026 initialisés à 30 jours (26 acquis + 4 reliquat) pour Samuel et Ange.');
    } catch (err) {
      console.warn('  -> Erreur demandes DB:', err.message);
    }
  }
}

async function createOfficialCampaign() {
  console.log('\n--- 4. CRÉATION DE LA CAMPAGNE OFFICIELLE 2026 ---');
  
  const cycleId = 'cyc-campagne-2026';
  const cycle = await prisma.cycles_evaluation.create({
    data: {
      id: cycleId,
      libelle: "Campagne Annuelle d'Évaluation 2026",
      annee: 2026,
      typeCycle: "ANNUEL",
      dateOuverture: new Date('2026-01-01T00:00:00.000Z'),
      dateFermeture: new Date('2026-12-31T23:59:59.000Z'),
      dateDebutFixation: new Date('2026-01-01T00:00:00.000Z'),
      dateFinFixation: new Date('2026-12-31T23:59:59.000Z'),
      dateDebutEval: new Date('2026-01-01T00:00:00.000Z'),
      dateFinEval: new Date('2026-12-31T23:59:59.000Z'),
      statut: "ACTIF",
      creeParUserId: "c970e84d-5fd5-4cb9-8c4e-7cccc14ad269", // Germaine YAO (DRH)
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });
  console.log('  -> Campagne créée avec succès :', cycle.libelle, `(Statut: ${cycle.statut})`);

  // Fiche pour Samuel KOUAME (évalué par Ange-Dieudonne TIANGBO)
  const samuelId = '0a5c4c64-abdd-4f4f-a3af-00057ebdddfb';
  const ficheSamuel = await prisma.fiches_evaluation.create({
    data: {
      id: `fic-samuel-2026`,
      statut: 'FIXATION_OBJECTIFS',
      cycleId: cycle.id,
      salarieId: samuelId,
      updatedAt: new Date(),
    },
  });
  console.log('  -> Fiche d\'évaluation créée pour Ebenezer Samuel KOUAME (Statut: FIXATION_OBJECTIFS).');

  // Fiches pour les autres collaborateurs de l'équipe d'Ange TIANGBO
  const teamMembers = [
    { id: '1e088664-6faf-484a-98ce-92de8fbdfb39', nom: 'Sylvain Windigoudou OUEDRAOGO' },
    { id: '4d8b00e4-b383-4beb-b819-c184b5eddce4', nom: 'Marie Ruth GNAGNE' },
  ];

  for (const m of teamMembers) {
    await prisma.fiches_evaluation.create({
      data: {
        id: `fic-${m.nom.toLowerCase().replace(/[^a-z0-9]/g, '-')}-2026`,
        statut: 'FIXATION_OBJECTIFS',
        cycleId: cycle.id,
        salarieId: m.id,
        updatedAt: new Date(),
      },
    });
    console.log(`  -> Fiche créée pour ${m.nom}.`);
  }
}

async function main() {
  try {
    await cleanFrontendSwitchers();
    await cleanMainDatabase();
    await cleanDemandesDatabase();
    await createOfficialCampaign();
    console.log('\n======================================================');
    console.log('✅ OPÉRATION TERMINÉE AVEC SUCCÈS !');
    console.log('Données réinitialisées. Campagne 2026 active et prête.');
    console.log('======================================================');
  } catch (err) {
    console.error('ERREUR LORS DU PROCESSUS :', err);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
    if (prismaDemandes) await prismaDemandes.$disconnect();
  }
}

main();

