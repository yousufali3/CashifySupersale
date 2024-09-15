import express from "express";
import {
  login,
  refreshToken,
  forgotPassword,
  resetPassword,
  register,
} from "../controllers/authController.js";
import { authenticateToken } from "../controllers/authController.js";

const router = express.Router();

// Public routes
router.post("/register", register);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

// Protected routes
// router.use();
router.post("/refresh-token", authenticateToken, refreshToken);

export default router;
