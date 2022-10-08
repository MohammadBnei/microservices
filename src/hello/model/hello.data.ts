import { ApiProperty } from '@nestjs/swagger';

export class HelloData {
  @ApiProperty({ description: 'Message', example: 'Hello Doe' })
  public readonly message: string;
}
