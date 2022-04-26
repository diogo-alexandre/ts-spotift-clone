import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createReleasesMigration1650984300096 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'releases',
      columns: [
        {
          name: 'id',
          type: 'char',
          isPrimary: true,
          isGenerated: true,
          generationStrategy: 'uuid'
        },
        {
          name: 'artist_id',
          type: 'char(36)',
          isNullable: false
        },
        {
          name: 'name',
          type: 'varchar(30)',
          isNullable: false
        },
        {
          name: 'category',
          type: 'enum',
          enum: ['0', '1', '2'],
          isNullable: false
        },
        {
          name: 'release_date',
          type: 'date',
          isNullable: false
        },
        {
          name: 'created_at',
          type: 'datetime',
          default: 'now()'
        }
      ],
      foreignKeys: [
        {
          columnNames: ['artist_id'],
          referencedColumnNames: ['id'],
          referencedTableName: 'artists'
        }
      ]
    }));
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('releases');
  }
}
