export interface Config {
  readonly PORT: number;

  readonly API_PREFIX: string;

  readonly DATABASE_URL: string;
  readonly DATABASE_NAME: string;
  readonly DATABASE_USER: string;
  readonly DATABASE_HOST: string;
  readonly DATABASE_PORT: number;
  readonly DATABASE_PASSWORD: string;

  readonly SWAGGER_ENABLE: number;

  readonly JWT_SECRET: string;

  readonly USER_API_URL: string;
  readonly PRODUCT_API_URL: string;
}
