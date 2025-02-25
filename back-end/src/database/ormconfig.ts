import * as dotenv from 'dotenv';
import * as path from 'path';
import { DataSource, DataSourceOptions } from 'typeorm';

const environment = process.env.NODE_ENV || 'development';
const envFile = path.resolve(__dirname, `../../${environment}.env`);
dotenv.config({ path: envFile });

const config: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  entities: [path.join(__dirname, '../**/*.entity.{ts,js}')],
  logging: environment === 'development',
};

export const AppDataSource = new DataSource(config);
