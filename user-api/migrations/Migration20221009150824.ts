import { Migration } from '@mikro-orm/migrations';

export class Migration20221009150824 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table `user` modify `role` enum(\'buyer\', \'seller\', \'admin\') not null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table `user` modify `role` enum(\'buyer\', \'seller\') not null;');
  }

}
