import { Injectable } from "@nestjs/common";
import { PrismaDemandesService } from "../../../prisma-demandes/prisma-demandes.service";

@Injectable()
export class DocumentsService {
  constructor(private readonly prisma: PrismaDemandesService) {}

  async genererNumeroDemande(annee: number = 2026): Promise<string> {
    const count = await this.prisma.demandes_rh.count();
    const seq = String(count + 1).padStart(5, "0");
    return `AGY-DEM-${annee}-${seq}`;
  }

  async genererNumeroTitre(annee: number = 2026): Promise<string> {
    const count = await this.prisma.demandes_rh.count({
      where: { numeroTitre: { not: null } },
    });
    const seq = String(count + 1).padStart(5, "0");
    return `AGY-PERM-${annee}-${seq}`;
  }
}
