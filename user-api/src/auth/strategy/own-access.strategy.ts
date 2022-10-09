import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Role } from '../../tokens';

@Injectable()
export class OwnAccessStrategy extends PassportStrategy(
  Strategy,
  'own-access',
) {
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

  async validate(request: Request, payload: any): Promise<any> {
    if (payload.role === Role.ADMIN || +request.params?.id === +payload.id) {
      return { email: payload.email, role: payload.role };
    }
    throw new UnauthorizedException("This isn't yours and you are not admin.");
  }
}
