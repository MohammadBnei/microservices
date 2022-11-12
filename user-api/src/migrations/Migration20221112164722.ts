import { Migration } from '@mikro-orm/migrations';

export class Migration20221112164722 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      "create table `user` (`id` int unsigned not null auto_increment primary key, `firstname` varchar(255) null, `lastname` varchar(255) null, `email` varchar(255) not null, `password` varchar(255) not null, `role` enum('buyer', 'seller', 'admin') not null, `credit` float not null) default character set utf8mb4 engine = InnoDB;",
    );
    this.addSql('alter table `user` add index `user_email_index`(`email`);');
    this.addSql('alter table `user` add unique `user_email_unique`(`email`);');
  }
}
