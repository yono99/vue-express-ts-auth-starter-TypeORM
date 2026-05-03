import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { AppDataSource } from "../config/data-source";
import { User } from "../models/User";

export class UserController {
  // Get profile sendiri
  static async getProfile(req: Request, res: Response) {
    const user = req.user as User;
    return res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      unit: user.unit,
    });
  }

  // Update profile (nama, email, unit)
  static async updateProfile(req: Request, res: Response) {
    try {
      const user = req.user as User;
      const { name, email, unit } = req.body;

      const userRepo = AppDataSource.getRepository(User);

      // Cek email sudah dipakai user lain
      if (email && email !== user.email) {
        const existing = await userRepo.findOne({ where: { email } });
        if (existing) return res.status(400).json({ message: "Email sudah dipakai" });
      }

      await userRepo.update(user.id, { name, email, unit });

      return res.json({ message: "Profile berhasil diupdate" });
    } catch (err) {
      return res.status(500).json({ message: "Server error" });
    }
  }

  // Ganti password
  static async changePassword(req: Request, res: Response) {
    try {
      const user = req.user as User;
      const { oldPassword, newPassword } = req.body;

      const userRepo = AppDataSource.getRepository(User);
      const found = await userRepo.findOne({ where: { id: user.id } });

      if (!found) return res.status(404).json({ message: "User tidak ditemukan" });

      // Cek password lama
      const isMatch = await bcrypt.compare(oldPassword, found.password);
      if (!isMatch) return res.status(400).json({ message: "Password lama salah" });

      // Hash password baru
      const hashed = await bcrypt.hash(newPassword, 10);
      await userRepo.update(user.id, { password: hashed });

      return res.json({ message: "Password berhasil diubah" });
    } catch (err) {
      return res.status(500).json({ message: "Server error" });
    }
  }
}