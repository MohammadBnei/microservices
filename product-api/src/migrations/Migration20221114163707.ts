import { Migration } from '@mikro-orm/migrations';

export class Migration20221114163707 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table `product` add `price` int not null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table `product` drop `price`;');
  }

}
