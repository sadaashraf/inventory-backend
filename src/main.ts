import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DataSource } from 'typeorm';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.setGlobalPrefix('api');

  const dataSource = app.get(DataSource);
  await dataSource.query(`DROP TABLE IF EXISTS "issue_item" CASCADE`);
  await dataSource.query(`DROP TABLE IF EXISTS "issue" CASCADE`);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
