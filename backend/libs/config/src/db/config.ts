import { DataSourceOptions } from 'typeorm';

const baseconfig: any = {
  host: process.env['DB_HOST'] ?? 'localhost',
  port: Number(process.env['DB_PORT']) || 3003,
  username: process.env['DB_USER'] ?? 'rescon',
  password: process.env['DB_PASSWORD'] ?? 'rescon',
  database: process.env['DB_NAME'] ?? 'rescon',
  // entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: true,
};

const pgconfig: DataSourceOptions = {
  ...baseconfig,
  type: 'postgres',
};

const msqlconfig: DataSourceOptions = {
  ...baseconfig,
  type: 'mysql',
};

export default function dbConfig() {
  if (process.env['DB'] === 'mysql') {
    return msqlconfig;
  } else {
    return pgconfig;
  }
}
