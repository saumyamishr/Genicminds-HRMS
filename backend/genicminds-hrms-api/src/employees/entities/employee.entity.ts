import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Department } from 'src/admin/entities/department.entity';
import { JobTitle } from 'src/admin/entities/job-title.entity';
import { BaseEntity } from 'src/common/entities/base.entity';

@Entity('employees')
export class Employee extends BaseEntity {
  @Column({ unique: true })
  employeeId: string;

  @Column()
  firstName: string;

  @Column({ nullable: true })
  middleName: string;

  @Column()
  lastName: string;

  @Column({ nullable: true })
  dateOfBirth: Date;

  @Column({ nullable: true })
  gender: string;

  @Column({ nullable: true })
  maritalStatus: string;

  @Column({ nullable: true })
  nationality: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  emergencyContact: string;

  @Column({ nullable: true })
  bloodGroup: string;

  @Column({ nullable: true })
  panNumber: string;

  @Column({ nullable: true })
  aadharNumber: string;

  @Column({ nullable: true })
  hireDate: Date;

  @Column({ nullable: true })
  salary: number;

  @Column({ nullable: true })
  employmentType: string; // Full Time, Part Time, Contract, Intern

  @Column({ nullable: true })
  workLocation: string;

  @Column({ nullable: true })
  probationEndDate: Date;

  @Column({ nullable: true })
  managerId: number;

  @Column({ 
    type: 'enum',
    enum: ['active', 'inactive', 'onLeave', 'terminated', 'suspended'],
    default: 'active'
  })
  status: string;

  @ManyToOne(() => Department)
  @JoinColumn({ name: 'departmentId' })
  department: Department;

  @Column({ nullable: true })
  departmentId: number;

  @ManyToOne(() => JobTitle)
  @JoinColumn({ name: 'jobTitleId' })
  jobTitle: JobTitle;

  @Column({ nullable: true })
  jobTitleId: number;

  // Document fields
  @Column({ nullable: true })
  resume: string;

  @Column({ nullable: true })
  offerLetter: string;

  @Column({ nullable: true })
  idProof: string;

  @Column({ nullable: true })
  addressProof: string;

  @Column({ nullable: true })
  educationDocs: string;

  @Column({ nullable: true })
  experienceDocs: string;

  // Audit fields
  @Column({ nullable: true })
  createdBy: number;

  @Column({ nullable: true })
  updatedBy: number;
}