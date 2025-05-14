import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateRelation1747208099793 implements MigrationInterface {
    name = 'UpdateRelation1747208099793'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`note_image\` DROP FOREIGN KEY \`FK_1b0af17dd2b709d90c035a1d047\``);
        await queryRunner.query(`DROP INDEX \`REL_1b0af17dd2b709d90c035a1d04\` ON \`note_image\``);
        await queryRunner.query(`ALTER TABLE \`customer\` CHANGE \`status\` \`status\` varchar(255) NOT NULL DEFAULT 01`);
        await queryRunner.query(`ALTER TABLE \`company\` CHANGE \`status\` \`status\` varchar(255) NOT NULL DEFAULT 01`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`status\` \`status\` varchar(255) NOT NULL DEFAULT 01`);
        await queryRunner.query(`ALTER TABLE \`note_image\` CHANGE \`status\` \`status\` varchar(255) NOT NULL DEFAULT 01`);
        await queryRunner.query(`ALTER TABLE \`note\` CHANGE \`status\` \`status\` varchar(255) NOT NULL DEFAULT 01`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`note\` CHANGE \`status\` \`status\` varchar(255) NOT NULL DEFAULT '1'`);
        await queryRunner.query(`ALTER TABLE \`note_image\` CHANGE \`status\` \`status\` varchar(255) NOT NULL DEFAULT '1'`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`status\` \`status\` varchar(255) NOT NULL DEFAULT '1'`);
        await queryRunner.query(`ALTER TABLE \`company\` CHANGE \`status\` \`status\` varchar(255) NOT NULL DEFAULT '1'`);
        await queryRunner.query(`ALTER TABLE \`customer\` CHANGE \`status\` \`status\` varchar(255) NOT NULL DEFAULT '1'`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_1b0af17dd2b709d90c035a1d04\` ON \`note_image\` (\`note_id\`)`);
        await queryRunner.query(`ALTER TABLE \`note_image\` ADD CONSTRAINT \`FK_1b0af17dd2b709d90c035a1d047\` FOREIGN KEY (\`note_id\`) REFERENCES \`note\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
