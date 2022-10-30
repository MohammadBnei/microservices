import { Module } from '@nestjs/common';

import { LogInterceptor } from './flow';
import { LoggerService, configProvider } from './provider';

@Module({
  providers: [configProvider, LoggerService, LogInterceptor],
  exports: [configProvider, LoggerService, LogInterceptor],
})
export class CommonModule {}
