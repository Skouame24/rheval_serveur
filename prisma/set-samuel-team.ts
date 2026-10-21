import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Configuring Ebenezer Samuel KOUAME as Manager N+1 of Sylvain & Ruth...');

  const samuelId = '0a5c4c64-abdd-4f4f-a3af-00057ebdddfb';
  const akpaId = 'aaf364d4-b002-4ae1-943d-d7ab5ec90a9a';
  const sylvainId = '1e088664-6faf-484a-98ce-92de8fbdfb39';
  const ruthId = '4d8b00e4-b383-4beb-b819-c184b5eddce4';

  // 1. Ebenezer Samuel KOUAME -> Manager N+1, report au N+2 David Martial AKPA
  await prisma.utilisateurs_cache.update({
    where: { id_microsoft: samuelId },
    data: {
      role: 'N1',
      poste: 'Responsable Technique & Digital',
      departement: 'Technique & Digital',
      managerId: akpaId,
    },
  });
  console.log('✓ Ebenezer Samuel KOUAME configuré comme Manager N+1 (N+2 : David Martial AKPA)');

  // 2. Sylvain Windigoudou OUEDRAOGO -> Collaborateur sous Ebenezer Samuel KOUAME
  await prisma.utilisateurs_cache.update({
    where: { id_microsoft: sylvainId },
    data: {
      role: 'SALARIE',
      managerId: samuelId,
    },
  });
  console.log('✓ Sylvain Windigoudou OUEDRAOGO rattaché à Ebenezer Samuel KOUAME');

  // 3. Marie Ruth GNAGNE -> Collaboratrice sous Ebenezer Samuel KOUAME
  await prisma.utilisateurs_cache.update({
    where: { id_microsoft: ruthId },
    data: {
      role: 'SALARIE',
      managerId: samuelId,
    },
  });
  console.log('✓ Marie Ruth GNAGNE rattachée à Ebenezer Samuel KOUAME');

  // 4. Mettre à jour l'effectueParId dans historique pour Sylvain et Ruth
  await prisma.historique_evaluation.updateMany({
    where: { fiches_evaluation: { salarieId: sylvainId } },
    data: { effectueParId: samuelId },
  });

  const checkUsers = await prisma.utilisateurs_cache.findMany({
    where: { managerId: samuelId },
  });
  console.log(`\nCollaborateurs directs de Ebenezer Samuel KOUAME (${checkUsers.length}) :`);
  for (const u of checkUsers) {
    console.log(`- ${u.nom} (${u.email}) - Poste: ${u.poste}`);
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());

