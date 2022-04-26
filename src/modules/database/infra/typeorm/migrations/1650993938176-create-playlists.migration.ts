import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createPlaylistsMigration1650993938176 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'playlists',
      columns: [
        {
          name: 'id',
          type: 'char',
          isPrimary: true,
          isGenerated: true,
          generationStrategy: 'uuid'
        },
        {
          name: 'user_id',
          type: 'char(36)',
          isNullable: false
        },
        {
          name: 'name',
          type: 'varchar(30)',
          isNullable: false
        },
        {
          name: 'about',
          type: 'varchar(140)',
          default: '\'\'',
          isNullable: false
        },
        {
          name: 'created_at',
          type: 'datetime',
          default: 'now()',
          isNullable: false
        }
      ],
      foreignKeys: [
        {
          columnNames: ['user_id'],
          referencedColumnNames: ['id'],
          referencedTableName: 'users'
        }
      ]
    }));
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('playlists');
  }
}
