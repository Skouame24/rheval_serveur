import { Body, Controller, Get, Patch, Post, Put, Param, Headers, Query } from '@nestjs/common';
import { UtilisateurCourant } from '../../common/auth/auth.decorators';
import type { UtilisateurAuth } from '../../common/auth/auth.constants';
import { NotificationsService, lireApplications } from './notifications.service';

/**
 * Notifications de l'écosystème Agilly.
 * Paramètre optionnel `application` (ex. "rheval" ou "absences,missions")
 * pour limiter la lecture / le marquage à une ou plusieurs applications.
 *
 * x-user-id est réécrit par le garde global avec l'identité vérifiée.
 */
@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Get()
  async getMyNotifications(
    @Headers('x-user-id') userId?: string,
    @Headers('x-user-email') userEmail?: string,
    @Query('limit') limit?: string,
    @Query('application') application?: string,
  ) {
    const effectiveUserId = userId || userEmail;
    const applications = lireApplications(application);
    const lim = limit ? parseInt(limit, 10) || 50 : 50;
    const [notifications, unreadCount] = await Promise.all([
      this.notificationsService.getMyNotifications(effectiveUserId, lim, applications),
      this.notificationsService.getUnreadCount(effectiveUserId, applications),
    ]);
    return { notifications, unreadCount };
  }

  @Get('unread-count')
  async getUnreadCount(
    @Headers('x-user-id') userId?: string,
    @Headers('x-user-email') userEmail?: string,
    @Query('application') application?: string,
  ) {
    const count = await this.notificationsService.getUnreadCount(userId || userEmail, lireApplications(application));
    return { count };
  }

  /** Non lues par application : { total, parApplication: { rheval: 2, absences: 1 } } */
  @Get('summary')
  async getSummary(
    @Headers('x-user-id') userId?: string,
    @Headers('x-user-email') userEmail?: string,
  ) {
    const parApplication = await this.notificationsService.getUnreadSummary(userId || userEmail);
    const total = Object.values(parApplication).reduce((a, b) => a + b, 0);
    return { total, parApplication };
  }

  @Patch(':id/read')
  async markAsRead(
    @Param('id') id: string,
    @Headers('x-user-id') userId?: string,
    @Headers('x-user-email') userEmail?: string,
  ) {
    const count = await this.notificationsService.markAsRead(id, userId || userEmail);
    return { success: count > 0, count };
  }

  @Post('read-all')
  async markAllAsRead(
    @Headers('x-user-id') userId?: string,
    @Headers('x-user-email') userEmail?: string,
    @Query('application') application?: string,
  ) {
    const count = await this.notificationsService.markAllAsRead(userId || userEmail, lireApplications(application));
    return { success: true, count };
  }

  /** Préférences d'e-mail par application : { rheval: 'IMMEDIAT', absences: 'QUOTIDIEN', … } */
  @Get('preferences')
  getPreferences(@UtilisateurCourant() u: UtilisateurAuth) {
    return this.notificationsService.getPreferences(u.id);
  }

  @Put('preferences')
  setPreference(@UtilisateurCourant() u: UtilisateurAuth, @Body() body: { application?: string; email?: string }) {
    return this.notificationsService.setPreference(u.id, body?.application ?? '', body?.email ?? '');
  }
}
