import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { Product } from '../product/model';

export class ProductSeeder extends Seeder {
  static escabot: Partial<Product> = {
    name: 'escabot',
    quantity: 23,
    userId: '12',
    price: 47,
  };

  static pelle: Partial<Product> = {
    name: 'pelle',
    quantity: 1,
    userId: '12',
    price: 21,
  };

  static brouette: Partial<Product> = {
    name: 'brouette',
    quantity: 0,
    userId: '12',
    price: 19,
  };

  constructor() {
    super();
  }

  async run(em: EntityManager): Promise<void> {
    [
      ProductSeeder.brouette,
      ProductSeeder.escabot,
      ProductSeeder.pelle,
    ].forEach((product) => em.create(Product, product));

    for (let i = 0; i < 20; i++) {
      em.create(Product, {
        name: 'fouet' + i,
        quantity: i + 12,
        userId: `${i}`,
        price: 20 + i,
      });
    }
  }
}
