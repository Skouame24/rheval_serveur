import * as dotenv from 'dotenv';
dotenv.config();
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const users = await prisma.utilisateurs_cache.findMany();
  console.log('USERS COUNT:', users.length);
  for (const u of users) {
    console.log(`- [${u.id_microsoft}] ${u.nom} (${u.email}) - Role: ${u.role} - Dept: ${u.departement} - Poste: ${u.poste} - ManagerId: ${u.managerId}`);
  }
}
main().catch(console.error).finally(() => prisma.$disconnect());

