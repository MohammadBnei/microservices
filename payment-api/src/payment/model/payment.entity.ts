import {
  BeforeUpdate,
  Entity,
  PrimaryKey,
  Property,
  wrap,
} from '@mikro-orm/core';
import { PaymentData } from './payment.data';
import { PaymentInput } from './payment.input';

@Entity()
export class Payment {
  @PrimaryKey()
  id: number;

  @Property()
  productId: string;

  @Property()
  buyerId: string;

  @Property()
  sellerId: string;

  @Property()
  created_at = new Date();

  @Property({ onUpdate: () => new Date() })
  updated_at = new Date();

  toJSON(): PaymentData {
    const payment = wrap(this).toObject() as Payment;

    return {
      ...payment,
      id: `${payment.id}`,
    };
  }

  constructor(newPayment: PaymentInput) {
    wrap(this).assign({ ...newPayment } as any);
  }
}
