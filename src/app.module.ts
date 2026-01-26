import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { dbConfig } from './config/db';
import { CategoryModule } from './modules/category/category.module';
import { ProductsModule } from './modules/products/products.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports:[ConfigModule],
      useFactory: dbConfig,
      inject: [ConfigService],
    }),
    CategoryModule,
    ProductsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
