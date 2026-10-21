import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('============================================================');
  console.log('🎯 CONFIGURATION DU PARCOURS AVEC EBENEZER SAMUEL KOUAME');
  console.log('============================================================');

  const samuelId = '0a5c4c64-abdd-4f4f-a3af-00057ebdddfb';
  const tiangboId = '1f77edad-716c-4552-b96f-58ec7d1ee1d7';
  const akpaId = 'aaf364d4-b002-4ae1-943d-d7ab5ec90a9a';
  const yaoId = 'c970e84d-5fd5-4cb9-8c4e-7cccc14ad269';
  const sylvainId = '1e088664-6faf-484a-98ce-92de8fbdfb39';
  const ruthId = '4d8b00e4-b383-4beb-b819-c184b5eddce4';
  const cycleId = 'cyc-campagne-2026';

  // 1. David Martial AKPA -> Direction N+2
  await prisma.utilisateurs_cache.update({
    where: { id_microsoft: akpaId },
    data: { role: 'N2', poste: 'Directeur Exécutif' },
  });
  console.log('✓ N+2 : David Martial AKPA');

  // 2. Germaine YAO -> DRH
  await prisma.utilisateurs_cache.update({
    where: { id_microsoft: yaoId },
    data: { role: 'DRH', managerId: akpaId, poste: 'Directrice des Ressources Humaines' },
  });
  console.log('✓ DRH : Germaine YAO (N+2 : David Martial AKPA)');

  // 3. Ange-Dieudonne TIANGBO -> Manager N+1
  await prisma.utilisateurs_cache.update({
    where: { id_microsoft: tiangboId },
    data: { role: 'N1', managerId: akpaId, poste: 'Directeur Juridique & Conformité / DPO' },
  });
  console.log('✓ N+1 : Ange-Dieudonne TIANGBO (N+2 : David Martial AKPA)');

  // 4. Ebenezer Samuel KOUAME -> Salarié évalué rattaché à Ange TIANGBO
  await prisma.utilisateurs_cache.update({
    where: { id_microsoft: samuelId },
    data: {
      role: 'SALARIE',
      managerId: tiangboId,
      poste: 'Développeur Fullstack',
      departement: 'Technique & Digital',
    },
  });
  console.log('✓ Salarié évalué : Ebenezer Samuel KOUAME (N+1 : Ange-Dieudonne TIANGBO -> N+2 : David Martial AKPA)');

  // 5. Sylvain & Ruth rattachés aussi à Ange TIANGBO
  await prisma.utilisateurs_cache.update({
    where: { id_microsoft: sylvainId },
    data: { role: 'SALARIE', managerId: tiangboId },
  });
  await prisma.utilisateurs_cache.update({
    where: { id_microsoft: ruthId },
    data: { role: 'SALARIE', managerId: tiangboId },
  });

  // 6. S'assurer que la fiche de Samuel est propre au statut FIXATION_OBJECTIFS
  const ficheSamuelId = 'fic-samuel-2026';
  // Nettoyer objectifs/notes existants sur cette fiche
  await prisma.evaluations.deleteMany({ where: { objectifs: { ficheId: ficheSamuelId } } });
  await prisma.indicateurs.deleteMany({ where: { objectifs: { ficheId: ficheSamuelId } } });
  await prisma.objectifs.deleteMany({ where: { ficheId: ficheSamuelId } });
  await prisma.formations.deleteMany({ where: { ficheId: ficheSamuelId } });
  await prisma.historique_evaluation.deleteMany({ where: { ficheId: ficheSamuelId } });
  await prisma.fiches_evaluation.deleteMany({ where: { salarieId: samuelId } });

  const fiche = await prisma.fiches_evaluation.create({
    data: {
      id: ficheSamuelId,
      statut: 'FIXATION_OBJECTIFS',
      cycleId: cycleId,
      salarieId: samuelId,
      typeEvaluation: 'STANDARD',
      updatedAt: new Date(),
    },
  });

  await prisma.historique_evaluation.create({
    data: {
      id: 'hist-sam-' + Date.now(),
      statutFiche: 'FIXATION_OBJECTIFS',
      action: 'OUVERTURE_CYCLE',
      commentaire: 'Ouverture de la campagne 2026. Phase de fixation des objectifs.',
      effectueParId: tiangboId,
      ficheId: fiche.id,
      dateAction: new Date(),
    },
  });

  console.log(`✓ Fiche d'évaluation de Samuel créée : ${fiche.id} (Statut: FIXATION_OBJECTIFS)`);

  const teamTiangbo = await prisma.utilisateurs_cache.findMany({
    where: { managerId: tiangboId },
  });
  console.log(`\nCollaborateurs directs de Ange-Dieudonne TIANGBO (${teamTiangbo.length}) :`);
  for (const u of teamTiangbo) {
    console.log(`  👉 ${u.nom} (${u.email}) - Poste: ${u.poste}`);
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());

