import { Module } from '@nestjs/common';
import { ProductService } from './service';
import { ProductController } from './controller/product.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Product } from './model';
import { CommonModule } from '../common';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    MikroOrmModule.forFeature({ entities: [Product] }),
    CommonModule,
    UserModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '5m' },
    }),
  ],
  providers: [ProductService],
  controllers: [ProductController],
  exports: [ProductService],
})
export class ProductModule {}
