import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserData } from '../../user/entity';
import { UserService } from '../../user/service';
import { SellerGuard } from '../../auth/guard/seller.guard';
import { ProductData, ProductInput } from '../model';
import { IdInput, ProductQuery } from '../model/product.input';
import { ProductService } from '../service';

@Controller('product')
@ApiTags('product')
@ApiBearerAuth()
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  @Get()
  @ApiResponse({ status: HttpStatus.OK, type: ProductData })
  async getProduct(
    @Query() { id, name }: ProductQuery,
  ): Promise<ProductData | ProductData[]> {
    if (id) return this.productService.getProductOrFail(id.toString());
    if (name) return this.productService.filterProducts(name);

    return await this.productService.getProducts();
  }

  @Post()
  @UseGuards(SellerGuard)
  @ApiResponse({ status: HttpStatus.CREATED })
  async createProduct(@Body() data: ProductInput, @Req() req): Promise<void> {
    const { userId } = data;
    const jwt = this.jwtService.sign(req.user);
    let user: UserData;
    try {
      user = await this.userService.findUser(userId, jwt);
    } catch (error) {
      throw new HttpException('invalid user id', HttpStatus.BAD_REQUEST);
    }

    if (!user?.id)
      throw new HttpException('invalid user id', HttpStatus.BAD_REQUEST);

    return this.productService.createProduct(data);
  }

  @Put(':id')
  @UseGuards(SellerGuard)
  @ApiResponse({ status: HttpStatus.OK })
  async updateProduct(
    @Param() { id }: IdInput,
    @Body() data: ProductInput,
  ): Promise<ProductData> {
    return this.productService.updateProduct(id, data);
  }

  @Delete(':id')
  @UseGuards(SellerGuard)
  @ApiResponse({ status: HttpStatus.OK })
  async deleteProduct(@Param() { id }: IdInput): Promise<void> {
    return this.productService.deleteProduct(id);
  }
}
