import { Module } from '@nestjs/common';
import { EvaluationsController } from './evaluations.controller';
import { EvaluationsService } from './evaluations.service';
import { EvaluationsCronService } from './evaluations-cron.service';
import { NotificationsModule } from '../notifications/notifications.module';

@Module({
  imports: [NotificationsModule],
  controllers: [EvaluationsController],
  providers: [EvaluationsService, EvaluationsCronService],
  exports: [EvaluationsService, EvaluationsCronService],
})
export class EvaluationsModule {}
