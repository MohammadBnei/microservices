import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

import { CommonModule, LogInterceptor } from './common';

function createSwagger(app: INestApplication) {
  const version = process.env.npm_package_version;

  const options = new DocumentBuilder()
    .setTitle('User API')
    .setDescription('For demonstration purpose')
    .setVersion(version)
    // .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/docs', app, document);
}

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix(process.env.API_PREFIX || '/api/v1/');

  if (!process.env.SWAGGER_ENABLE || process.env.SWAGGER_ENABLE === '1') {
    createSwagger(app);
  }

  const logInterceptor = app.select(CommonModule).get(LogInterceptor);
  app.useGlobalInterceptors(logInterceptor);

  await app.listen(process.env.PORT || 3000);
}

bootstrap().catch((err) => {
  // tslint:disable-next-line:no-console
  console.error(err);
  process.exit(1);
});
