import * as dotenv from 'dotenv';
dotenv.config();
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const fiches = await prisma.fiches_evaluation.findMany({
    include: {
      utilisateurs_cache: {
        select: { id_microsoft: true, nom: true, email: true, poste: true, managerId: true }
      },
      objectifs: true
    }
  });
  console.log('FICHES IN DB:');
  for (const f of fiches) {
    console.log(f.id, f.statut, f.utilisateurs_cache?.nom, 'mgr:', f.utilisateurs_cache?.managerId, 'objCount:', f.objectifs?.length);
  }
}
main().catch(console.error).finally(() => prisma.$disconnect());
