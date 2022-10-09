import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AdminGuard } from '../../auth/guard/admin.guard';
import { OwnAccessGuard } from '../../auth/guard/own-access.guard';
import { User, UserData, UserInput } from '../model';
import { IdInput, LoginInput, UpdateInput } from '../model/user.input';
import { UserService } from '../service';

@Controller('user')
@ApiTags('user')
@ApiBearerAuth()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  @UseGuards(OwnAccessGuard)
  @ApiResponse({ status: HttpStatus.OK, type: UserData })
  async getUser(@Param('id') id: string): Promise<UserData> {
    return this.userService.getUserOrFail(id);
  }

  @Get()
  @ApiResponse({ status: HttpStatus.OK, type: Array<UserData> })
  @UseGuards(AdminGuard)
  async getUsers(): Promise<User[]> {
    return await this.userService.getUsers();
  }

  @Post()
  @ApiResponse({ status: HttpStatus.CREATED })
  async createUser(@Body() data: UserInput): Promise<void> {
    await this.userService.createUser(data);
  }

  @Post('compare')
  @UseGuards(OwnAccessGuard)
  @ApiResponse({ status: HttpStatus.OK, type: UserData })
  async comparePassword(@Body() data: LoginInput): Promise<UserData> {
    return await this.userService.comparePassword(data.email, data.password);
  }

  @Put(':id')
  @UseGuards(OwnAccessGuard)
  @ApiResponse({ status: HttpStatus.OK })
  async updateUser(
    @Param() { id }: IdInput,
    @Body() data: UpdateInput,
  ): Promise<UserData> {
    return this.userService.updateUser(id, data);
  }

  @Delete(':id')
  @UseGuards(OwnAccessGuard)
  @ApiResponse({ status: HttpStatus.OK })
  async deleteUser(@Param() { id }: IdInput): Promise<void> {
    return this.userService.deleteUser(id);
  }
}
