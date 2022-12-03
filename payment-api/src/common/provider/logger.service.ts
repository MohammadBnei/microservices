import * as winston from 'winston';
import ecsFormat from '@elastic/ecs-winston-format';
import { LoggerService } from '@nestjs/common';

export class WinstonLogger implements LoggerService {
  private readonly instance: winston.Logger;

  public constructor() {
    this.instance = winston.createLogger({
      level: 'info',
      silent: this.isTestEnv(),
      defaultMeta: {
        api: 'payment',
      },
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.colorize({ all: true }),
            winston.format.printf((info) => `[${info.level}]: ${info.message}`),
          ),
          stderrLevels: ['error'],
        }),
        new winston.transports.File({
          format: ecsFormat(),
          filename: './logs',
        }),
      ],
    });
  }

  public log(message: string, meta: Record<string, string> = undefined): void {
    this.instance.info(message, meta);
  }

  public error(message: string, meta: Record<string, string> = undefined) {
    this.instance.error(message, meta);
  }

  public warn(message: string, meta: Record<string, string> = undefined) {
    this.instance.warn(message, meta);
  }

  private isTestEnv(): boolean {
    return process.env.NODE_ENV === 'test';
  }

  private isProductionEnv(): boolean {
    return (
      process.env.NODE_ENV === 'production' ||
      process.env.NODE_ENV === 'staging'
    );
  }
}
