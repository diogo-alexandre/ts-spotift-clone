import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createArtistsMigration1650982011644 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'artists',
      columns: [
        {
          name: 'id',
          type: 'char(36)',
          isPrimary: true,
          isGenerated: true,
          generationStrategy: 'uuid'
        },
        {
          name: 'name',
          type: 'varchar(60)',
          isNullable: false
        },
        {
          name: 'about',
          type: 'varchar(140)',
          default: '\'\'',
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
    await queryRunner.dropTable('artists');
  }
}
