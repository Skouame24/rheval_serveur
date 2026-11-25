import { Module } from '@nestjs/common';
import { EvaluationsController } from './evaluations.controller';
import { EvaluationsService } from './evaluations.service';
import { EvaluationsCronService } from './evaluations-cron.service';
import { NotificationsModule } from '../notifications/notifications.module';
import { EvaluationsAccesService } from './evaluations-acces.service';

@Module({
  imports: [NotificationsModule],
  controllers: [EvaluationsController],
  providers: [EvaluationsService, EvaluationsCronService, EvaluationsAccesService],
  exports: [EvaluationsService, EvaluationsCronService, EvaluationsAccesService],
})
export class EvaluationsModule {}
