import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class addSoftDeleteArtistsMigration1651603816359 implements MigrationInterface {
  private readonly column = new TableColumn({
    name: 'deleted_at',
    type: 'datetime',
    isNullable: true,
    default: null
  })

  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn('artists', this.column);
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('artists', this.column);
  }
}
