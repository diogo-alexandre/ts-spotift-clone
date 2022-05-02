import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from 'typeorm';

export class addRelationshipSongMediaMigration1651513408929 implements MigrationInterface {
  private readonly column = new TableColumn({
    name: 'media_id',
    type: 'char(36)',
    isNullable: false
  })

  private readonly foreignKey = new TableForeignKey({
    name: 'FK_song_media',
    columnNames: ['media_id'],
    referencedColumnNames: ['id'],
    referencedTableName: 'medias'
  })

  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn('songs', this.column);
    await queryRunner.createForeignKey('songs', this.foreignKey);
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('songs', this.foreignKey);
    await queryRunner.dropColumn('songs', this.column);
  }
}
