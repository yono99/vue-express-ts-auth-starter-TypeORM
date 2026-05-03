import { Router } from "express";
import { AuthController } from "../controllers/AuthController";
import { isAuthenticated, isAdmin } from "../middleware/auth";

const router = Router();

// Public routes
router.post("/login", AuthController.login);
router.post("/logout", AuthController.logout);

// Protected routes
router.get("/me", isAuthenticated, AuthController.me);
router.post("/register", isAuthenticated, isAdmin, AuthController.register);

export default router;