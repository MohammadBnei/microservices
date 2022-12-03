import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { BadRequestException, Injectable } from '@nestjs/common';
import { identity } from 'rxjs';
import { PaymentData } from '../model/payment.data';
import { Payment } from '../model/payment.entity';
import {
  CreatePayment,
  PaymentInput,
  PaymentQuery,
} from '../model/payment.input';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Payment)
    private readonly pr: EntityRepository<Payment>,
  ) {}

  async getPayments(query: PaymentQuery): Promise<PaymentData[]> {
    const fq = {};
    for (const [k, v] of Object.entries(query)) {
      if (v) {
        fq[k] = v;
      }
      if (v === 'id') {
        fq[v] = parseInt(v);
      }
    }
    const payments = await this.pr.find(fq);
    return payments.map((p) => p.toJSON());
  }

  async getPaymentOrFail(query: Partial<PaymentData>): Promise<PaymentData> {
    const payment = await this.getPayment(query.id);

    if (!payment) {
      throw new BadRequestException('Payment not found');
    }

    return payment;
  }

  async getPayment(id: string): Promise<PaymentData> {
    const payment = await this.pr.findOne({
      id: parseInt(id),
    });

    return payment?.toJSON();
  }

  async createPayment(data: CreatePayment): Promise<void> {
    const newPayment = new Payment(data);
    return this.pr.persistAndFlush(newPayment);
  }

  async updatePayment(
    id: string | number,
    data: PaymentInput,
  ): Promise<PaymentData> {
    const payment = await this.pr.findOne({ id: +id });

    if (!payment) {
      throw new BadRequestException('Payment not found');
    }

    this.pr.assign(payment, data);
    await this.pr.persistAndFlush(payment);

    return payment.toJSON();
  }

  async deletePayment(id: string | number): Promise<void> {
    const payment = await this.pr.findOne({ id: +id });

    if (!payment) {
      throw new BadRequestException('Payment not found');
    }

    await this.pr.remove(payment);
    return this.pr.flush();
  }
}
