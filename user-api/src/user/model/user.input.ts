import { ApiProperty } from '@nestjs/swagger';
import { Length, IsEmail, IsEnum } from 'class-validator';
import { Transform } from 'class-transformer';
import { Role } from '../../tokens';
import { lowerTrim } from '../../utils/input';

export class UserInput {
  @Length(2, 40)
  @ApiProperty({ description: 'First name', example: 'John' })
  @Transform(lowerTrim)
  public readonly firstname?: string;

  @ApiProperty({ description: 'Last name', example: 'Doe' })
  @Length(2, 40)
  @Transform(lowerTrim)
  public readonly lastname?: string;

  @ApiProperty({
    description: 'User unique email',
    example: 'john.doe@yahoo.com',
  })
  @IsEmail()
  @Transform(lowerTrim)
  public readonly email: string;

  @ApiProperty({
    description: 'User password',
    example: 'UtbF=8',
  })
  @Length(2, 40)
  public readonly password: string;

  @ApiProperty({
    description: 'User role, buyer or seller',
    example: 'buyer',
  })
  @IsEnum(Role, {
    message: `Role must be one of ${Object.values(Role).join(' or ')}`,
  })
  public readonly role: Role;
}

export class LoginInput {
  @ApiProperty({ description: 'User email', example: 'john.doe@yahoo.com' })
  @IsEmail()
  @Transform(lowerTrim)
  public readonly email: string;

  @ApiProperty({ description: 'User password', example: 'UtbF=8' })
  public readonly password: string;
}

export class UpdateInput {
  @Length(2, 40)
  @ApiProperty({ description: 'First name', example: 'John' })
  @Transform(lowerTrim)
  public readonly firstname: string;

  @ApiProperty({ description: 'Last name', example: 'Doe' })
  @Length(2, 40)
  @Transform(lowerTrim)
  public readonly lastname: string;

  @ApiProperty({
    description: 'User role, buyer or seller',
    example: 'buyer',
  })
  @IsEnum(Role, {
    message: `Role must be one of ${Object.values(Role).join(' or ')}`,
  })
  public readonly role: Role;
}

export class IdInput {
  @ApiProperty({
    description: "The user's id",
    example: '1324',
  })
  @Transform(({ value }) => +value)
  public readonly id: number;
}
