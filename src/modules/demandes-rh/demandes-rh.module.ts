import { Module } from "@nestjs/common";
import { PrismaDemandesModule } from "../../prisma-demandes/prisma-demandes.module";
import { PrismaModule } from "../../prisma/prisma.module";
import { NotificationsModule } from "../notifications/notifications.module";

// Demandes
import { DemandesController } from "./demandes/demandes.controller";
import { DemandesService } from "./demandes/demandes.service";

// Validations
import { ValidationsController } from "./validations/validations.controller";
import { ValidationsService } from "./validations/validations.service";
import { DelegationsService } from "./validations/delegations.service";

// Soldes
import { SoldesController } from "./soldes/soldes.controller";
import { SoldesService } from "./soldes/soldes.service";

// Documents
import { DocumentsService } from "./documents/documents.service";

@Module({
  imports: [PrismaModule, PrismaDemandesModule, NotificationsModule],
  controllers: [
    DemandesController,
    ValidationsController,
    SoldesController,
  ],
  providers: [
    DemandesService,
    ValidationsService,
    DelegationsService,
    SoldesService,
    DocumentsService,
  ],
  exports: [
    DemandesService,
    ValidationsService,
    DelegationsService,
    SoldesService,
    DocumentsService,
  ],
})
export class DemandesRhModule {}

