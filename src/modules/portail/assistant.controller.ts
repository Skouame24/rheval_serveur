import { BadRequestException, Body, Controller, Get, Post } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Roles, UtilisateurCourant } from '../../common/auth/auth.decorators';
import { ROLES_PILOTAGE_RH, type UtilisateurAuth } from '../../common/auth/auth.constants';

/** Avis 👍/👎 sur l'assistant Agil : la RH voit quelles réponses améliorer */
@Controller('portail/assistant')
export class AssistantController {
  constructor(private readonly prisma: PrismaService) {}

  @Post('avis')
  async donnerAvis(
    @UtilisateurCourant() u: UtilisateurAuth,
    @Body() body: { entreeId?: string | null; question?: string; utile?: boolean },
  ) {
    const question = (body?.question ?? '').toString().trim().slice(0, 500);
    if (!question || typeof body?.utile !== 'boolean') throw new BadRequestException('Avis incomplet.');
    await this.prisma.avis_assistant.create({
      data: {
        userId: u.id,
        entreeId: body.entreeId ? String(body.entreeId).slice(0, 100) : null,
        question,
        utile: body.utile,
      },
    });
    return { success: true };
  }

  /** Synthèse par entrée de FAQ (90 derniers jours) + dernières questions non comprises */
  @Roles(...ROLES_PILOTAGE_RH)
  @Get('avis/synthese')
  async synthese() {
    const depuis = new Date(Date.now() - 90 * 24 * 3600 * 1000);
    const [parEntree, nonComprises] = await Promise.all([
      this.prisma.avis_assistant.groupBy({
        by: ['entreeId', 'utile'],
        where: { createdAt: { gte: depuis }, entreeId: { not: null } },
        _count: true,
      }),
      this.prisma.avis_assistant.findMany({
        where: { createdAt: { gte: depuis }, entreeId: null },
        orderBy: { createdAt: 'desc' },
        take: 50,
        select: { question: true, createdAt: true },
      }),
    ]);
    const entrees: Record<string, { utiles: number; inutiles: number }> = {};
    for (const l of parEntree) {
      const e = (entrees[l.entreeId as string] ??= { utiles: 0, inutiles: 0 });
      if (l.utile) e.utiles += l._count;
      else e.inutiles += l._count;
    }
    return { entrees, nonComprises };
  }
}
