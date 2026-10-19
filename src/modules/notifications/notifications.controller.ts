import { Controller, Get, Patch, Post, Param, Headers, Query } from '@nestjs/common';
import { NotificationsService } from './notifications.service';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Get()
  async getMyNotifications(
    @Headers('x-user-id') userId?: string,
    @Headers('x-user-email') userEmail?: string,
    @Query('limit') limit?: string,
  ) {
    const effectiveUserId = userId || userEmail;
    const lim = limit ? parseInt(limit, 10) : 50;
    const notifications = await this.notificationsService.getMyNotifications(effectiveUserId, lim);
    const unreadCount = await this.notificationsService.getUnreadCount(effectiveUserId);
    return {
      notifications,
      unreadCount,
    };
  }

  @Get('unread-count')
  async getUnreadCount(
    @Headers('x-user-id') userId?: string,
    @Headers('x-user-email') userEmail?: string,
  ) {
    const effectiveUserId = userId || userEmail;
    const count = await this.notificationsService.getUnreadCount(effectiveUserId);
    return { count };
  }

  @Patch(':id/read')
  async markAsRead(
    @Param('id') id: string,
    @Headers('x-user-id') userId?: string,
    @Headers('x-user-email') userEmail?: string,
  ) {
    const effectiveUserId = userId || userEmail;
    await this.notificationsService.markAsRead(id, effectiveUserId);
    return { success: true };
  }

  @Post('read-all')
  async markAllAsRead(
    @Headers('x-user-id') userId?: string,
    @Headers('x-user-email') userEmail?: string,
  ) {
    const effectiveUserId = userId || userEmail;
    await this.notificationsService.markAllAsRead(effectiveUserId);
    return { success: true };
  }
}

