import { Migration } from '@mikro-orm/migrations';

export class Migration20221009173327 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table `user` modify `firstname` varchar(255) null, modify `lastname` varchar(255) null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table `user` modify `firstname` varchar(255) not null, modify `lastname` varchar(255) not null;');
  }

}
