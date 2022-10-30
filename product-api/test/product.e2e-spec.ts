import { Test, TestingModule } from '@nestjs/testing';
import {
  ClassSerializerInterceptor,
  INestApplication,
  ValidationPipe,
} from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { Role } from '../src/tokens';
import { Reflector } from '@nestjs/core';
import { ProductInput } from 'src/product/model';
import { JwtService } from '@nestjs/jwt';

const apiUrl = (strings) => {
  return `/api/v1/${strings[0]}`;
};

describe('ProductController (e2e)', () => {
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

  // Product creation
  it('should create a product and return 201', async () => {
    const sellerToken = new JwtService().sign(
      {
        role: Role.SELLER,
      },
      {
        secret: process.env.JWT_SECRET,
      },
    );
    return request(app.getHttpServer())
      .post(apiUrl`product`)
      .set('Authorization', 'Bearer ' + sellerToken)
      .send(globalProduct)
      .set('Accept', 'application/json')
      .expect(201);
  });

  it('should return the list of seeded products', async () => {
    return request(app.getHttpServer())
      .get(apiUrl`product`)
      .send(globalProduct)
      .set('Accept', 'application/json')
      .expect(200)
      .then((response) => {
        expect(response.body.length).toBeGreaterThanOrEqual(23);
      });
  });

  it('should return all products with fouet in their name', async () => {
    return request(app.getHttpServer())
      .get(apiUrl`product`)
      .query({
        name: 'fouet',
      })
      .send(globalProduct)
      .set('Accept', 'application/json')
      .expect(200)
      .then((response) => {
        const { body } = response;
        expect(body.length).toBe(20);
        expect(body.filter((p) => !p.name.includes('fouet')).length).toBe(0);
      });
  });

  it('should return the product with id 1', async () => {
    return request(app.getHttpServer())
      .get(apiUrl`product`)
      .query({
        id: '1',
      })
      .send(globalProduct)
      .set('Accept', 'application/json')
      .expect(200)
      .then((response) => {
        const { body } = response;
        expect(body).toHaveProperty('id', '1');
        expect(body).toHaveProperty('name');
        expect(body).toHaveProperty('quantity');
      });
  });

  afterAll(async () => {
    app.close();
  });
});

const globalProduct: ProductInput = {
  name: 'creation',
  quantity: 12,
};
