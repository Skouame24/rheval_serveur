import { Controller, Post, Get, Body, Logger } from '@nestjs/common';
import { MailService } from './mail.service';

@Controller('mail')
export class MailController {
  private readonly logger = new Logger(MailController.name);

  constructor(private readonly mailService: MailService) {}

  @Get('status')
  async getStatus() {
    return this.mailService.verifySmtp();
  }

  @Post('test')
  async sendTestMail(@Body() body: { to: string; subject?: string; message?: string }) {
    const to = body.to || 'b68c1a001@smtp-brevo.com';
    const subject = body.subject || 'Test Brevo SMTP Agilly RHEVAL';
    const message =
      body.message ||
      'Ceci est un email de test confirmant que la passerelle Brevo SMTP fonctionne correctement sur le portail Agilly RH.';

    await this.mailService.sendNotificationEmail(to, subject, message);
    return {
      success: true,
      message: `E-mail de notification déclenché vers ${to}`,
    };
  }
}

