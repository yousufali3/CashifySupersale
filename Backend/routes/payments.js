import express from "express";
import { authenticateToken } from "../middleware/auth.js";
import {
  processPayment,
  getPaymentStatus,
  refundPayment,
} from "../controllers/paymentController.js";

const router = express.Router();

router.use(authenticateToken);

router.post("/process", processPayment);
router.get("/status/:paymentId", getPaymentStatus);
router.post("/refund/:paymentId", refundPayment);

export default router;
