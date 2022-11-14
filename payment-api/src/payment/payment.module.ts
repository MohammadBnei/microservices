import { Module } from '@nestjs/common';
import { PaymentController } from './controller';
import { PaymentService } from './service';

@Module({
  controllers: [PaymentController],
  providers: [PaymentService],
})
export class PaymentModule {}
