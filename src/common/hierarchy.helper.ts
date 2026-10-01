import { PrismaClient } from '@prisma/client';

/**
 * Récupère récursivement tous les IDs des subordonnés (directs et indirects) d'un manager.
 */
export async function getSubordinateIds(prisma: any, managerId: string): Promise<string[]> {
  const result: string[] = [];
  const queue: string[] = [managerId];
  const visited = new Set<string>();

  while (queue.length > 0) {
    const current = queue.shift()!;
    if (visited.has(current)) continue;
    visited.add(current);

    const directSubordinates = await prisma.utilisateurs_cache.findMany({
      where: { managerId: current },
      select: { id_microsoft: true },
    });

    for (const sub of directSubordinates) {
      result.push(sub.id_microsoft);
      queue.push(sub.id_microsoft);
    }
  }

  return result;
}
