import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sync-session')
  async syncSession(@Body() body: any) {
    return this.authService.syncSession(body);
  }

  @Post('login')
  async login(@Body() body: { email: string; password?: string }) {
    return this.authService.login(body.email);
  }

  @Post('azure-ad')
  async loginAzureAd(@Body() body: { accessToken?: string }) {
    return this.authService.loginAzureAd(body.accessToken);
  }
}
