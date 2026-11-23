import { Module } from '@nestjs/common';
import { AnniversairesController } from './anniversaires.controller';
import { AssistantController } from './assistant.controller';
import { AnniversairesService } from './anniversaires.service';

/** Données propres au portail Agilly (anniversaires, avis sur l'assistant…), communes à toutes les applications */
@Module({
  controllers: [AnniversairesController, AssistantController],
  providers: [AnniversairesService],
})
export class PortailModule {}
