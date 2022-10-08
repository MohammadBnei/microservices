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
    });

    const result = validationSchema.validate(env);

    if (result.error) {
      throw new Error('Configuration not valid: ' + result.error.message);
    }

    return {
      PORT: +env.API_PORT || 3000,
      API_PREFIX: `${env.API_PREFIX || '/api/v1'}`,
      SWAGGER_ENABLE: +env.SWAGGER_ENABLE || 1,
    };
  },
};
