import {
  Body,
  Controller,
  Post,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { LoginInput } from '../../user/model';
import { AuthService } from '../service';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(
    @Request() req,
    @Res({ passthrough: true }) res: Response,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @Body() _: LoginInput,
  ) {
    const [user, jwt] = [req.user, await this.authService.login(req.user)];

    res.cookie('jwt', jwt, {
      httpOnly: true,
      secure: true,
    });

    return { user, jwt };
  }
}
