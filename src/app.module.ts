import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from './config/database.config';
import { SupplierModule } from './module/supplier/supplier.module';
import { CategoryModule } from './module/category/category.module';
import { PurchaseModule } from './module/purchase/purchase.module';
import { DepartmentModule } from './module/department/department.module';
import { RequisitionModule } from './module/requisition/requisition.module';
import { StockModule } from './module/stock/stock.module';
import { DashboardModule } from './module/dashboard/dashboard.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync(databaseConfig),
    SupplierModule,
    CategoryModule,
    PurchaseModule,
    DepartmentModule,
    RequisitionModule,
    StockModule,
    DashboardModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
