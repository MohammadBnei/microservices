import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Role } from '../../tokens';

@Injectable()
export class AdminStrategy extends PassportStrategy(Strategy, 'admin') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => req.cookies?.['jwt'],
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }
  async validate(payload: any): Promise<any> {
    if (payload.role !== Role.ADMIN) {
      throw new UnauthorizedException('You must be admin.');
    }
    return { email: payload.email, role: payload.role, id: payload.id };
  }
}
