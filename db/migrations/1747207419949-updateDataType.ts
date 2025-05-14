import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateDataType1747207419949 implements MigrationInterface {
    name = 'UpdateDataType1747207419949'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`customer\` CHANGE \`status\` \`status\` varchar(255) NOT NULL DEFAULT 01`);
        await queryRunner.query(`ALTER TABLE \`company\` CHANGE \`status\` \`status\` varchar(255) NOT NULL DEFAULT 01`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`status\` \`status\` varchar(255) NOT NULL DEFAULT 01`);
        await queryRunner.query(`ALTER TABLE \`note\` CHANGE \`status\` \`status\` varchar(255) NOT NULL DEFAULT 01`);
        await queryRunner.query(`ALTER TABLE \`note_image\` CHANGE \`file_size\` \`file_size\` decimal(10,2) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`note_image\` CHANGE \`status\` \`status\` varchar(255) NOT NULL DEFAULT 01`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`note_image\` CHANGE \`status\` \`status\` varchar(255) NOT NULL DEFAULT '1'`);
        await queryRunner.query(`ALTER TABLE \`note_image\` CHANGE \`file_size\` \`file_size\` decimal(6,2) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`note\` CHANGE \`status\` \`status\` varchar(255) NOT NULL DEFAULT '1'`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`status\` \`status\` varchar(255) NOT NULL DEFAULT '1'`);
        await queryRunner.query(`ALTER TABLE \`company\` CHANGE \`status\` \`status\` varchar(255) NOT NULL DEFAULT '1'`);
        await queryRunner.query(`ALTER TABLE \`customer\` CHANGE \`status\` \`status\` varchar(255) NOT NULL DEFAULT '1'`);
    }

}
