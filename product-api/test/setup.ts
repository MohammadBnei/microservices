import { MikroORM } from '@mikro-orm/core';
import config from '../src/mikro-orm.config';
import { ProductSeeder } from '../src/seeders/ProductSeeder';

let orm: MikroORM<any>;

export default async () => {
  orm = await MikroORM.init({
    ...config,
    migrations: {
      allOrNothing: true,
    },
  });

  await orm.getSchemaGenerator().refreshDatabase();
  const seeder = orm.getSeeder();
  await seeder.seed(ProductSeeder);

  await orm.close();
};
