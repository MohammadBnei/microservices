import { MikroORM } from '@mikro-orm/core';
import config from '../src/mikro-orm.config';
import { UserSeeder } from './UserSeeder';

let orm: MikroORM<any>;

export default async () => {
  orm = await MikroORM.init({
    ...config,
    host: process.env.DATABASE_HOST || 'localhost',
    user: process.env.DATABASE_USER || 'nestjs',
    password: process.env.DATABASE_PASSWORD || 'password',
    dbName: process.env.DATABASE_NAME || 'test',
    migrations: {
      allOrNothing: true,
    },
  });

  await orm.getSchemaGenerator().refreshDatabase();
  const seeder = orm.getSeeder();
  await seeder.seed(UserSeeder);

  await orm.close();
};
