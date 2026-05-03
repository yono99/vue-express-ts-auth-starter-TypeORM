import { MigrationInterface, QueryRunner } from "typeorm";

export class LandBook1777668245513 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE land_books (
                id INT AUTO_INCREMENT PRIMARY KEY,
                nomer_hak VARCHAR(255) NOT NULL,
                jenis_hak VARCHAR(255) NOT NULL,
                desa_kecamatan VARCHAR(255) NOT NULL,
                status_alih_media VARCHAR(255) DEFAULT 'null',
                file_path VARCHAR(255) NULL,
                createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
         await queryRunner.query(`DROP TABLE land_books`);
    }

}
