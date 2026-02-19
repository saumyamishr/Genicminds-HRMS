import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from './entities/employee.entity';
import { Department } from 'src/admin/entities/department.entity';
import { JobTitle } from 'src/admin/entities/job-title.entity';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepo: Repository<Employee>,

    @InjectRepository(Department)
    private readonly departmentRepo: Repository<Department>,

    @InjectRepository(JobTitle)
    private readonly jobTitleRepo: Repository<JobTitle>,
  ) {}

  async findAll() {
    return this.employeeRepo.find({
      relations: ['department', 'jobTitle'],
      order: { createdAt: 'DESC' }
    });
  }

  async findOne(id: number) {
    const employee = await this.employeeRepo.findOne({
      where: { id },
      relations: ['department', 'jobTitle']
    });

    if (!employee) {
      throw new NotFoundException(`Employee with ID ${id} not found`);
    }

    return employee;
  }

  async create(dto: CreateEmployeeDto) {
    // Check if employee ID already exists
    const existingEmployee = await this.employeeRepo.findOne({
      where: { employeeId: dto.employeeId }
    });

    if (existingEmployee) {
      throw new BadRequestException('Employee ID already exists');
    }

    // Verify department exists
    const department = await this.departmentRepo.findOne({
      where: { id: dto.departmentId }
    });

    if (!department) {
      throw new BadRequestException('Department not found');
    }

    // Verify job title exists
    const jobTitle = await this.jobTitleRepo.findOne({
      where: { id: dto.jobTitleId }
    });

    if (!jobTitle) {
      throw new BadRequestException('Job title not found');
    }

    const employee = this.employeeRepo.create({
      ...dto,
      department,
      jobTitle,
    });

    return this.employeeRepo.save(employee);
  }

  async update(id: number, dto: UpdateEmployeeDto) {
    const employee = await this.findOne(id);

    // If department is being updated, verify it exists
    if (dto.departmentId) {
      const department = await this.departmentRepo.findOne({
        where: { id: dto.departmentId }
      });
      if (!department) {
        throw new BadRequestException('Department not found');
      }
      employee.department = department;
    }

    // If job title is being updated, verify it exists
    if (dto.jobTitleId) {
      const jobTitle = await this.jobTitleRepo.findOne({
        where: { id: dto.jobTitleId }
      });
      if (!jobTitle) {
        throw new BadRequestException('Job title not found');
      }
      employee.jobTitle = jobTitle;
    }

    // Update other fields
    Object.assign(employee, dto);

    return this.employeeRepo.save(employee);
  }

  async remove(id: number) {
    const employee = await this.findOne(id);
    return this.employeeRepo.remove(employee);
  }

  async updateStatus(id: number, status: string) {
    const employee = await this.findOne(id);
    employee.status = status;
    return this.employeeRepo.save(employee);
  }

  async getStats() {
    const total = await this.employeeRepo.count();
    const active = await this.employeeRepo.count({ where: { status: 'active' } });
    const onLeave = await this.employeeRepo.count({ where: { status: 'onLeave' } });
    const departments = await this.employeeRepo
      .createQueryBuilder('employee')
      .select('COUNT(DISTINCT employee.departmentId)', 'count')
      .getRawOne();

    return {
      total,
      active,
      onLeave,
      departments: parseInt(departments.count) || 0
    };
  }
}