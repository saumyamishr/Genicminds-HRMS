import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeesController } from './employees.controller';
import { EmployeesService } from './employees.service';
import { Employee } from './entities/employee.entity';
import { Department } from '../admin/entities/department.entity';
import { JobTitle } from '../admin/entities/job-title.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Employee, Department, JobTitle])
  ],
  controllers: [EmployeesController],
  providers: [EmployeesService],
  exports: [EmployeesService]
})
export class EmployeesModule {}