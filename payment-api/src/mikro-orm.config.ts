import { Options } from '@mikro-orm/core';
import dotenv from 'dotenv';

dotenv.config();

const config: Options = {
  entities: ['./dist/**/*.entity.js'],
  entitiesTs: ['./src/**/*.entity.ts'],
  type: 'mysql',
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  dbName: process.env.DATABASE_NAME,
  port: +process.env.DATABASE_PORT,
  debug: process.env.NODE_ENV === 'dev',
  validate: true,
  strict: true,
};

export default config;
