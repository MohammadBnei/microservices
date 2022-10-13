import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { Role } from '../src/tokens';
import { UserSeeder } from './UserSeeder';
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

  it('should connect with the seeded user', async () => {
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

  // ADMIN

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

  //GET

  it('should connect with the admin user and fetch a random user', async () => {
    let res = await request(app.getHttpServer())
      .post(apiUrl`auth/login`)
      .send({
        email: UserSeeder.houari.email,
        password: UserSeeder.houari.firstname,
      })
      .set('Accept', 'application/json');

    const jwt = res.body?.jwt;

    let user: UserData = res.body?.user;
    expect(user.id).toBeDefined();

    const id = +user.id === 2 ? '1' : '2';

    res = await request(app.getHttpServer())
      .get(apiUrl`user/` + id)
      .set('Authorization', 'Bearer ' + jwt)
      .set('Accept', 'application/json');

    expect(res.status).toBe(HttpStatus.OK);

    user = res.body;
    expect(user?.id).toBe(id);
    expect(user?.firstname).toBeDefined();
    expect(user?.lastname).toBeDefined();
    expect(user?.email).toBeDefined();
  });

  // UPDATE

  it('should connect with the admin user and update a random user', async () => {
    let res = await request(app.getHttpServer())
      .post(apiUrl`auth/login`)
      .send({
        email: UserSeeder.houari.email,
        password: UserSeeder.houari.firstname,
      })
      .set('Accept', 'application/json');

    const jwt = res.body?.jwt;

    let user: UserData = res.body?.user;
    expect(user.id).toBeDefined();

    const id = +user.id === 2 ? '1' : '2';
    const role = user.role === Role.BUYER ? Role.SELLER : Role.BUYER;

    res = await request(app.getHttpServer())
      .put(apiUrl`user/` + id)
      .set('Authorization', 'Bearer ' + jwt)
      .send({
        role,
      })
      .set('Accept', 'application/json');

    expect(res.status).toBe(HttpStatus.OK);

    user = res.body;
    expect(user?.id).toBe(id);
    expect(user?.firstname).toBeDefined();
    expect(user?.lastname).toBeDefined();
    expect(user?.email).toBeDefined();
    expect(user?.role).toBe(role);
  });

  // DELETE
  it('should connect with the admin user and delete the first dummy', async () => {
    let res = await request(app.getHttpServer())
      .post(apiUrl`auth/login`)
      .send({
        email: UserSeeder.houari.email,
        password: UserSeeder.houari.firstname,
      })
      .set('Accept', 'application/json');

    const jwt = res.body?.jwt;

    const user: UserData = res.body?.user;
    expect(user.id).toBeDefined();

    res = await request(app.getHttpServer())
      .delete(apiUrl`user/` + 4)
      .set('Authorization', 'Bearer ' + jwt)
      .set('Accept', 'application/json');

    expect(res.status).toBe(HttpStatus.OK);
  });

  // BUYER

  it('should connect with the buyer and fetch itself', async () => {
    let res = await request(app.getHttpServer())
      .post(apiUrl`auth/login`)
      .send({
        email: UserSeeder.alireza.email,
        password: UserSeeder.alireza.firstname,
      })
      .set('Accept', 'application/json');

    expect(res.status).toBe(HttpStatus.CREATED);

    const jwt = res.body?.jwt;
    expect(jwt).toBeDefined();

    const user: UserData = res.body?.user;
    expect(user).toBeDefined();
    expect(user.role).toBe(UserSeeder.alireza.role);
    expect(user.role).toBe(Role.BUYER);

    res = await request(app.getHttpServer())
      .get(apiUrl`user/` + user.id)
      .set('Authorization', 'Bearer ' + jwt)
      .set('Accept', 'application/json');

    expect(res.status).toBe(HttpStatus.OK);
  });

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

  afterAll(async () => {
    app.close();
  });
});
