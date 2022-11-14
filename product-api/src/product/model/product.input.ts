import { ApiProperty } from '@nestjs/swagger';
import { Length, IsPositive } from 'class-validator';
import { Transform } from 'class-transformer';
import { lowerTrim } from '../../utils/input';

export class ProductInput {
  @ApiProperty({
    description: 'Name of the product',
    example: 'e-3655 ladder',
    required: true,
  })
  @Length(2, 40)
  @Transform(lowerTrim)
  public readonly name: string;

  @ApiProperty({
    description: 'User id of the owner',
    example: '1',
  })
  @Length(1)
  public readonly userId: string;

  @ApiProperty({
    description: 'Quantity of avalaible product',
    example: 5,
  })
  @IsPositive()
  public readonly quantity: number;
}

export class IdInput {
  @ApiProperty({
    description: "The product's id",
    example: '1324',
  })
  @Transform(({ value }) => +value)
  public readonly id: number;
}

export class ProductQuery {
  @ApiProperty({
    description: "The product's id",
    example: '1324',
    required: false,
  })
  @Transform(({ value }) => +value)
  public readonly id?: number;

  @ApiProperty({
    description: "The product's name",
    example: 'pelleteuse',
    required: false,
  })
  public readonly name?: string;
}
