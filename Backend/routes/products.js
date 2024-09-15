import express from "express";
import { authenticateToken, isAdmin } from "../middleware/auth.js";

// Middleware to parse URL-encoded bodies

import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";
import upload from "../utils/multermiddleware.js";
const router = express.Router();

router.get("/", getAllProducts);
// router.get("/search", searchProducts);
router.get("/:id", getProductById);

// Remove this line
// router.use(authenticateToken);

router.post(
  "/",
  authenticateToken,
  isAdmin,
  upload.array("images", 5),
  createProduct
);
router.put("/:id", authenticateToken, isAdmin, updateProduct);
router.delete("/:id", authenticateToken, isAdmin, deleteProduct);

export default router;
