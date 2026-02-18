import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { Department } from './entities/department.entity';
import { JobTitle } from './entities/job-title.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Department, JobTitle])],
  controllers: [AdminController],
  providers: [AdminService]
})
export class AdminModule {}
