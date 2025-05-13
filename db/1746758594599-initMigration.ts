import { MigrationInterface, QueryRunner } from "typeorm";
import * as bcrypt from 'bcrypt';
import { Company } from "src/resource/companies/entities/company.entity";
import { User } from "src/resource/users/entities/user.entity";
import {v4 as uuidv4} from 'uuid';

export class InitMigration1746758594599 implements MigrationInterface {
    name = 'InitMigration1746758594599'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`customer\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`company_id\` varchar(255) NOT NULL, \`status\` varchar(255) NOT NULL DEFAULT 01, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`deleted_by\` varchar(255) NULL, \`updated_by\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`company\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`address\` varchar(255) NOT NULL, \`telp\` varchar(255) NOT NULL, \`status\` varchar(255) NOT NULL DEFAULT 01, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`deleted_by\` varchar(255) NULL, \`updated_by\` varchar(255) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`username\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`role\` varchar(255) NOT NULL, \`company_id\` varchar(255) NOT NULL, \`status\` varchar(255) NOT NULL DEFAULT 01, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`deleted_by\` varchar(255) NULL, \`updated_by\` varchar(255) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`note\` (\`id\` varchar(36) NOT NULL, \`customer_id\` varchar(255) NOT NULL, \`title\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, \`date\` date NOT NULL, \`status\` varchar(255) NOT NULL DEFAULT 01, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`deleted_by\` varchar(255) NULL, \`updated_by\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`note_image\` (\`id\` varchar(36) NOT NULL, \`note_id\` varchar(255) NOT NULL, \`original_file_name\` varchar(255) NOT NULL, \`file_name\` varchar(255) NOT NULL, \`url\` varchar(255) NOT NULL, \`path\` varchar(255) NOT NULL, \`file_size\` decimal(6,2) NOT NULL, \`extension\` varchar(255) NOT NULL, \`status\` varchar(255) NOT NULL DEFAULT 01, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`deleted_by\` varchar(255) NULL, \`updated_by\` varchar(255) NOT NULL, UNIQUE INDEX \`REL_1b0af17dd2b709d90c035a1d04\` (\`note_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`customer\` ADD CONSTRAINT \`FK_170a73f2523d7ca266834e38ef1\` FOREIGN KEY (\`company_id\`) REFERENCES \`company\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD CONSTRAINT \`FK_9e70b5f9d7095018e86970c7874\` FOREIGN KEY (\`company_id\`) REFERENCES \`company\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`note\` ADD CONSTRAINT \`FK_96358fe4f7c932bdb72ce2f72f1\` FOREIGN KEY (\`customer_id\`) REFERENCES \`customer\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`note_image\` ADD CONSTRAINT \`FK_1b0af17dd2b709d90c035a1d047\` FOREIGN KEY (\`note_id\`) REFERENCES \`note\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        
        const uuid_gen = uuidv4();
        const passwordSuper = await bcrypt.hash('superuser123', 10);
        const passwordAdmin = await bcrypt.hash('admin123', 10);
        
        await queryRunner.manager.save(Company, [
            {
                id: uuid_gen,
                email: 'super@app.com',
                name: 'Kolink PT',
                address: "Pademangan, Sunter Jakarta Utara",
                telp: '089111333555',
            }
          ]),

        await queryRunner.manager.save(User, [
            {
                name: 'Superuser',
                email: 'super@app.com',
                username: 'superuser',
                password: passwordSuper,
                role: 'superuser',
                company_id: uuid_gen
            },
            {
                name: 'Admin',
                email: 'admin@app.com',
                username: 'admin',
                password: passwordAdmin,
                role: 'admin',
                company_id: uuid_gen
            }
        ]);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`note_image\` DROP FOREIGN KEY \`FK_1b0af17dd2b709d90c035a1d047\``);
        await queryRunner.query(`ALTER TABLE \`note\` DROP FOREIGN KEY \`FK_96358fe4f7c932bdb72ce2f72f1\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP FOREIGN KEY \`FK_9e70b5f9d7095018e86970c7874\``);
        await queryRunner.query(`ALTER TABLE \`customer\` DROP FOREIGN KEY \`FK_170a73f2523d7ca266834e38ef1\``);
        await queryRunner.query(`DROP INDEX \`REL_1b0af17dd2b709d90c035a1d04\` ON \`note_image\``);
        await queryRunner.query(`DROP TABLE \`note_image\``);
        await queryRunner.query(`DROP TABLE \`note\``);
        await queryRunner.query(`DROP TABLE \`user\``);
        await queryRunner.query(`DROP TABLE \`company\``);
        await queryRunner.query(`DROP TABLE \`customer\``);
    }

}
