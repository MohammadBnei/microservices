import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ExternalService } from 'src/external/external.service';
import { Role } from 'src/tokens';
import { PaymentData } from '../model/payment.data';
import { PaymentInput, PaymentQuery } from '../model/payment.input';
import { PaymentService } from '../service';

@Controller('payment')
@ApiTags('payment')
export class PaymentController {
  constructor(
    private readonly paymentService: PaymentService,
    private readonly externalService: ExternalService,
    private readonly jwtService: JwtService,
  ) {}
  @Get()
  @ApiResponse({ status: HttpStatus.OK, type: PaymentData })
  async getPayment(
    @Query() query: PaymentQuery,
  ): Promise<PaymentData | PaymentData[]> {
    if (query.id) return this.paymentService.getPaymentOrFail(query);
    return this.paymentService.getPayments(query);
  }

  @Post()
  @ApiResponse({ status: HttpStatus.CREATED })
  async createPayment(@Body() data: PaymentInput, @Req() req): Promise<void> {
    const jwt = this.jwtService.sign({ role: Role.ADMIN });
    const { buyerId, productId } = data;
    const productP = this.externalService.findProduct(productId, jwt);
    const buyerP = this.externalService.findUser(buyerId, jwt);
    const [product, buyer] = await Promise.all([productP, buyerP]);

    if (!product || product.quantity < 1) {
      throw new HttpException('product not avalaible', HttpStatus.BAD_REQUEST);
    }
    if (!buyer || buyer.credit < product.price) {
      throw new HttpException(
        'buyer cannot make this purchase',
        HttpStatus.BAD_REQUEST,
      );
    }

    const seller = await this.externalService.findUser(product.userId, jwt);

    if (!seller) {
      throw new HttpException(
        'there is a problem with the seller of the product',
        HttpStatus.CONFLICT,
      );
    }

    const rollback = [];

    try {
      await this.externalService.creditUser(buyerId, -product.price, jwt);
      rollback.push(() =>
        this.externalService.creditUser(buyerId, product.price, jwt),
      );
    } catch (error) {
      console.log({ error });
      throw new HttpException(
        'there is a problem taking money from the buyer',
        HttpStatus.CONFLICT,
      );
    }

    try {
      await this.externalService.updateProduct(
        productId,
        { quantity: product.quantity - 1 },
        jwt,
      );
      rollback.push(() =>
        this.externalService.updateProduct(
          productId,
          { quantity: product.quantity },
          jwt,
        ),
      );
    } catch (error) {
      await Promise.all(rollback.map((fn) => fn()));

      console.log({ error });
      throw new HttpException(
        'there is a problem updating the product',
        HttpStatus.CONFLICT,
      );
    }

    try {
      await this.externalService.creditUser(seller.id, product.price, jwt);
      rollback.push(() =>
        this.externalService.creditUser(seller.id, -product.price, jwt),
      );
    } catch (error) {
      await Promise.all(rollback.map((fn) => fn()));

      console.log({ error });
      throw new HttpException(
        'there is a problem updating the product',
        HttpStatus.CONFLICT,
      );
    }

    try {
      const payment = this.paymentService.createPayment({
        ...data,
        sellerId: seller.id,
      });
      return payment;
    } catch (error) {
      await Promise.all(rollback.map((fn) => fn()));
      console.log({ error });

      throw new HttpException(
        'there is a problem creating the payment',
        HttpStatus.CONFLICT,
      );
    }
  }
}
