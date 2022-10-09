import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../user';
import { LocalStrategy, JwtStrategy, AdminStrategy } from './strategy';
import { AuthService } from './service';
import { AuthController } from './controller';
import { JwtModule } from '@nestjs/jwt';
import { OwnAccessStrategy } from './strategy/own-access.strategy';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '5m' },
    }),
  ],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    AdminStrategy,
    OwnAccessStrategy,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
