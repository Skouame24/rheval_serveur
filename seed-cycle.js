const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function main() {
  await prisma.cycles_evaluation.create({
    data: {
      id: 'cyc-test-2026',
      libelle: 'Campagne S2 2026 (Test)',
      annee: 2026,
      typeCycle: 'ANNUEL',
      dateOuverture: new Date('2026-06-01T00:00:00Z'),
      dateFermeture: new Date('2027-02-28T23:59:59Z'),
      statut: 'ACTIF',
      updatedAt: new Date()
    }
  });
  console.log('Cycle créé avec succès !');
}
main().catch(console.error).finally(() => prisma.$disconnect());
