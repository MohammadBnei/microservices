import * as Joi from 'joi';

import { Service } from '../../tokens';
import { Config } from '../model';

export const configProvider = {
  provide: Service.CONFIG,
  useFactory: (): Config => {
    const env = process.env;
    const validationSchema = Joi.object().unknown().keys({
      PORT: Joi.string(),
      API_PREFIX: Joi.string(),
      SWAGGER_ENABLE: Joi.string(),
      DATABASE_HOST: Joi.string().required(),
      DATABASE_PORT: Joi.string(),
      DATABASE_PASSWORD: Joi.string(),
      DATABASE_USER: Joi.string().required(),
      DATABASE_NAME: Joi.string().required(),
      JWT_SECRET: Joi.string().required(),
    });

    const result = validationSchema.validate(env);

    if (result.error) {
      throw new Error('Configuration not valid: ' + result.error.message);
    }

    return {
      PORT: +env.API_PORT || 3000,
      API_PREFIX: `${env.API_PREFIX || '/api/v1'}`,
      SWAGGER_ENABLE: +env.SWAGGER_ENABLE || 1,
      DATABASE_URL: `${env.DATABASE_URL}`,
      DATABASE_NAME: `${env.DATABASE_NAME}`,
      DATABASE_USER: `${env.DATABASE_USER}`,
      DATABASE_HOST: `${env.DATABASE_HOST}`,
      DATABASE_PASSWORD: `${env.DATABASE_PASSWORD}`,
      DATABASE_PORT: +env.DATABASE_PORT || 3306,
      JWT_SECRET: `${env.JWT_SECRET}`,
    };
  },
};
