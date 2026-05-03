import { Request, Response } from "express";
import passport from "passport";
import bcrypt from "bcrypt";
import { AppDataSource } from "../config/data-source";
import { User } from "../models/User";

export class AuthController {
  // Login
static login(req: Request, res: Response) {
  passport.authenticate("local", (err: any, user: any, info: any) => {
    if (err) return res.status(500).json({ message: "Server error" });
    if (!user) return res.status(401).json({ message: info?.message || "Login gagal" });

    req.logIn(user, async (err) => {
      if (err) return res.status(500).json({ message: "Login error" });

      // Isi kolom tambahan di tabel sessions
      await AppDataSource.query(
        `UPDATE sessions SET user_id = ?, ip_address = ?, user_agent = ? WHERE id = ?`,
        [
          user.id,
          req.ip || req.socket.remoteAddress,
          req.headers["user-agent"] || "unknown",
          req.sessionID,
        ]
      );

      return res.status(200).json({
        message: "Login berhasil",
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          unit: user.unit,
        },
      });
    });
  })(req, res);
}

  // Logout
  static logout(req: Request, res: Response) {
    req.logout((err) => {
      if (err) return res.status(500).json({ message: "Logout error" });
      req.session.destroy(() => {
        res.clearCookie("connect.sid");
        return res.status(200).json({ message: "Logout berhasil" });
      });
    });
  }

  // Get current user (cek siapa yang login)
  static me(req: Request, res: Response) {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Belum login" });
    }
    const user = req.user as User;
    return res.status(200).json({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      unit: user.unit,
    });
  }

  // Register (opsional, buat tambah user baru)
  static async register(req: Request, res: Response) {
    try {
      const { name, email, password, role, unit } = req.body;

      const userRepo = AppDataSource.getRepository(User);

      // Cek email sudah ada
      const existing = await userRepo.findOne({ where: { email } });
      if (existing) return res.status(400).json({ message: "Email sudah terdaftar" });

      // Hash password
      const hashed = await bcrypt.hash(password, 10);

      const user = userRepo.create({ name, email, password: hashed, role, unit });
      await userRepo.save(user);

      return res.status(201).json({ message: "User berhasil dibuat" });
    } catch (err) {
      return res.status(500).json({ message: "Server error" });
    }
  }
}