import express from "express";
import { authenticateToken, isAdmin } from "../middleware/auth.js";
import {
  getUserProfile,
  updateUserProfile,
  getAllUsers,
  deleteUser,
} from "../controllers/userController.js";

const router = express.Router();

router.use(authenticateToken);

router.get("/profile", getUserProfile);
router.put("/profile", updateUserProfile);

router.use(isAdmin);

router.get("/", getAllUsers);
router.delete("/:id", deleteUser);

export default router;
