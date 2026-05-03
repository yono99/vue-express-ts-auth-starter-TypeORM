import { Request, Response, NextFunction } from "express";

export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated()) return next();
  return res.status(401).json({ message: "Unauthorized, silakan login dulu" });
};

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  const user = req.user as any;
  if (user?.role === "admin") return next();
  return res.status(403).json({ message: "Forbidden, hanya admin yang bisa akses" });
};