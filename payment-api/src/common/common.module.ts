import { Module } from '@nestjs/common';
import { configProvider } from './provider/config.provider';

@Module({
  providers: [configProvider],
  exports: [configProvider],
})
export class CommonModule {}
