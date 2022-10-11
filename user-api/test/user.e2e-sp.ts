import { Test, TestingModule } from '@nestjs/testing';
import {
  ClassSerializerInterceptor,
  HttpStatus,
  INestApplication,
  ValidationPipe,
} from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { Role } from '../src/tokens';
import { UserSeeder } from './UserSeeder';
import { UserData } from 'src/user/model';
import { Reflector } from '@nestjs/core';

const apiUrl = (strings) => {
  return `/api/v1/${strings[0]}`;
};

describe('UserController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    app.setGlobalPrefix(process.env.API_PREFIX || '/api/v1/');

    app.useGlobalPipes(new ValidationPipe());
    app.useGlobalInterceptors(
      new ClassSerializerInterceptor(app.get(Reflector)),
    );

    await app.init();
  });

  // User creation
  it('should create a user and return 201', async () => {
    return request(app.getHttpServer())
      .post(apiUrl`user`)
      .send(globalUser)
      .set('Accept', 'application/json')
      .expect(201);
  });

  it('should connect with the seeded user the seeded user', async () => {
    const res = await request(app.getHttpServer())
      .post(apiUrl`auth/login`)
      .send({
        email: UserSeeder.alireza.email,
        password: UserSeeder.alireza.firstname,
      })
      .set('Accept', 'application/json');

    expect(res.status).toBe(HttpStatus.CREATED);

    const jwt = res.body?.jwt;
    expect(jwt).toBeDefined();

    const user = res.body?.user;
    expect(user).toBeDefined();
    expect(user.lastname).toBe(UserSeeder.alireza.lastname);
    expect(user.firstname).toBe(UserSeeder.alireza.firstname);
    expect(user.email).toBe(UserSeeder.alireza.email);
    expect(user.role).toBe(UserSeeder.alireza.role);
  });

  it('should connect with the admin user and fetch all users', async () => {
    let res = await request(app.getHttpServer())
      .post(apiUrl`auth/login`)
      .send({
        email: UserSeeder.houari.email,
        password: UserSeeder.houari.firstname,
      })
      .set('Accept', 'application/json');

    expect(res.status).toBe(HttpStatus.CREATED);

    const jwt = res.body?.jwt;
    expect(jwt).toBeDefined();

    const user: UserData = res.body?.user;
    expect(user).toBeDefined();
    expect(user.role).toBe(UserSeeder.houari.role);
    expect(user.role).toBe(Role.ADMIN);

    res = await request(app.getHttpServer())
      .get(apiUrl`user`)
      .set('Authorization', 'Bearer ' + jwt)
      .set('Accept', 'application/json');

    expect(res.status).toBe(HttpStatus.OK);

    const users: UserData[] = res.body;
    expect(users?.length).toBeGreaterThanOrEqual(3);
  });

  afterAll(async () => {
    app.close();
  });
});

const globalUser = {
  email: 'john@gmail.com',
  password: 'john',
  role: Role.BUYER,
};
