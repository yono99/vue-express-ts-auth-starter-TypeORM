import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateLoansTable1777690668604 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE loans (
                id INT AUTO_INCREMENT PRIMARY KEY,
                borrower_phone VARCHAR(20) NOT NULL,
                land_book_id INT NOT NULL,
                book_number VARCHAR(50) NOT NULL,
                 due_date TIMESTAMP NOT NULL,  
                 return_date TIMESTAMP NULL,   
                status ENUM('borrowed','returned') DEFAULT 'borrowed',
                createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                CONSTRAINT fk_loans_landbook FOREIGN KEY (land_book_id) REFERENCES land_books(id) ON DELETE CASCADE
            )
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE loans`);
  }
}
