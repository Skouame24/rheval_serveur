import { Global, Module } from "@nestjs/common";
import { PrismaDemandesService } from "./prisma-demandes.service";

@Global()
@Module({
  providers: [PrismaDemandesService],
  exports: [PrismaDemandesService],
})
export class PrismaDemandesModule {}

