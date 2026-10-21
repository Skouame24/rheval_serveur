import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from "@nestjs/common";
import { PrismaClient } from "@prisma-demandes/client";

@Injectable()
export class PrismaDemandesService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(PrismaDemandesService.name);

  async onModuleInit() {
    try {
      await this.$connect();
      this.logger.log("🌿 Connexion établie avec la base de données dédiée aux Demandes RH (Absences & Congés)");
    } catch (err) {
      this.logger.error("Erreur de connexion à la base de données Demandes RH :", err);
    }
  }

  async onModuleDestroy() {
    await this.$disconnect();
    this.logger.log("Connexion base Demandes RH fermée.");
  }
}

