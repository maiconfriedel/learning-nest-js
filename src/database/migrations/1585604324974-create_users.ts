import { MigrationInterface, QueryRunner, Table } from 'typeorm';

// eslint-disable-next-line @typescript-eslint/class-name-casing
export class createUsers1585604324974 implements MigrationInterface {
  private table = new Table({
    name: 'users',
    columns: [
      {
        name: 'id',
        type: 'integer',
        isPrimary: true,
        isGenerated: true, // Auto-increment
        generationStrategy: 'increment',
      },
      {
        name: 'email',
        type: 'varchar',
        length: '255',
        isUnique: true,
        isNullable: false,
      },
      {
        name: 'username',
        type: 'varchar',
        length: '255',
        isUnique: true,
        isNullable: false,
      },
      {
        name: 'created_at',
        type: 'timestamptz',
        isNullable: false,
      },
      {
        name: 'updated_at',
        type: 'timestamptz',
        isNullable: false,
      },
    ],
  });

  public async up(queryRunner: QueryRunner): Promise<any> {
    return queryRunner.createTable(this.table);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    return queryRunner.dropTable(this.table);
  }
}
