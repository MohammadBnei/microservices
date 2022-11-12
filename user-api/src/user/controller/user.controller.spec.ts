import { Test } from '@nestjs/testing';
import { Role } from '../../tokens';
import { UserController } from './user.controller';
import { UserService } from '../service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import config from '../../mikro-orm.config';

describe('UserController', () => {
  let controller: UserController;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService],
      imports: [MikroOrmModule.forRoot(config)],
    }).compile();

    controller = moduleRef.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a new user', async () => {
    expect(controller.createUser(globalUser)).resolves.not.toThrow();
  });
});

const globalUser = {
  email: 'john@gmail.com',
  password: 'john',
  role: Role.BUYER,
};
