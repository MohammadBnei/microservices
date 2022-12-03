import { Migration } from '@mikro-orm/migrations';

export class Migration20221115162129 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table `payment` (`id` int unsigned not null auto_increment primary key, `product_id` varchar(255) not null, `buyer_id` varchar(255) not null, `seller_id` varchar(255) not null, `created_at` json not null, `updated_at` json not null) default character set utf8mb4 engine = InnoDB;');
  }

}
