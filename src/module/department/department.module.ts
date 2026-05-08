import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Department } from './entities/department.entity';
import { DepartmentService } from './department.service';
import { DepartmentController } from './department.controller';
import { Requisition } from '../requisition/entities/requisition.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Department, Requisition])],
  controllers: [DepartmentController],
  providers: [DepartmentService],
  exports: [TypeOrmModule],
})
export class DepartmentModule {}
