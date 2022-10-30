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
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SellerGuard } from '../../auth/guard/seller.guard';
import { Product, ProductData, ProductInput } from '../model';
import { IdInput, ProductQuery } from '../model/product.input';
import { ProductService } from '../service';

@Controller('product')
@ApiTags('product')
@ApiBearerAuth()
export class ProductController {
  constructor(private readonly productService: ProductService) {}

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
  createProduct(@Body() data: ProductInput): Promise<void> {
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
