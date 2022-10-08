import { Module } from '@nestjs/common';
import { CommonModule } from './common';
import { HelloModule } from './hello';
import { UserModule } from './user/user.module';

@Module({
  imports: [CommonModule, HelloModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
