import { Module } from '@nestjs/common';

import { LogInterceptor } from './flow';
import { WinstonLogger, configProvider } from './provider';

@Module({
  providers: [configProvider, WinstonLogger, LogInterceptor],
  exports: [configProvider, WinstonLogger, LogInterceptor],
})
export class CommonModule {}
