import { Controller, Get, HttpStatus, Inject } from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { HelloService } from '../service';
import { LoggerService, Config } from '../../common';
import { Service } from '../../tokens';
import { HelloData } from '../model';

@Controller()
@ApiTags('hello')
export class HelloController {
  constructor(
    @Inject(Service.CONFIG)
    private readonly config: Config,
    private readonly logger: LoggerService,
    private readonly helloService: HelloService,
  ) {}

  @Get('hello')
  @ApiResponse({ status: HttpStatus.OK, type: HelloData })
  getHello(): { message: string } {
    this.logger.info(JSON.stringify(this.config));
    return this.helloService.getHello();
  }
}
