import { ApiProperty } from '@nestjs/swagger';

export class ProductData {
  @ApiProperty({ description: 'Product unique ID', example: '36635263' })
  public readonly id: string;

  @ApiProperty({ description: 'Name of the product', example: 'e-3655 ladder' })
  public readonly name?: string;

  @ApiProperty({ description: 'User id of the product', example: '1' })
  public readonly userId: string;

  @ApiProperty({
    description: 'Quantity of avalaible product',
    example: 5,
  })
  public readonly quantity: number;

  @ApiProperty({
    description: 'Price of the product',
    example: 50,
  })
  public readonly price: number;
}
