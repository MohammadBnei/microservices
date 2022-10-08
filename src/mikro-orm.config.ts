import { Options } from '@mikro-orm/core';
import { LoggerService } from './common';

const config: Options = {
  entities: ['./dist/**/*.entity.js'],
  entitiesTs: ['./src/**/*.entity.ts'],
  type: 'mongo',
  clientUrl: process.env.DATABASE_URL,
  dbName: process.env.DB_NAME,
  debug: process.env.NODE_ENV === 'dev',
  logger: LoggerService.log.bind(logger),
};

export default config;
