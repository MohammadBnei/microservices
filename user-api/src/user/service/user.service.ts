import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User, UserData, UserInput } from '../model';
import { UpdateInput } from '../model/user.input';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly ur: EntityRepository<User>,
  ) {}

  getUsers(): Promise<User[]> {
    return this.ur.findAll({
      fields: ['email', 'lastname', 'firstname', 'role'],
    });
  }

  async getUserOrFail(query: string): Promise<UserData> {
    const user = await this.getUser(query);

    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }

  async getUser(query: string): Promise<UserData> {
    let user;
    if (/^\d$/.test(query)) {
      user = await this.ur.findOne({ id: +query });
    } else if (/\S+@\S+\.\S+/.test(query)) {
      user = await this.ur.findOne({ email: query });
    }

    return user?.toJSON() || null;
  }

  async createUser(data: UserInput): Promise<void> {
    const found = await this.getUser(data.email);
    if (found) {
      throw new HttpException('Email already taken', HttpStatus.BAD_REQUEST);
    }
    const newUser = new User(data);
    return this.ur.persistAndFlush(newUser);
  }

  async comparePassword(email: string, password: string): Promise<UserData> {
    const user = await this.ur.findOne({ email });
    if (!user) {
      throw new NotFoundException();
    }

    if (!(await user.comparePassword(password))) {
      throw new HttpException('Wrong password', HttpStatus.BAD_REQUEST);
    }

    return user.toJSON();
  }

  async updateUser(id: string | number, data: UpdateInput): Promise<UserData> {
    const user = await this.ur.findOne({ id: +id });

    if (!user) {
      throw new NotFoundException();
    }

    this.ur.assign(user, data);
    await this.ur.persistAndFlush(user);

    return user.toJSON();
  }

  async deleteUser(id: string | number): Promise<void> {
    const user = await this.ur.findOne({ id: +id });

    if (!user) {
      throw new NotFoundException();
    }

    await this.ur.remove(user);
    return this.ur.flush();
  }
}
