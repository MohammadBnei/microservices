import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { BadRequestException, Injectable } from '@nestjs/common';
import { ProductData } from '../model/product.data';
import { Product } from '../model/product.entity';
import { ProductInput } from '../model/product.input';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly pr: EntityRepository<Product>,
  ) {}

  async getProducts(): Promise<ProductData[]> {
    const products = await this.pr.findAll();
    return products.map((p) => p.toJSON());
  }

  async getProductOrFail(query: string): Promise<ProductData> {
    const product = await this.getProduct(query);

    if (!product) {
      throw new BadRequestException('Product not found');
    }

    return product;
  }

  async getProduct(query: string): Promise<ProductData> {
    let product;
    if (/^\d$/.test(query)) {
      product = await this.pr.findOne({ id: +query });
    } else if (/\S+@\S+\.\S+/.test(query)) {
      product = await this.pr.findOne({ name: query });
    }

    return product?.toJSON() || null;
  }

  async filterProducts(name: string): Promise<ProductData[]> {
    const products = await this.pr.find(
      {},
      {
        filters: { name: { name } },
      },
    );
    return products.map((p) => p.toJSON());
  }

  async createProduct(data: ProductInput): Promise<void> {
    const found = await this.getProduct(data.name);
    if (found) {
      throw new BadRequestException('Product name already taken');
    }
    const newProduct = new Product(data);
    return this.pr.persistAndFlush(newProduct);
  }

  async updateProduct(
    id: string | number,
    data: ProductInput,
  ): Promise<ProductData> {
    const product = await this.pr.findOne({ id: +id });

    if (!product) {
      throw new BadRequestException('Product not found');
    }

    this.pr.assign(product, data);
    await this.pr.persistAndFlush(product);

    return product.toJSON();
  }

  async deleteProduct(id: string | number): Promise<void> {
    const product = await this.pr.findOne({ id: +id });

    if (!product) {
      throw new BadRequestException('Product not found');
    }

    await this.pr.remove(product);
    return this.pr.flush();
  }
}
