import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { Employee } from 'src/employees/entities/employee.entity';
import { Department } from 'src/admin/entities/department.entity';
import { LeaveRequest, LeaveStatus } from 'src/leave/entities/leave-request.entity';
import { Attendance } from 'src/attendance/entities/attendance.entity';

@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(Employee)
    private employeeRepo: Repository<Employee>,

    @InjectRepository(Department)
    private departmentRepo: Repository<Department>,

    @InjectRepository(LeaveRequest)
    private leaveRepo: Repository<LeaveRequest>,

    @InjectRepository(Attendance)
    private attendanceRepo: Repository<Attendance>,
  ) {}

  async getDashboardStats() {
    // Total Employees
    const totalEmployees = await this.employeeRepo.count();

    // Total Departments
    const totalDepartments = await this.departmentRepo.count();

    // Pending Leaves
    const pendingLeaves = await this.leaveRepo.count({
      where: { status: LeaveStatus.PENDING },
    });

    // Today date range
    const start = new Date();
    start.setHours(0, 0, 0, 0);

    const end = new Date();
    end.setHours(23, 59, 59, 999);

    // Today's Present
    const todayPresent = await this.attendanceRepo.count({
      where: {
        checkIn: Between(start, end),
      },
    });

    const todayAbsent = totalEmployees - todayPresent;

    return {
      totalEmployees,
      totalDepartments,
      pendingLeaves,
      todayPresent,
      todayAbsent,
    };
  }

    async getLeaveDistribution() {
    const data = await this.leaveRepo
        .createQueryBuilder('leave')
        .leftJoin('leave.leaveType', 'leaveType')
        .select('leaveType.name', 'leaveType')
        .addSelect('COUNT(leave.id)', 'count')
        .groupBy('leaveType.name')
        .getRawMany();

    return data;
    }

    async getMonthlyAttendanceTrend() {
    const data = await this.attendanceRepo
        .createQueryBuilder('attendance')
        .select('YEAR(attendance.checkIn)', 'year')
        .addSelect('MONTH(attendance.checkIn)', 'month')
        .addSelect('COUNT(attendance.id)', 'presentCount')
        .groupBy('year')
        .addGroupBy('month')
        .orderBy('year', 'ASC')
        .addOrderBy('month', 'ASC')
        .getRawMany();

    return data;
    }
}
