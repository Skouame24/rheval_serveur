import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { EmployeesModule } from './modules/employees/employees.module';
import { CyclesModule } from './modules/cycles/cycles.module';
import { ObjectivesModule } from './modules/objectives/objectives.module';
import { EvaluationsModule } from './modules/evaluations/evaluations.module';
import { RhModule } from './modules/rh/rh.module';
import { AdminModule } from './modules/admin/admin.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    EmployeesModule,
    CyclesModule,
    ObjectivesModule,
    EvaluationsModule,
    RhModule,
    AdminModule,
  ],
})
export class AppModule {}
