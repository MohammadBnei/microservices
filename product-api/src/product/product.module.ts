import { Module } from '@nestjs/common';
import { ProductService } from './service';
import { ProductController } from './controller/product.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Product } from './model';
import { CommonModule } from '../common';

@Module({
  imports: [MikroOrmModule.forFeature({ entities: [Product] }), CommonModule],
  providers: [ProductService],
  controllers: [ProductController],
  exports: [ProductService],
})
export class ProductModule {}
