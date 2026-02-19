import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';
import { Employee } from 'src/employees/entities/employee.entity';
import { Department } from 'src/admin/entities/department.entity';
import { LeaveRequest } from 'src/leave/entities/leave-request.entity';
import { Attendance } from 'src/attendance/entities/attendance.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Employee,
      Department,
      LeaveRequest,
      Attendance,
    ]),
  ],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}
