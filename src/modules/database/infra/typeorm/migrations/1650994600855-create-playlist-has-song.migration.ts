import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createPlaylistHasSongMigration1650994600855 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'playlist_has_song',
      columns: [
        {
          name: 'playlist_id',
          type: 'char(36)',
          isNullable: false
        },
        {
          name: 'song_id',
          type: 'char(36)',
          isNullable: false
        }
      ],
      foreignKeys: [
        {
          columnNames: ['playlist_id'],
          referencedColumnNames: ['id'],
          referencedTableName: 'playlists'
        },
        {
          columnNames: ['song_id'],
          referencedColumnNames: ['id'],
          referencedTableName: 'songs'
        }
      ]
    }));
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('playlist_has_song');
  }
}
