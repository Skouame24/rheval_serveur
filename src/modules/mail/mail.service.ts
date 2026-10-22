import { Injectable, Logger } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);

  constructor(private mailerService: MailerService) {}

  /**
   * Envoi d'un e-mail de notification officiel Agilly RHEVAL
   * Tente en priorité Microsoft Graph si configuré, sinon SMTP, sinon log sécurisé.
   */
  async sendNotificationEmail(
    to: string,
    titre: string,
    message: string,
    lien?: string,
    recipientName?: string,
  ) {
    if (!to) {
      this.logger.warn('[MailService] Aucun destinataire fourni pour la notification.');
      return;
    }

    const frontendBaseUrl = (process.env.FRONTEND_URL || 'https://rheval.agilly.com').split(',')[0].trim();
    const actionUrl = lien ? `${frontendBaseUrl}${lien}` : `${frontendBaseUrl}/dashboard/mon-espace`;

    const htmlContent = `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <title>${titre}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1e293b;">
  <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f8fafc; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="100%" max-width="600" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; background-color: #ffffff; border: 1px solid #e2e8f0; border-top: 5px solid #F0822A; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);">
          <!-- En-tête -->
          <tr>
            <td style="padding: 28px 32px; border-bottom: 1px solid #f1f5f9;">
              <table width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td>
                    <span style="font-size: 20px; font-weight: 900; color: #0f172a; letter-spacing: -0.5px;">AGILLY</span>
                    <span style="font-size: 11px; font-weight: 800; color: #F0822A; text-transform: uppercase; margin-left: 8px; letter-spacing: 1px;">RHEVAL</span>
                  </td>
                  <td align="right">
                    <span style="display: inline-block; font-size: 10px; font-weight: 800; text-transform: uppercase; background-color: #FFF7ED; color: #EA580C; border: 1px solid #FFEDD5; padding: 4px 10px;">Notification RH</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Contenu -->
          <tr>
            <td style="padding: 32px;">
              <h2 style="margin: 0 0 16px 0; font-size: 18px; font-weight: 800; color: #0f172a; line-height: 1.3;">${titre}</h2>
              <p style="margin: 0 0 12px 0; font-size: 14px; color: #64748b;">Bonjour <strong>${recipientName || 'Collaborateur'}</strong>,</p>
              <div style="background-color: #f8fafc; border-left: 3px solid #F0822A; padding: 16px 20px; margin: 20px 0; font-size: 14px; line-height: 1.6; color: #334155;">
                ${message}
              </div>

              <!-- Bouton d'action -->
              <table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin: 32px 0 20px 0;">
                <tr>
                  <td align="center">
                    <a href="${actionUrl}" target="_blank" style="display: inline-block; background-color: #F0822A; color: #ffffff; text-decoration: none; font-size: 14px; font-weight: 700; padding: 12px 28px; border-radius: 0px; text-transform: uppercase; letter-spacing: 0.5px;">Accéder à mon espace</a>
                  </td>
                </tr>
              </table>
              <p style="font-size: 12px; color: #94a3b8; text-align: center; margin: 0;">
                Si le bouton ne fonctionne pas, copiez ce lien : <br>
                <a href="${actionUrl}" style="color: #F0822A; word-break: break-all;">${actionUrl}</a>
              </p>
            </td>
          </tr>

          <!-- Pied de page -->
          <tr>
            <td style="padding: 20px 32px; background-color: #f8fafc; border-top: 1px solid #f1f5f9; text-align: center; font-size: 11px; color: #94a3b8;">
              <p style="margin: 0 0 4px 0;">Ce message a été généré automatiquement par le <strong>Portail Agilly RHEVAL</strong>.</p>
              <p style="margin: 0;">Merci de ne pas répondre directement à cet e-mail.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `;

    // 1. Tenter Brevo SMTP en priorité absolue si configuré
    if (process.env.SMTP_USER && process.env.SMTP_PASS) {
      try {
        const fromAddress = process.env.SMTP_FROM || process.env.MAIL_FROM || '"Agilly RH" <b68c1a001@smtp-brevo.com>';
        await this.mailerService.sendMail({
          to,
          from: fromAddress,
          subject: `[Agilly RHEVAL] ${titre}`,
          html: htmlContent,
        });
        this.logger.log(`[MailService/Brevo-SMTP] ✉️ E-mail envoyé avec succès via Brevo SMTP à : ${to}`);
        return;
      } catch (err: any) {
        this.logger.error(`[MailService/Brevo-SMTP] Erreur d'envoi Brevo SMTP à ${to}: ${err?.message || err}`);
      }
    }

    // 2. Tenter Microsoft Graph en fallback si configuré
    const graphSent = await this.trySendViaGraph(to, titre, htmlContent);
    if (graphSent) {
      this.logger.log(`[MailService/Graph] ✉️ E-mail envoyé avec succès via Microsoft Graph à : ${to}`);
      return;
    }

    // 3. Mode développement / Log propre
    this.logger.log(`[MailService/Log] ✉️ Notification e-mail enregistrée pour ${to} : "${titre}"`);
  }

  /**
   * Vérifie la connexion SMTP Brevo
   */
  async verifySmtp(): Promise<{ ok: boolean; message: string; details?: any }> {
    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
      return { ok: false, message: 'SMTP_USER ou SMTP_PASS manquant dans .env' };
    }

    try {
      const transporter = (this.mailerService as any).transporter;
      if (transporter && typeof transporter.verify === 'function') {
        await transporter.verify();
        return { ok: true, message: 'Connexion SMTP Brevo opérationnelle' };
      }
      return { ok: true, message: 'Mailer initialisé' };
    } catch (err: any) {
      return {
        ok: false,
        message: err?.message || 'Erreur lors de la vérification SMTP',
        details: err?.response || err?.code || err,
      };
    }
  }

  /**
   * Tente d'envoyer un e-mail via l'API Microsoft Graph OAuth2
   */
  private async trySendViaGraph(to: string, subject: string, htmlContent: string): Promise<boolean> {
    const clientId = process.env.AZURE_AD_CLIENT_ID;
    const clientSecret = process.env.AZURE_AD_CLIENT_SECRET;
    const tenantId = process.env.AZURE_AD_TENANT_ID;
    const senderEmail = process.env.MAIL_FROM || 'rh@agilly.net';

    if (!clientId || !clientSecret || !tenantId) {
      return false;
    }

    try {
      // Obtenir le jeton OAuth2 Application depuis Azure AD
      const tokenUrl = `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`;
      const params = new URLSearchParams();
      params.append('client_id', clientId);
      params.append('client_secret', clientSecret);
      params.append('scope', 'https://graph.microsoft.com/.default');
      params.append('grant_type', 'client_credentials');

      const tokenRes = await fetch(tokenUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: params.toString(),
      });

      if (!tokenRes.ok) {
        this.logger.warn(`[MailService/Graph] Échec obtention token Graph (${tokenRes.status})`);
        return false;
      }

      const tokenData = await tokenRes.json();
      const accessToken = tokenData.access_token;

      // Envoyer le mail via Microsoft Graph
      const sendUrl = `https://graph.microsoft.com/v1.0/users/${senderEmail}/sendMail`;
      const mailBody = {
        message: {
          subject: `[Agilly RHEVAL] ${subject}`,
          body: {
            contentType: 'HTML',
            content: htmlContent,
          },
          toRecipients: [
            {
              emailAddress: {
                address: to,
              },
            },
          ],
        },
        saveToSentItems: 'true',
      };

      const sendRes = await fetch(sendUrl, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(mailBody),
      });

      if (sendRes.status === 202 || sendRes.status === 200) {
        return true;
      }

      const errText = await sendRes.text().catch(() => '');
      this.logger.warn(`[MailService/Graph] Graph sendMail code ${sendRes.status}: ${errText}`);
      return false;
    } catch (err: any) {
      this.logger.warn(`[MailService/Graph] Erreur inattendue Graph: ${err?.message || err}`);
      return false;
    }
  }

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
