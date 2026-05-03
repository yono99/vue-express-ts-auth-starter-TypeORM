import { MigrationInterface, QueryRunner } from "typeorm";

export class AddAllEntities1777794900108 implements MigrationInterface {
    name = 'AddAllEntities1777794900108'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`loans\` DROP FOREIGN KEY \`fk_loans_landbook\``);
        await queryRunner.query(`DROP INDEX \`email\` ON \`users\``);
        await queryRunner.query(`CREATE TABLE \`staff\` (\`id\` int NOT NULL AUTO_INCREMENT, \`username\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`role\` varchar(255) NOT NULL DEFAULT 'admin', UNIQUE INDEX \`IDX_35aafb5ad218f3ff1ff70e281e\` (\`username\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`email_verified_at\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`remember_token\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`profile_photo_path\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`no_hp\``);
        await queryRunner.query(`ALTER TABLE \`users\` ADD UNIQUE INDEX \`IDX_97672ac88f789774dd47f7c8be\` (\`email\`)`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`role\` \`role\` varchar(50) NOT NULL DEFAULT 'staff'`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`unit\` \`unit\` varchar(50) NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`createdAt\``);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`updatedAt\``);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`loans\` CHANGE \`due_date\` \`due_date\` timestamp NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`loans\` CHANGE \`return_date\` \`return_date\` timestamp NULL`);
        await queryRunner.query(`ALTER TABLE \`loans\` CHANGE \`status\` \`status\` enum ('borrowed', 'returned') NOT NULL DEFAULT 'borrowed'`);
        await queryRunner.query(`ALTER TABLE \`loans\` DROP COLUMN \`createdAt\``);
        await queryRunner.query(`ALTER TABLE \`loans\` ADD \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`loans\` DROP COLUMN \`updatedAt\``);
        await queryRunner.query(`ALTER TABLE \`loans\` ADD \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`loans\` CHANGE \`land_book_id\` \`land_book_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`land_books\` CHANGE \`status_alih_media\` \`status_alih_media\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`land_books\` CHANGE \`file_path\` \`file_path\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`land_books\` DROP COLUMN \`createdAt\``);
        await queryRunner.query(`ALTER TABLE \`land_books\` ADD \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`land_books\` DROP COLUMN \`updatedAt\``);
        await queryRunner.query(`ALTER TABLE \`land_books\` ADD \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`loans\` ADD CONSTRAINT \`FK_fb2783af65623571f7656a29384\` FOREIGN KEY (\`land_book_id\`) REFERENCES \`land_books\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`loans\` DROP FOREIGN KEY \`FK_fb2783af65623571f7656a29384\``);
        await queryRunner.query(`ALTER TABLE \`land_books\` DROP COLUMN \`updatedAt\``);
        await queryRunner.query(`ALTER TABLE \`land_books\` ADD \`updatedAt\` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP()`);
        await queryRunner.query(`ALTER TABLE \`land_books\` DROP COLUMN \`createdAt\``);
        await queryRunner.query(`ALTER TABLE \`land_books\` ADD \`createdAt\` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP()`);
        await queryRunner.query(`ALTER TABLE \`land_books\` CHANGE \`file_path\` \`file_path\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`land_books\` CHANGE \`status_alih_media\` \`status_alih_media\` varchar(255) NULL DEFAULT ''null''`);
        await queryRunner.query(`ALTER TABLE \`loans\` CHANGE \`land_book_id\` \`land_book_id\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`loans\` DROP COLUMN \`updatedAt\``);
        await queryRunner.query(`ALTER TABLE \`loans\` ADD \`updatedAt\` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP()`);
        await queryRunner.query(`ALTER TABLE \`loans\` DROP COLUMN \`createdAt\``);
        await queryRunner.query(`ALTER TABLE \`loans\` ADD \`createdAt\` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP()`);
        await queryRunner.query(`ALTER TABLE \`loans\` CHANGE \`status\` \`status\` enum ('borrowed', 'returned') NULL DEFAULT ''borrowed''`);
        await queryRunner.query(`ALTER TABLE \`loans\` CHANGE \`return_date\` \`return_date\` timestamp NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`loans\` CHANGE \`due_date\` \`due_date\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP()`);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`updatedAt\``);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`updatedAt\` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP()`);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`createdAt\``);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`createdAt\` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP()`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`unit\` \`unit\` varchar(50) NULL DEFAULT ''umum''`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`role\` \`role\` varchar(50) NULL DEFAULT ''umum''`);
        await queryRunner.query(`ALTER TABLE \`users\` DROP INDEX \`IDX_97672ac88f789774dd47f7c8be\``);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`no_hp\` varchar(20) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`profile_photo_path\` varchar(2048) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`remember_token\` varchar(100) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`email_verified_at\` timestamp NULL DEFAULT 'NULL'`);
        await queryRunner.query(`DROP INDEX \`IDX_35aafb5ad218f3ff1ff70e281e\` ON \`staff\``);
        await queryRunner.query(`DROP TABLE \`staff\``);
        await queryRunner.query(`CREATE UNIQUE INDEX \`email\` ON \`users\` (\`email\`)`);
        await queryRunner.query(`ALTER TABLE \`loans\` ADD CONSTRAINT \`fk_loans_landbook\` FOREIGN KEY (\`land_book_id\`) REFERENCES \`land_books\`(\`id\`) ON DELETE CASCADE ON UPDATE RESTRICT`);
    }

}
