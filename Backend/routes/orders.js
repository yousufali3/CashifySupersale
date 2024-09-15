import express from "express";
import { authenticateToken, isAdmin } from "../middleware/auth.js";
import {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrderStatus,
  cancelOrder,
  getUserOrders,
  getOrdersByStatus,
} from "../controllers/orderController.js";

const router = express.Router();

router.use(authenticateToken);

router.post("/", createOrder);
router.get("/user", getUserOrders);
router.get("/:id", getOrderById);
router.patch("/:id/cancel", cancelOrder);

// Admin routes
router.get("/", isAdmin, getAllOrders);
router.get("/status/:status", isAdmin, getOrdersByStatus);
router.patch("/:id/status", isAdmin, updateOrderStatus);

export default router;
