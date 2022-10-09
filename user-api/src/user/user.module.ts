import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { User } from './model';
import { UserService } from './service';
import { UserController } from './controller';
import { CommonModule } from '../common';

@Module({
  imports: [MikroOrmModule.forFeature({ entities: [User] }), CommonModule],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
