import { MigrationInterface, QueryRunner } from "typeorm";

export class Users1777668672628 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
         // users table
        await queryRunner.query(`
            CREATE TABLE users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL UNIQUE,
                email_verified_at TIMESTAMP NULL,
                password VARCHAR(255) NOT NULL,
                remember_token VARCHAR(100) NULL,
                role VARCHAR(50) DEFAULT 'umum',
                unit VARCHAR(50) DEFAULT 'umum',
                profile_photo_path VARCHAR(2048) NULL,
                no_hp VARCHAR(20) NOT NULL,
                createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            )
        `);

        // password_reset_tokens table
        await queryRunner.query(`
            CREATE TABLE password_reset_tokens (
                email VARCHAR(255) PRIMARY KEY,
                token VARCHAR(255) NOT NULL,
                created_at TIMESTAMP NULL
            )
        `);

        // sessions table
        await queryRunner.query(`
            CREATE TABLE sessions (
                id VARCHAR(255) PRIMARY KEY,
                user_id INT NULL,
                ip_address VARCHAR(45) NULL,
                user_agent TEXT NULL,
                payload LONGTEXT NOT NULL,
                last_activity INT NOT NULL,
                INDEX (user_id),
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
            )
        `);
    
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
           await queryRunner.query(`DROP TABLE sessions`);
        await queryRunner.query(`DROP TABLE password_reset_tokens`);
        await queryRunner.query(`DROP TABLE users`);
    
    }

}
