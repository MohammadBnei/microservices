import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import cookieParser from 'cookie-parser';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { CommonModule, WinstonLogger, LogInterceptor } from './common';

async function bootstrap() {
  const logger = new WinstonLogger();
  const app = await NestFactory.create(AppModule, {
    logger,
  });

  app.use(cookieParser());

  app.setGlobalPrefix(process.env.API_PREFIX || '/api/v1/');

  const logInterceptor = app.select(CommonModule).get(LogInterceptor);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(
    new ClassSerializerInterceptor(app.get(Reflector)),
    logInterceptor,
  );

  const config = new DocumentBuilder()
    .setTitle('Payment API')
    .setDescription('Payment API swagger')
    .setVersion(process.env.npm_package_version)
    .addTag('payment')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const port = process.env.PORT || 3000;
  await app.listen(port, () => logger.log(`listening on port : ${port}`));
}
bootstrap();
