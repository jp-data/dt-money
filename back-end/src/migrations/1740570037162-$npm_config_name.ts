import { MigrationInterface, QueryRunner } from 'typeorm';

export class $npmConfigName1740570037162 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "transactions" ADD "createdAt" TIMESTAMP DEFAULT now()`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "transactions" DROP COLUMN "createdAt"`,
    );
  }
}
