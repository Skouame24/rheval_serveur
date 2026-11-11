import { PrismaClient } from '@prisma/client';

let cachedHierarchy: { map: Map<string, string[]>; timestamp: number } | null = null;

export function invalidateHierarchyCache() {
  cachedHierarchy = null;
}

/**
 * Récupère récursivement tous les IDs des subordonnés (directs et indirects) d'un manager.
 * Optimisé avec cache en mémoire pour éviter des requêtes séquentielles réseau répétées.
 */
export async function getSubordinateIds(prisma: any, managerId: string): Promise<string[]> {
  const now = Date.now();
  if (!cachedHierarchy || now - cachedHierarchy.timestamp > 60_000) {
    const allUsers = await prisma.utilisateurs_cache.findMany({
      select: { id_microsoft: true, managerId: true },
    });
    const map = new Map<string, string[]>();
    for (const u of allUsers) {
      if (u.managerId) {
        if (!map.has(u.managerId)) map.set(u.managerId, []);
        map.get(u.managerId)!.push(u.id_microsoft);
      }
    }
    cachedHierarchy = { map, timestamp: now };
  }

  const result: string[] = [];
  const queue: string[] = [managerId];
  const visited = new Set<string>();

  while (queue.length > 0) {
    const current = queue.shift()!;
    if (visited.has(current)) continue;
    visited.add(current);

    const subs = cachedHierarchy.map.get(current) || [];
    for (const subId of subs) {
      result.push(subId);
      queue.push(subId);
    }
  }

  return result;
}
