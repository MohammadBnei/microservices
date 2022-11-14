import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { CommonModule } from './common';
import config from './mikro-orm.config';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { ProductModule } from './product/product.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MikroOrmModule.forRoot(config),
    CommonModule,
    AuthModule,
    ProductModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
