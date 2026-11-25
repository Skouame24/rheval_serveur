import { Module } from '@nestjs/common';
import { ObjectivesController } from './objectives.controller';
import { ObjectivesService } from './objectives.service';

import { NotificationsModule } from '../notifications/notifications.module';
import { EvaluationsAccesService } from '../evaluations/evaluations-acces.service';

@Module({
  imports: [NotificationsModule],
  controllers: [ObjectivesController],
  providers: [ObjectivesService, EvaluationsAccesService],
  exports: [ObjectivesService],
})
export class ObjectivesModule {}
