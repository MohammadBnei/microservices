import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { CommonModule } from '../common';
import { UserService } from './service';

@Module({
  providers: [UserService],
  imports: [CommonModule, HttpModule],
  exports: [UserService],
})
export class UserModule {}
