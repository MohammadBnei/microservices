import { MikroORM } from '@mikro-orm/core';
import config from '../src/mikro-orm.config';
import { UserSeeder } from './UserSeeder';
import { config as dotenv } from 'dotenv';

dotenv({
  path: '.env.test',
});
let orm: MikroORM<any>;

export default async () => {
  orm = await MikroORM.init({
    ...config,
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    dbName: process.env.DATABASE_NAME,
    migrations: {
      allOrNothing: true,
    },
  });

  await orm.getSchemaGenerator().refreshDatabase();
  const seeder = orm.getSeeder();
  await seeder.seed(UserSeeder);

  await orm.close();
};
