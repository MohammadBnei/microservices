import { Controller, Get, HttpStatus, Req, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt.guard';

@Controller('payment')
@ApiTags('payment')
export class PaymentController {
  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiResponse({ status: HttpStatus.OK })
  get(@Req() req) {
    return { user: req.user };
  }
}
