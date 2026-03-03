// src/config/db.config.ts

import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { Folder } from 'src/modules/folder/entities/folder.entity';
import { File } from 'src/modules/file/entities/file.entity';
import { Config } from 'src/modules/config/entities/master-config.entity';

export const databaseConfig: TypeOrmModuleAsyncOptions = {
  inject: [ConfigService],
  useFactory: (config: ConfigService) => ({
    type: 'postgres',
    host: config.get<string>('DB_HOST'),
    port: config.get<number>('DB_PORT') || 5432,
    username: config.get<string>('DB_USERNAME'),
    password: config.get<string>('DB_PASSWORD'),
    database: config.get<string>('DB_DATABASE'),
    ssl: { rejectUnauthorized: false },
    autoLoadEntities: true,
    // synchronize: true, // ❌ false in production
    logging: true,
  }),
};
