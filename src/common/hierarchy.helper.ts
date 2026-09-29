export async function getSubordinateIds(prisma: any, managerId: string): Promise<string[]> {
  const visited = new Set<string>();
  let currentLevel = [managerId];

  while (currentLevel.length > 0) {
    const nextLevelUsers = await prisma.utilisateurs_cache.findMany({
      where: { managerId: { in: currentLevel } },
      select: { id_microsoft: true },
    });
    const nextIds = nextLevelUsers
      .map((u: any) => u.id_microsoft)
      .filter((id: string) => !visited.has(id) && id !== managerId);

    if (nextIds.length === 0) break;
    for (const id of nextIds) {
      visited.add(id);
    }
    currentLevel = nextIds;
  }

  return Array.from(visited);
}
