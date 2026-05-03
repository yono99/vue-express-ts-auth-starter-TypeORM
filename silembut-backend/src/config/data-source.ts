import "dotenv/config";
import { DataSource } from "typeorm";
import { Staff } from "../models/Staff";
import { User } from "../models/User";
import { LandBook } from "../models/LandBook";
import { Loan } from "../models/Loan";
 
export const AppDataSource = new DataSource({
  
  type: "mysql",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [Staff, User, LandBook, Loan],
  migrations: ["src/database/migrations/*.ts"],
  synchronize: false, // ← matikan, pakai migration saja
  logging: process.env.NODE_ENV === "development",
  
});
