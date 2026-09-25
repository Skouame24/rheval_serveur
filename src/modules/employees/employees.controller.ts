import { Controller, Get, Post, Param, Headers } from '@nestjs/common';
import { EmployeesService } from './employees.service';

@Controller()
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Get('employees/me')
  async getMe(@Headers('x-user-id') userId?: string) {
    return this.employeesService.getMe(userId);
  }

  @Get('employees/n2-subordinates')
  async getN2Subordinates(@Headers('x-user-id') n2Id?: string) {
    return this.employeesService.getN2Subordinates(n2Id);
  }

  @Get('n1/collaborateurs')
  async getMyTeam(@Headers('x-user-id') managerId?: string) {
    return this.employeesService.getMyTeam(managerId);
  }

  @Get('employees/:id')
  async getById(@Param('id') id: string) {
    return this.employeesService.getById(id);
  }

  @Get('admin/users')
  async getAllUsers() {
    return this.employeesService.getAllUsers();
  }

  @Post('admin/sync-entra-directory')
  async syncEntraDirectory() {
    return this.employeesService.syncEntraDirectory();
  }
}
