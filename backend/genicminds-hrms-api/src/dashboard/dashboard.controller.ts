import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { DashboardService } from './dashboard.service';

@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  // Main dashboard stats
  @UseGuards(AuthGuard('jwt'))
  @Get()
  async getDashboard() {
    return this.dashboardService.getDashboardStats();
  }

  // Analytics endpoint
  @UseGuards(AuthGuard('jwt'))
  @Get('analytics')
  async getAnalytics() {
    const leaveDistribution =
      await this.dashboardService.getLeaveDistribution();

    const monthlyAttendance =
      await this.dashboardService.getMonthlyAttendanceTrend();

    return {
      leaveDistribution,
      monthlyAttendance,
    };
  }
}
