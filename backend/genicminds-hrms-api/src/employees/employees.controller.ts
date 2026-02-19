import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
  Patch,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { EmployeesService } from './employees.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

@Controller('employees')
@UseGuards(AuthGuard('jwt'))
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Get()
  findAll() {
    return this.employeesService.findAll();
  }

  @Get('stats')
  getStats() {
    return this.employeesService.getStats();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.employeesService.findOne(+id);
  }

  @Post()
  create(@Body() dto: CreateEmployeeDto) {
    return this.employeesService.create(dto);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() dto: UpdateEmployeeDto) {
    return this.employeesService.update(+id, dto);
  }

  @Patch(':id/status')
  updateStatus(@Param('id') id: number, @Body('status') status: string) {
    return this.employeesService.updateStatus(+id, status);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.employeesService.remove(+id);
  }
}