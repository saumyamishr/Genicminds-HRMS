import { IsString, IsOptional, IsNumber, IsEnum, IsDate, IsEmail } from 'class-validator';
import { Type } from 'class-transformer';

export enum EmployeeStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  ON_LEAVE = 'onLeave',
  TERMINATED = 'terminated',
  SUSPENDED = 'suspended'
}

export enum EmploymentType {
  FULL_TIME = 'Full Time',
  PART_TIME = 'Part Time',
  CONTRACT = 'Contract',
  INTERN = 'Intern'
}

export class CreateEmployeeDto {
  @IsString()
  employeeId: string;

  @IsString()
  firstName: string;

  @IsOptional()
  @IsString()
  middleName?: string;

  @IsString()
  lastName: string;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  dateOfBirth?: Date;

  @IsOptional()
  @IsString()
  gender?: string;

  @IsOptional()
  @IsString()
  maritalStatus?: string;

  @IsOptional()
  @IsString()
  nationality?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  emergencyContact?: string;

  @IsOptional()
  @IsString()
  bloodGroup?: string;

  @IsOptional()
  @IsString()
  panNumber?: string;

  @IsOptional()
  @IsString()
  aadharNumber?: string;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  hireDate?: Date;

  @IsOptional()
  @IsNumber()
  salary?: number;

  @IsOptional()
  @IsEnum(EmploymentType)
  employmentType?: EmploymentType;

  @IsOptional()
  @IsString()
  workLocation?: string;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  probationEndDate?: Date;

  @IsOptional()
  @IsNumber()
  managerId?: number;

  @IsOptional()
  @IsEnum(EmployeeStatus)
  status?: EmployeeStatus;

  @IsNumber()
  departmentId: number;

  @IsNumber()
  jobTitleId: number;

  // Document fields
  @IsOptional()
  @IsString()
  resume?: string;

  @IsOptional()
  @IsString()
  offerLetter?: string;

  @IsOptional()
  @IsString()
  idProof?: string;

  @IsOptional()
  @IsString()
  addressProof?: string;

  @IsOptional()
  @IsString()
  educationDocs?: string;

  @IsOptional()
  @IsString()
  experienceDocs?: string;
}