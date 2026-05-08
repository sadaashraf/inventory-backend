import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Requisition } from './entities/requisition.entity';
import { RequisitionItem } from './entities/requisition-item.entity';
import { Department } from '../department/entities/department.entity';
import { RequisitionService } from './requisition.service';
import { RequisitionController } from './requisition.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Requisition, RequisitionItem, Department])],
  controllers: [RequisitionController],
  providers: [RequisitionService],
  exports: [TypeOrmModule],
})
export class RequisitionModule {}
