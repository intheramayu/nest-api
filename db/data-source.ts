// src/db/data-source.ts
import { config } from 'dotenv';
import { DataSourceOptions , DataSource} from 'typeorm';

config();

export const dataSourceOptions: DataSourceOptions = {
  type: 'mysql',
  host: process.env.DATABASE_HOST,
  port: 3306,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/db/migrations/*.js'],
  // synchronize: true,
}

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
