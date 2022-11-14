import { BeforeUpdate, Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class Payment {
  @PrimaryKey()
  id: number;

  @Property()
  productId: string;

  @Property()
  buyerId: string;

  @Property()
  sellerId: string;

  @Property()
  created_at = new Date();

  @Property()
  updated_at = new Date();

  @BeforeUpdate()
  async beforeUpdate() {
    this.updated_at = new Date();
  }
}
