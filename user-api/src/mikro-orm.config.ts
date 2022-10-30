import { Options } from '@mikro-orm/core';
import { configProvider } from './common';

const {
  DATABASE_HOST: host,
  DATABASE_USER: user,
  DATABASE_PASSWORD: password,
  DATABASE_NAME: dbName,
  DATABASE_PORT: port,
} = configProvider.useFactory();

const config: Options = {
  entities: ['./dist/**/*.entity.js'],
  entitiesTs: ['./src/**/*.entity.ts'],
  type: 'mysql',
  host,
  user,
  // password,
  dbName,
  port,
  debug: process.env.NODE_ENV === 'dev',
};

export default config;
