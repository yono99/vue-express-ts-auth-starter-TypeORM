import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Loan } from "./Loan";

@Entity("land_books")
export class LandBook {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", length: 255 })
  nomer_hak!: string;

  @Column({ type: "varchar", length: 255 })
  jenis_hak!: string;

  @Column({ type: "varchar", length: 255 })
  desa_kecamatan!: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  status_alih_media!: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  file_path!: string;

  @OneToMany(() => Loan, (loan) => loan.landBook)
  loans!: Loan[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}