import { Migration } from '@mikro-orm/migrations';

export class Migration20221009013451 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table `user` modify `id` int unsigned not null auto_increment;');
  }

  async down(): Promise<void> {
    this.addSql('alter table `user` modify `id` varchar(255) not null;');
  }

}
