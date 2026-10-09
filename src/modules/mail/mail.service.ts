import { Injectable, Logger } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);

  constructor(private mailerService: MailerService) {}

  async sendMail(to: string, subject: string, template: string, context: any) {
    try {
      await this.mailerService.sendMail({
        to,
        subject,
        template, 
        context,
      });
      this.logger.log(`Mail envoyé à ${to}`);
    } catch (error) {
      this.logger.error(`Erreur d'envoi de mail à ${to}`, error);
    }
  }
}
