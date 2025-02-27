import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class RelationUserTransactions1740680216517
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'transactions',
      new TableColumn({
        name: 'userId',
        type: 'uuid',
        isNullable: false,
      }),
    );

    await queryRunner.createForeignKey(
      'transactions',
      new TableForeignKey({
        columnNames: ['userId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'CASCADE',
      }),
    );
  }
  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('transactions');
    const foreignKey = table?.foreignKeys.find((fk) =>
      fk.columnNames.includes('userId'),
    );
    if (foreignKey) {
      await queryRunner.dropForeignKey('transactions', foreignKey);
    }
    await queryRunner.dropColumn('transactions', 'userId');
  }
}
