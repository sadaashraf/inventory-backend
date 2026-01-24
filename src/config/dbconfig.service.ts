import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

export const databaseConfig = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (config: ConfigService) =>
    ({
      type: 'postgres',
      host: config.get('DB_HOST'),
      port: Number(config.get('DB_PORT')),
      username: config.get('DB_USERNAME'),
      password: config.get('DB_PASSWORD'),
      database: config.get('DB_DATABASE'),
      entities: [
        __dirname + '/../**/*.entity.ts',
        './dist/**/*.entity{.ts,.js}',
      ],
      synchronize: true, // dev only
    }) as TypeOrmModuleAsyncOptions,
};
