export interface Config {
  readonly PORT: number;

  readonly API_PREFIX: string;

  readonly DATABASE_URL: string;
  readonly DATABASE_NAME: string;
  readonly DATABASE_HOST: string;
  readonly DATABASE_PORT: string;
  readonly DATABASE_PASSWORD: string;

  readonly SWAGGER_ENABLE: number;

  readonly JWT_SECRET: string;
}
