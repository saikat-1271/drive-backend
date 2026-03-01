import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const databaseConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'database-2.c1oecuiky2hj.eu-north-1.rds.amazonaws.com',
  port: 5432,
  username: 'postgres',
  password: 'qpwFq09NkXuIqJIQvK1t',
  database: 'postgres',
  ssl: {
    rejectUnauthorized: false,
  },
  entities: [__dirname + '/../entities/*.entity{.ts,.js}'],
  synchronize: true, // Set to false in production
  logging: true,
};

export default databaseConfig;
