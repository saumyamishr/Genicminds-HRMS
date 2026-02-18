import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('dashboard')
export class DashboardController {

  @UseGuards(AuthGuard('jwt'))
  @Get()
  getDashboard() {
    return {
      message: 'Welcome to Genicminds HRMS Dashboard'
    };
  }
}
