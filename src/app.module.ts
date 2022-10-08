import { Module } from '@nestjs/common';
import { CommonModule } from './common';
import { HelloModule } from './hello';

@Module({
  imports: [CommonModule, HelloModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
