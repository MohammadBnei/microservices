import { Migration } from '@mikro-orm/migrations';

export class Migration20221114104707 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table `product` add `user_id` varchar(255) not null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table `product` drop `user_id`;');
  }

}
