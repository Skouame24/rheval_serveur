import { randomBytes } from 'node:crypto';
import { PrismaClient } from '@prisma/client';
import { hashPassword } from '../src/common/password.util';

const prisma = new PrismaClient();
const email = 'demo@agilly.local';

async function main() {
  if (process.env.NODE_ENV !== 'development') {
    throw new Error(
      'Ce compte est réservé au développement. Définissez NODE_ENV=development pour continuer.',
    );
  }

  let user = await prisma.utilisateurs_cache.findUnique({ where: { email } });
  if (!user) {
    user = await prisma.utilisateurs_cache.create({
      data: {
        id_microsoft: 'dev-default-user',
        nom: 'Compte de démonstration',
        email,
        role: 'SALARIE',
        poste: 'Compte de développement',
        departement: 'Développement',
        updatedAt: new Date(),
      },
    });
  }

  const existingCredentials = await prisma.$queryRaw<Array<{ userId: string }>>`
    SELECT "userId"
    FROM "auth_credentials"
    WHERE "userId" = ${user.id_microsoft}
    LIMIT 1
  `;
  if (existingCredentials.length > 0) {
    throw new Error(
      'Le compte de démonstration existe déjà. Aucun mot de passe n’a été modifié.',
    );
  }

  const password = randomBytes(18).toString('base64url');
  const now = new Date();
  await prisma.$executeRaw`
    INSERT INTO "auth_credentials" ("userId", "passwordHash", "createdAt", "updatedAt")
    VALUES (${user.id_microsoft}, ${await hashPassword(password)}, ${now}, ${now})
  `;

  console.log(`Compte de développement créé : ${email}`);
  console.log(`Mot de passe initial (copiez-le maintenant) : ${password}`);
}

main()
  .catch((error) => {
    console.error('Échec de création du compte de développement :', error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
