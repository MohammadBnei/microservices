import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserData } from 'src/user/model';
import { UserService } from 'src/user/service';
import { jwtOptions } from '../model/jwt-options';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    try {
      const user = await this.userService.comparePassword(email, password);

      return user;
    } catch (error) {}
  }

  login(user: UserData): string {
    const payload = user;
    return this.jwtService.sign(payload, {
      expiresIn: jwtOptions.expiresIn,
    });
  }
}
