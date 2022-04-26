import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createSongHasArtistsMigration1650987256551 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'song_has_artists',
      columns: [
        {
          name: 'song_id',
          type: 'char(36)',
          isNullable: false
        },
        {
          name: 'artist_id',
          type: 'char(36)',
          isNullable: false
        }
      ],
      foreignKeys: [
        {
          columnNames: ['song_id'],
          referencedColumnNames: ['id'],
          referencedTableName: 'songs'
        },
        {
          columnNames: ['artist_id'],
          referencedColumnNames: ['id'],
          referencedTableName: 'artists'
        }
      ]
    }));
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('song_has_artists');
  }
}
