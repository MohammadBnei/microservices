import {
  BeforeCreate,
  Entity,
  Enum,
  Index,
  PrimaryKey,
  Property,
  Unique,
  wrap,
} from '@mikro-orm/core';
import * as bcrypt from 'bcryptjs';
import { Role } from '../../tokens';
import { UserData } from './user.data';
import { UserInput } from './user.input';

@Entity()
export class User {
  @PrimaryKey()
  id!: number;

  @Property({ nullable: true })
  firstname?: string;

  @Property({ nullable: true })
  lastname?: string;

  @Property()
  @Unique()
  @Index()
  email: string;

  @Property()
  password: string;

  @Enum(() => Role)
  role: Role;

  @Property({
    columnType: 'float',
  })
  credit = 100;

  @BeforeCreate()
  async beforeCreate() {
    this.password = await bcrypt.hash(
      this.password,
      parseInt(process.env.HASH || 'zboubi', 10),
    );
  }

  async comparePassword(password) {
    return bcrypt.compare(password, this.password);
  }

  toJSON(): UserData {
    const user = wrap(this).toObject() as User;

    delete user.password;
    return {
      ...user,
      id: `${user.id}`,
    };
  }

  constructor(newUser: UserInput) {
    wrap(this).assign({ ...newUser } as any);
    this.firstname = newUser.firstname?.toLowerCase().trim();
    this.lastname = newUser.lastname?.toLowerCase().trim();
    this.email = newUser.email.toLowerCase().trim();
    this.role = newUser.role || Role.BUYER;
  }
}
