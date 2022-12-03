import { ApiProperty } from '@nestjs/swagger';

export class PaymentInput {
  @ApiProperty({
    description: 'Id of the product purchased',
    example: '2',
  })
  productId: string;

  @ApiProperty({
    description: 'Id of the buyer',
    example: '2',
  })
  buyerId: string;
}

export class CreatePayment {
  @ApiProperty({
    description: 'Id of the product purchased',
    example: '2',
  })
  productId: string;

  @ApiProperty({
    description: 'Id of the buyer',
    example: '2',
  })
  buyerId: string;

  @ApiProperty({
    description: 'Id of the seller',
    example: '2',
  })
  sellerId: string;
}

export class PaymentQuery {
  @ApiProperty({
    description: "The payment's id",
    example: '1324',
    required: false,
  })
  public readonly id?: string;

  @ApiProperty({
    description: "The payment's buyer id",
    example: '2',
    required: false,
  })
  public readonly buyerId?: string;
  @ApiProperty({
    description: "The payment's seller id",
    example: '2',
    required: false,
  })
  public readonly sellerId?: string;
  @ApiProperty({
    description: "The payment's product id",
    example: '2',
    required: false,
  })
  public readonly productId?: string;
}
