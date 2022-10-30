import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { Role } from '../src/tokens';
import { UserSeeder } from '../src/seeders/UserSeeder';
import { UserData } from '../src/user/model';

const apiUrl = (strings) => {
  return `/api/v1/${strings[0]}`;
};

describe('AuthController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    app.setGlobalPrefix(process.env.API_PREFIX || '/api/v1/');

    app.useGlobalPipes(new ValidationPipe());

    await app.init();
  });

  // BUYER

  // RETURN AN ERROR
  // Fetch another user

  it('should connect with the buyer and fetch a random user, then get an error', async () => {
    let res = await request(app.getHttpServer())
      .post(apiUrl`auth/login`)
      .send({
        email: UserSeeder.alireza.email,
        password: UserSeeder.alireza.firstname,
      })
      .set('Accept', 'application/json');

    const jwt = res.body?.jwt;

    const user: UserData = res.body?.user;
    expect(user.id).toBeDefined();

    const id = +user.id === 2 ? '1' : '2';

    res = await request(app.getHttpServer())
      .get(apiUrl`user/` + id)
      .set('Authorization', 'Bearer ' + jwt)
      .set('Accept', 'application/json');

    expect(res.status).toBe(HttpStatus.UNAUTHORIZED);
  });

  // GET AN ERROR
  // UPDATE

  it('should connect with the buyer and update another user, then get an error', async () => {
    let res = await request(app.getHttpServer())
      .post(apiUrl`auth/login`)
      .send({
        email: UserSeeder.alireza.email,
        password: UserSeeder.alireza.firstname,
      })
      .set('Accept', 'application/json');

    const jwt = res.body?.jwt;

    const user: UserData = res.body?.user;
    expect(user.id).toBeDefined();

    const id = +user.id === 2 ? '1' : '2';

    res = await request(app.getHttpServer())
      .put(apiUrl`user/` + id)
      .set('Authorization', 'Bearer ' + jwt)
      .send({
        role: Role.SELLER,
      })
      .set('Accept', 'application/json');

    expect(res.status).toBe(HttpStatus.UNAUTHORIZED);
  });

  // GET AN ERROR
  // DELETE

  it('should connect with the buyer and delete another user, then get an error', async () => {
    let res = await request(app.getHttpServer())
      .post(apiUrl`auth/login`)
      .send({
        email: UserSeeder.alireza.email,
        password: UserSeeder.alireza.firstname,
      })
      .set('Accept', 'application/json');

    const jwt = res.body?.jwt;

    const user: UserData = res.body?.user;
    expect(user.id).toBeDefined();

    res = await request(app.getHttpServer())
      .del(apiUrl`user/` + 5)
      .set('Authorization', 'Bearer ' + jwt)
      .set('Accept', 'application/json');

    expect(res.status).toBe(HttpStatus.UNAUTHORIZED);
  });

  afterAll(async () => {
    app.close();
  });
});
