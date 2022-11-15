import { Module } from '@nestjs/common';
import { ProductService } from './service';
import { ProductController } from './controller/product.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Product } from './model';
import { CommonModule } from '../common';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    MikroOrmModule.forFeature({ entities: [Product] }),
    CommonModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '5m' },
    }),
    UserModule,
  ],
  providers: [ProductService],
  controllers: [ProductController],
  exports: [ProductService],
})
export class ProductModule {}
