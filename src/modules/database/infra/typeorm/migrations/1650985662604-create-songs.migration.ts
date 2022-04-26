import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createSongsMigration1650985662604 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'songs',
      columns: [
        {
          name: 'id',
          type: 'char',
          isPrimary: true,
          isGenerated: true,
          generationStrategy: 'uuid'
        },
        {
          name: 'release_id',
          type: 'char(36)',
          isNullable: false
        },
        {
          name: 'name',
          type: 'varchar(30)',
          isNullable: false
        },
        {
          name: 'duration',
          type: 'smallint',
          unsigned: true
        }
      ],
      foreignKeys: [
        {
          columnNames: ['release_id'],
          referencedColumnNames: ['id'],
          referencedTableName: 'releases'
        }
      ]
    }));
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('songs');
  }
}
