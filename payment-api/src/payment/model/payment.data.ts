import { ApiProperty } from '@nestjs/swagger';

export class PaymentData {
  @ApiProperty()
  id: number;

  @ApiProperty()
  productId: string;

  @ApiProperty()
  buyerId: string;

  @ApiProperty()
  sellerId: string;

  @ApiProperty()
  created_at: Date;

  @ApiProperty()
  updated_at: Date;
}
