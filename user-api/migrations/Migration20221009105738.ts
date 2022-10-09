import { Migration } from '@mikro-orm/migrations';

export class Migration20221009105738 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table `user` add `role` tinyint not null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table `user` drop `role`;');
  }

}
