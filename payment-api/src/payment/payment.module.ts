import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ExternalModule } from 'src/external/external.module';
import { PaymentController } from './controller';
import { Payment } from './model/payment.entity';
import { PaymentService } from './service';

@Module({
  controllers: [PaymentController],
  providers: [PaymentService],
  imports: [
    MikroOrmModule.forFeature({ entities: [Payment] }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '5m' },
    }),
    ExternalModule,
  ],
})
export class PaymentModule {}
