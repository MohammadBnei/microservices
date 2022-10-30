import { Migration } from '@mikro-orm/migrations';

export class Migration20221029174757 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table `product` (`id` int unsigned not null auto_increment primary key, `name` varchar(255) not null, `quantity` int not null) default character set utf8mb4 engine = InnoDB;');
  }

}
