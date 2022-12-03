import { NestFactory } from '@nestjs/core';
import { createLogger, transports } from 'winston';
import { AppModule } from './app.module';
import ecsFormat from '@elastic/ecs-winston-format';
import { WinstonModule } from 'nest-winston';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const instance = createLogger({
    format: ecsFormat(),
    defaultMeta: {
      api: 'payment',
    },
    transports: [
      new transports.Console({
        stderrLevels: ['error'],
      }),
      new transports.File({
        filename: './logs/log',
      }),
    ],
  });
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());

  const config = new DocumentBuilder()
    .setTitle('Payment API')
    .setDescription('Payment API swagger')
    .setVersion(process.env.npm_package_version)
    .addTag('payment')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
