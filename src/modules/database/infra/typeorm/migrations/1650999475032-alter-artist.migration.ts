import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from 'typeorm';

export class alterArtistMigration1650999475032 implements MigrationInterface {
  private readonly column = new TableColumn({
    name: 'user_id',
    type: 'char(36)',
    isNullable: false
  })

  private readonly foreignKey = new TableForeignKey({
    name: 'FK_artist_user',
    columnNames: ['user_id'],
    referencedColumnNames: ['id'],
    referencedTableName: 'users'
  })

  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn('artists', this.column);
    await queryRunner.createForeignKey('artists', this.foreignKey);
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('artists', this.foreignKey);
    await queryRunner.dropColumn('artists', this.column);
  }
}
