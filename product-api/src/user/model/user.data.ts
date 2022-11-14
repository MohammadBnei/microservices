import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../../tokens';

export class UserData {
  @ApiProperty({ description: 'User unique ID', example: '36635263' })
  public readonly id: string;

  @ApiProperty({ description: 'First name', example: 'John' })
  public readonly firstname?: string;

  @ApiProperty({ description: 'Last name', example: 'Doe' })
  public readonly lastname?: string;

  @ApiProperty({
    description: 'User unique email',
    example: 'john.doe@yahoo.com',
  })
  public readonly email: string;

  @ApiProperty({
    description: 'User role, buyer or seller',
    enum: Role,
  })
  public readonly role: Role;

  @ApiProperty({
    description: "User's credit",
    example: 45.12,
  })
  public readonly credit: number;
}
