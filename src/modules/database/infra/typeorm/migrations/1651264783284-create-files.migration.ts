import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createFilesMigration1651264783284 implements MigrationInterface {
    public async up (queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(new Table({
        name: 'files',
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
            name: 'ext',
            type: 'varchar(4)',
            isNullable: false
          },
          {
            name: 'mimetype',
            type: 'varchar',
            isNullable: false
          },
          {
            name: 'size',
            type: 'int',
            unsigned: true,
            isNullable: false
          },
          {
            name: 'path',
            type: 'varchar(72)',
            isNullable: false
          },
          {
            name: 'created_at',
            type: 'datetime',
            default: 'now()',
            isNullable: false
          }
        ]
      }));
    }

    public async down (queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('files');
    }
}
