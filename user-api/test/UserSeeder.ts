import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { User } from '../src/user/model';
import { Role } from '../src/tokens';

export class UserSeeder extends Seeder {
  static houari: Partial<User> = {
    firstname: 'houari',
    lastname: 'boumédiène',
    email: 'houari@wall.dz',
    role: Role.ADMIN,
    password: 'houari',
  };

  static karim: Partial<User> = {
    firstname: 'karim',
    lastname: 'benzema',
    email: 'karim@wall.dz',
    role: Role.SELLER,
    password: 'karim',
  };

  static alireza: Partial<User> = {
    firstname: 'alireza',
    lastname: 'firouzja',
    email: 'alireza@wall.ir',
    role: Role.BUYER,
    password: 'alireza',
  };

  static dummy: Partial<User> = {
    firstname: 'dummy',
    lastname: 'bear',
    email: 'dummy@wall.ir',
    role: Role.BUYER,
    password: 'dummy',
  };

  constructor() {
    super();
  }
  async run(em: EntityManager): Promise<void> {
    [
      UserSeeder.houari,
      UserSeeder.alireza,
      UserSeeder.karim,
      UserSeeder.dummy,
    ].forEach((user) => em.create(User, user));
  }
}
