import * as winston from 'winston';
import ecsFormat from '@elastic/ecs-winston-format';
import LogstashTransport from 'winston3-logstash-transport';
export class LoggerService {
  private readonly instance: winston.Logger;

  public constructor() {
    this.instance = winston.createLogger({
      level: 'info',
      silent: this.isTestEnv(),
      format: ecsFormat({ convertReqRes: true }),
      defaultMeta: {
        api: 'user',
      },
      transports: [
        new LogstashTransport({
          mode: 'udp',
          host: 'localhost',
          port: 3333,
        }),
        new winston.transports.Console({
          stderrLevels: ['error'],
        }),
        new winston.transports.File({
          filename: 'logs/user-api',
        }),
      ],
    });
  }

  public info(message: string, meta: Record<string, string> = undefined): void {
    this.instance.info(message, meta);
  }

  public error(message: string, meta: Record<string, string> = undefined) {
    this.instance.error(message, meta);
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
