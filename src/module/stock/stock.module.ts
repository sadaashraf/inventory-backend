import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StockService } from './stock.service';
import { StockController } from './stock.controller';
import { Purchase } from '../purchase/entities/purchase.entity';
import { Requisition } from '../requisition/entities/requisition.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Purchase, Requisition])],
  controllers: [StockController],
  providers: [StockService],
})
export class StockModule {}
