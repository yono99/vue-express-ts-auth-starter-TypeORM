import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { isAuthenticated } from "../middleware/auth";

const router = Router();

router.get("/profile", isAuthenticated, UserController.getProfile);
router.put("/profile", isAuthenticated, UserController.updateProfile);
router.put("/change-password", isAuthenticated, UserController.changePassword);

export default router;