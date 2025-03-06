import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableUsers1741269509149 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "users" (
                "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                "name" VARCHAR(30) NOT NULL,
                "email" VARCHAR(70) NOT NULL,
                "password" VARCHAR(250) NOT NULL,
                "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
            );
            `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('DROP TABLE IF EXISTS "transactions";');
    }
}
