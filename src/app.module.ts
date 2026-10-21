import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { PrismaDemandesModule } from './prisma-demandes/prisma-demandes.module';
import { AuthModule } from './modules/auth/auth.module';
import { EmployeesModule } from './modules/employees/employees.module';
import { CyclesModule } from './modules/cycles/cycles.module';
import { ObjectivesModule } from './modules/objectives/objectives.module';
import { EvaluationsModule } from './modules/evaluations/evaluations.module';
import { RhModule } from './modules/rh/rh.module';
import { AdminModule } from './modules/admin/admin.module';
import { MailModule } from './modules/mail/mail.module';
import { NotificationsModule } from './modules/notifications/notifications.module';
import { DemandesRhModule } from './modules/demandes-rh/demandes-rh.module';

@Module({
  imports: [
    PrismaModule,
    PrismaDemandesModule,
    AuthModule,
    EmployeesModule,
    CyclesModule,
    ObjectivesModule,
    EvaluationsModule,
    RhModule,
    AdminModule,
    MailModule,
    NotificationsModule,
    DemandesRhModule,
  ],
})
export class AppModule {}
