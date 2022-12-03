import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { CommonModule } from './common/common.module';
import config from './mikro-orm.config';
import { PaymentModule } from './payment/payment.module';
import { ExternalModule } from './external/external.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MikroOrmModule.forRoot(config),
    CommonModule,
    PaymentModule,
    AuthModule,
    ExternalModule,
  ],
})
export class AppModule {}
