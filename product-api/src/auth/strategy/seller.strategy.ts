import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Role } from '../../tokens';

@Injectable()
export class SellerStrategy extends PassportStrategy(Strategy, 'seller') {
  constructor(private moduleRef: ModuleRef) {
    super({
      passReqToCallback: true,
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => req.cookies?.['jwt'],
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(_: Request, payload: any): Promise<any> {
    if (payload.role === Role.ADMIN || payload.role === Role.SELLER) {
      return { email: payload.email, role: payload.role };
    }
    throw new UnauthorizedException('you must be admin or seller');
  }
}
