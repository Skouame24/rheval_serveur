import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthGuard } from '../../common/auth/auth.guard';
import { secretApi } from '../../common/auth/auth.constants';

@Module({
  imports: [
    // Secret obligatoire : l'API refuse de démarrer sans AGILLY_API_SECRET
    JwtModule.registerAsync({
      useFactory: () => ({ secret: secretApi() }),
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    // Garde global : toutes les routes exigent un jeton signé par le portail (sauf @Public)
    { provide: APP_GUARD, useClass: AuthGuard },
  ],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
