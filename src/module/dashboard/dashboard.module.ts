import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Purchase } from '../purchase/entities/purchase.entity';
import { Requisition } from '../requisition/entities/requisition.entity';
import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Purchase, Requisition])],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}
