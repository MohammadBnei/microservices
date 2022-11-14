import { Entity, Filter, PrimaryKey, Property, wrap } from '@mikro-orm/core';
import { ProductData } from './product.data';
import { ProductInput } from './product.input';

@Entity()
@Filter({
  name: 'name',
  cond: (args) => ({ name: new RegExp(`${args.name}`) }),
})
export class Product {
  @PrimaryKey()
  id!: number;

  @Property()
  name: string;

  @Property()
  quantity: number;

  @Property()
  price: number;

  toJSON(): ProductData {
    const product = wrap(this).toObject() as Product;

    return {
      ...product,
      id: `${product.id}`,
    };
  }

  constructor(newProduct: ProductInput) {
    wrap(this).assign({ ...newProduct } as any);
    this.name = newProduct.name?.toLowerCase().trim();
    this.quantity = newProduct.quantity;
  }
}
