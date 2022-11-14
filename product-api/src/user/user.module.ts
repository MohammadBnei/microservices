import { Module } from '@nestjs/common';
import { UserService } from './service';
import { HttpModule } from '@nestjs/axios';

@Module({
  providers: [UserService],
  exports: [UserService],
  imports: [HttpModule],
})
export class UserModule {}
