import { Module } from '@nestjs/common';
import { PurchaseService } from './purchase.service';
import { PurchaseController } from './purchase.controller';
import { Purchase } from './entities/purchase.entity';
import { PurchaseItem } from './entities/purchase-item.entity';
import { Supplier } from '../supplier/entities/supplier.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from '../category/entities/category.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Purchase, PurchaseItem, Supplier, Category])],
  controllers: [PurchaseController],
  providers: [PurchaseService],
})
export class PurchaseModule { }
