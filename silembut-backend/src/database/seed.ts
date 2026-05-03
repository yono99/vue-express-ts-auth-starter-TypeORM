import "dotenv/config";
import "reflect-metadata";
import bcrypt from "bcrypt";
import { AppDataSource } from "../config/data-source";
import { User } from "../models/User";

const seed = async () => {
  await AppDataSource.initialize();

  const userRepo = AppDataSource.getRepository(User);

  const existing = await userRepo.findOne({ where: { email: "admin@silembut.com" } });
  if (existing) {
    console.log("Admin sudah ada");
    process.exit(0);
  }

  const hashed = await bcrypt.hash("password123", 10);
  const admin = userRepo.create({
    name: "yono",
    email: "admin@silembut.com",
    password: hashed,
    role: "admin",
    unit: "bukutanah",
  });

  await userRepo.save(admin);
  console.log("Admin berhasil dibuat!");
  process.exit(0);
};

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});