import { MigrationInterface, QueryRunner } from "typeorm";

export class migration1683619465794 implements MigrationInterface {
    name = 'migration1683619465794'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`article\` ADD \`title\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`article\` ADD \`perex\` text NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`article\` ADD \`content\` text NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`article\` CHANGE \`updated_at\` \`updated_at\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`article\` CHANGE \`updated_at\` \`updated_at\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`article\` CHANGE \`updated_at\` \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`article\` CHANGE \`updated_at\` \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`article\` DROP COLUMN \`content\``);
        await queryRunner.query(`ALTER TABLE \`article\` DROP COLUMN \`perex\``);
        await queryRunner.query(`ALTER TABLE \`article\` DROP COLUMN \`title\``);
    }

}
