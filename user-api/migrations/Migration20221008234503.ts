import { Migration } from '@mikro-orm/migrations';

export class Migration20221008234503 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table `user` (`id` varchar(255) not null, `firstname` varchar(255) not null, `lastname` varchar(255) not null, `email` varchar(255) not null, `password` varchar(255) not null, primary key (`id`)) default character set utf8mb4 engine = InnoDB;',
    );
    this.addSql('alter table `user` add index `user_email_index`(`email`);');
    this.addSql('alter table `user` add unique `user_email_unique`(`email`);');
  }
}
