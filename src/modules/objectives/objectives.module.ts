import { Module } from '@nestjs/common';
import { ObjectivesController } from './objectives.controller';
import { ObjectivesService } from './objectives.service';

import { NotificationsModule } from '../notifications/notifications.module';

@Module({
  imports: [NotificationsModule],
  controllers: [ObjectivesController],
  providers: [ObjectivesService],
  exports: [ObjectivesService],
})
export class ObjectivesModule {}
