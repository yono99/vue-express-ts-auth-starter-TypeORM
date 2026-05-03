import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { LandBook } from "./LandBook";

@Entity("loans")
export class Loan {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", length: 20 })
  borrower_phone!: string;

  @Column({ type: "varchar", length: 50 })
  book_number!: string;

  @Column({ type: "timestamp" })
  due_date!: Date;

  @Column({ type: "timestamp", nullable: true })
  return_date!: Date;

  @Column({ type: "enum", enum: ["borrowed", "returned"], default: "borrowed" })
  status!: string;

  @ManyToOne(() => LandBook, (landBook) => landBook.loans)
  @JoinColumn({ name: "land_book_id" })
  landBook!: LandBook;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}