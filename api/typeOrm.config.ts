import { DataSource } from 'typeorm';
import { config } from 'dotenv';

config();

export default new DataSource({
  type: 'mariadb',
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_DATABASE,
  synchronize: true,
  migrationsTransactionMode: 'all',
  // Entities
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  // Migrations
  migrationsTableName: 'migrations',
  migrations: ['src/migrations/*.ts'], // List of migrations need to be loaded,
});
