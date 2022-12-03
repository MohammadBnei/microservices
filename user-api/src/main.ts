import {
  ClassSerializerInterceptor,
  INestApplication,
  ValidationPipe,
} from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import cookieParser from 'cookie-parser';
import { AppModule } from './app.module';

import { CommonModule, WinstonLogger, LogInterceptor } from './common';

export function createSwagger(app: INestApplication) {
  const version = process.env.npm_package_version;

  const options = new DocumentBuilder()
    .setTitle('User API')
    .setDescription('For demonstration purpose')
    .setVersion(version)
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/docs', app, document);
}

async function bootstrap(): Promise<void> {
  const logger = new WinstonLogger();
  const app = await NestFactory.create(AppModule, {
    logger,
  });

  app.use(cookieParser());

  app.setGlobalPrefix(process.env.API_PREFIX || '/api/v1/');

  if (!process.env.SWAGGER_ENABLE || process.env.SWAGGER_ENABLE === '1') {
    createSwagger(app);
  }

  const logInterceptor = app.select(CommonModule).get(LogInterceptor);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(
    new ClassSerializerInterceptor(app.get(Reflector)),
    logInterceptor,
  );
  const port = process.env.PORT || 3000;
  await app.listen(port, () => logger.log(`listening on port : ${port}`));
}

bootstrap().catch((err) => {
  // tslint:disable-next-line:no-console
  console.error(err);
  process.exit(1);
});
