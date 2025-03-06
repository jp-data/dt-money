import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableTransactions1741269649294
    implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "transactions" (
        "id" SERIAL PRIMARY KEY,
        "description" VARCHAR(100) NOT NULL,
        "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
        "price" FLOAT NOT NULL,
        "category" VARCHAR(100) NOT NULL,
        "type" VARCHAR(20) NOT NULL,
        "userId" UUID NOT NULL,
        FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE
      );
      `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('DROP TABLE IF EXISTS "transactions";');
    }
}
