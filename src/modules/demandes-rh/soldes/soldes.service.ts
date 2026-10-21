import { Injectable, NotFoundException, BadRequestException } from "@nestjs/common";
import { PrismaDemandesService } from "../../../prisma-demandes/prisma-demandes.service";
import { AjusterSoldeDto } from "./dto/ajuster-solde.dto";

@Injectable()
export class SoldesService {
  constructor(private readonly prisma: PrismaDemandesService) {}

  async getSoldeSalarie(salarieId: string, annee: number = 2026) {
    let solde = await this.prisma.soldes_conges.findUnique({
      where: {
        salarieId_annee: {
          salarieId,
          annee,
        },
      },
    });

    if (!solde) {
      // Auto-création initiale
      solde = await this.prisma.soldes_conges.create({
        data: {
          salarieId,
          annee,
          joursAcquis: 26.0,
          joursPris: 0.0,
          joursEnAttente: 0.0,
          reliquatN1: 0.0,
        },
      });
    }

    const acquis = Number(solde.joursAcquis) + Number(solde.reliquatN1);
    const pris = Number(solde.joursPris);
    const enAttente = Number(solde.joursEnAttente);
    const soldeRestantNet = Math.max(0, acquis - pris - enAttente);

    return {
      ...solde,
      totalDroits: acquis,
      soldeRestantNet,
    };
  }

  async getAllSoldes(annee: number = 2026) {
    const list = await this.prisma.soldes_conges.findMany({
      where: { annee },
    });

    return list.map((s) => {
      const acquis = Number(s.joursAcquis) + Number(s.reliquatN1);
      const pris = Number(s.joursPris);
      const enAttente = Number(s.joursEnAttente);
      return {
        ...s,
        totalDroits: acquis,
        soldeRestantNet: Math.max(0, acquis - pris - enAttente),
      };
    });
  }

  async reserverJours(salarieId: string, nbJours: number, annee: number = 2026) {
    const solde = await this.getSoldeSalarie(salarieId, annee);
    if (solde.soldeRestantNet < nbJours) {
      throw new BadRequestException(
        `Solde de congés insuffisant : solde net disponible de ${solde.soldeRestantNet} jour(s) pour une demande de ${nbJours} jour(s).`
      );
    }

    await this.prisma.soldes_conges.update({
      where: {
        salarieId_annee: {
          salarieId,
          annee,
        },
      },
      data: {
        joursEnAttente: {
          increment: nbJours,
        },
      },
    });
  }

  async libererJours(salarieId: string, nbJours: number, annee: number = 2026) {
    await this.prisma.soldes_conges.update({
      where: {
        salarieId_annee: {
          salarieId,
          annee,
        },
      },
      data: {
        joursEnAttente: {
          decrement: nbJours,
        },
      },
    });
  }

  async debiterJoursDefinitif(salarieId: string, nbJours: number, annee: number = 2026) {
    await this.prisma.soldes_conges.update({
      where: {
        salarieId_annee: {
          salarieId,
          annee,
        },
      },
      data: {
        joursEnAttente: {
          decrement: nbJours,
        },
        joursPris: {
          increment: nbJours,
        },
      },
    });
  }

  async ajusterSolde(salarieId: string, dto: AjusterSoldeDto, drhId: string, annee: number = 2026) {
    const updated = await this.prisma.soldes_conges.update({
      where: {
        salarieId_annee: {
          salarieId,
          annee,
        },
      },
      data: {
        joursAcquis: dto.joursAcquis,
        ...(dto.reliquatN1 !== undefined ? { reliquatN1: dto.reliquatN1 } : {}),
      },
    });

    return updated;
  }
}
