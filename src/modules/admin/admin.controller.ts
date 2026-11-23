import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { AdminService } from './admin.service';
import { Roles } from '../../common/auth/auth.decorators';
import { ROLES_ADMIN, ROLES_PILOTAGE_RH } from '../../common/auth/auth.constants';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('users')
  async getAllUsers() {
    return this.adminService.getAllUsers();
  }

  @Roles(...ROLES_ADMIN)
  @Post('users')
  async createUser(@Body() body: any) {
    return this.adminService.createUser(body);
  }

  @Roles(...ROLES_ADMIN)
  @Put('users/:id')
  async updateUser(@Param('id') id: string, @Body() body: any) {
    return this.adminService.updateUser(id, body);
  }

  @Roles(...ROLES_ADMIN)
  @Delete('users/:id')
  async deleteUser(@Param('id') id: string) {
    return this.adminService.deleteUser(id);
  }

  @Roles(...ROLES_ADMIN)
  @Get('audit-logs')
  async getAuditLogs() {
    return this.adminService.getAuditLogs();
  }
}
