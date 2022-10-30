import * as winston from 'winston';

export class LoggerService {
  private readonly instance: winston.Logger;

  public constructor() {
    const format = this.isProductionEnv()
      ? winston.format.combine(
          winston.format.timestamp(),
          winston.format.json(),
        )
      : winston.format.combine(
          winston.format.colorize(),
          winston.format.simple(),
        );

    this.instance = winston.createLogger({
      level: 'info',
      silent: this.isTestEnv(),
      format,
      defaultMeta: {
        api: 'product',
      },
      transports: [
        new winston.transports.Console({
          stderrLevels: ['error'],
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
