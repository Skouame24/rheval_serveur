const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('🚀 Initialisation de la chaîne hiérarchique et du cycle actif...');

  // 1. Utilisateurs
  const claire = await prisma.utilisateurs_cache.upsert({
    where: { id_microsoft: 'drh-id-1234' },
    update: {
      nom: 'Claire DELMAS',
      email: 'drh@agilly.com',
      role: 'N2',
      poste: 'Directrice des Ressources Humaines',
      departement: 'Direction Générale',
      managerId: null,
      updatedAt: new Date(),
    },
    create: {
      id_microsoft: 'drh-id-1234',
      nom: 'Claire DELMAS',
      email: 'drh@agilly.com',
      role: 'N2',
      poste: 'Directrice des Ressources Humaines',
      departement: 'Direction Générale',
      managerId: null,
      updatedAt: new Date(),
    },
  });
  console.log('✓ N+2 (Directrice) créée :', claire.nom, `(${claire.id_microsoft})`);

  const marc = await prisma.utilisateurs_cache.upsert({
    where: { id_microsoft: 'manager-id-5678' },
    update: {
      nom: 'Marc AUBERT',
      email: 'manager@agilly.com',
      role: 'N1',
      poste: 'Responsable Technique N+1',
      departement: 'Direction Technique',
      managerId: 'drh-id-1234',
      updatedAt: new Date(),
    },
    create: {
      id_microsoft: 'manager-id-5678',
      nom: 'Marc AUBERT',
      email: 'manager@agilly.com',
      role: 'N1',
      poste: 'Responsable Technique N+1',
      departement: 'Direction Technique',
      managerId: 'drh-id-1234',
      updatedAt: new Date(),
    },
  });
  console.log('✓ N+1 (Responsable) créé :', marc.nom, `(manager = Claire DELMAS)`);

  const samuel = await prisma.utilisateurs_cache.upsert({
    where: { id_microsoft: '0a5c4c64-abdd-4f4f-a3af-00057ebdddfb' },
    update: {
      nom: 'Ebenezer Samuel KOUAME',
      email: 'ebenezer.kouame@agilly.net',
      role: 'SALARIE',
      poste: 'Ingénieur Cloud & Mobilité',
      departement: 'Direction Technique',
      managerId: 'manager-id-5678',
      updatedAt: new Date(),
    },
    create: {
      id_microsoft: '0a5c4c64-abdd-4f4f-a3af-00057ebdddfb',
      nom: 'Ebenezer Samuel KOUAME',
      email: 'ebenezer.kouame@agilly.net',
      role: 'SALARIE',
      poste: 'Ingénieur Cloud & Mobilité',
      departement: 'Direction Technique',
      managerId: 'manager-id-5678',
      updatedAt: new Date(),
    },
  });
  console.log('✓ Collaborateur créé :', samuel.nom, `(manager = Marc AUBERT)`);

  // 2. Cycle actif
  const cycle = await prisma.cycles_evaluation.upsert({
    where: { id: 'cyc-2026' },
    update: {
      libelle: "Campagne d'Évaluation Annuelle 2026",
      annee: 2026,
      statut: 'ACTIF',
      typeCycle: 'ANNUEL',
      dateOuverture: new Date('2026-01-01'),
      dateFermeture: new Date('2026-12-31'),
      creeParUserId: 'drh-id-1234',
      updatedAt: new Date(),
    },
    create: {
      id: 'cyc-2026',
      libelle: "Campagne d'Évaluation Annuelle 2026",
      annee: 2026,
      statut: 'ACTIF',
      typeCycle: 'ANNUEL',
      dateOuverture: new Date('2026-01-01'),
      dateFermeture: new Date('2026-12-31'),
      creeParUserId: 'drh-id-1234',
      updatedAt: new Date(),
    },
  });
  console.log('✓ Cycle actif créé :', cycle.libelle);

  // 3. Fiches d'évaluation en phase FIXATION_OBJECTIFS
  const ficheMarc = await prisma.fiches_evaluation.upsert({
    where: { id: 'fic-marc-aubert-2026' },
    update: {
      statut: 'FIXATION_OBJECTIFS',
      updatedAt: new Date(),
    },
    create: {
      id: 'fic-marc-aubert-2026',
      cycleId: 'cyc-2026',
      salarieId: 'manager-id-5678',
      statut: 'FIXATION_OBJECTIFS',
      updatedAt: new Date(),
    },
  });
  console.log('✓ Fiche d’évaluation Marc AUBERT créée (Statut : FIXATION_OBJECTIFS)');

  const ficheSamuel = await prisma.fiches_evaluation.upsert({
    where: { id: 'fic-samuel-kouame-2026' },
    update: {
      statut: 'FIXATION_OBJECTIFS',
      updatedAt: new Date(),
    },
    create: {
      id: 'fic-samuel-kouame-2026',
      cycleId: 'cyc-2026',
      salarieId: '0a5c4c64-abdd-4f4f-a3af-00057ebdddfb',
      statut: 'FIXATION_OBJECTIFS',
      updatedAt: new Date(),
    },
  });
  console.log('✓ Fiche d’évaluation Samuel KOUAME créée (Statut : FIXATION_OBJECTIFS)');

  console.log('\n🎉 Chaîne prête pour les tests manuels :');
  console.log('  1. Claire DELMAS (N+2) ➔ voit Marc AUBERT et peut lui fixer ses objectifs');
  console.log('  2. Marc AUBERT (N+1)   ➔ voit Samuel KOUAME et peut lui fixer ses objectifs, puis s’auto-évalue');
  console.log('  3. Samuel KOUAME       ➔ s’auto-évalue une fois ses objectifs fixés par Marc');
}

main()
  .catch((e) => {
    console.error('Erreur seed:', e);
  })
  .finally(() => prisma.$disconnect());
