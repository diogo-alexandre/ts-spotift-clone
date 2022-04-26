import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createUsersMigration1650993380035 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'users',
      columns: [
        {
          name: 'id',
          type: 'char',
          isPrimary: true,
          isGenerated: true,
          generationStrategy: 'uuid'
        },
        {
          name: 'name',
          type: 'varchar(30)',
          isNullable: false
        },
        {
          name: 'email',
          type: 'varchar',
          isUnique: true,
          isNullable: false
        },
        {
          name: 'password',
          type: 'char(60)',
          isNullable: false
        },
        {
          name: 'is_verified',
          type: 'boolean',
          default: false,
          isNullable: false
        },
        {
          name: 'created_at',
          type: 'datetime',
          default: 'now()'
        },
        {
          name: 'updated_at',
          type: 'datetime',
          default: 'now()',
          onUpdate: 'now()'
        }
      ]
    }));
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users');
  }
}
