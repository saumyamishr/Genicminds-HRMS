import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm';
import { LeaveRequest } from './leave-request.entity';

@Entity()
export class LeaveType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string; // e.g., Annual Leave, Sick Leave

  @Column({ nullable: true })
  description: string;

  @Column()
  totalDaysAllowed: number;

  @OneToMany(() => LeaveRequest, (leave) => leave.leaveType)
  leaveRequests: LeaveRequest[];
}
