import { Controller, Get, Patch, Post, Param, Headers, Query } from '@nestjs/common';
import { NotificationsService } from './notifications.service';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Get()
  async getMyNotifications(
    @Headers('x-user-id') userId?: string,
    @Query('limit') limit?: string,
  ) {
    const lim = limit ? parseInt(limit, 10) : 50;
    const notifications = await this.notificationsService.getMyNotifications(userId, lim);
    const unreadCount = await this.notificationsService.getUnreadCount(userId);
    return {
      notifications,
      unreadCount,
    };
  }

  @Get('unread-count')
  async getUnreadCount(@Headers('x-user-id') userId?: string) {
    const count = await this.notificationsService.getUnreadCount(userId);
    return { count };
  }

  @Patch(':id/read')
  async markAsRead(
    @Param('id') id: string,
    @Headers('x-user-id') userId?: string,
  ) {
    await this.notificationsService.markAsRead(id, userId);
    return { success: true };
  }

  @Post('read-all')
  async markAllAsRead(@Headers('x-user-id') userId?: string) {
    await this.notificationsService.markAllAsRead(userId);
    return { success: true };
  }
}

