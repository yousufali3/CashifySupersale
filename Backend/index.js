import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectToDatabase from "./config/database.js";
import authRoutes from "./routes/auth.js";
import productRoutes from "./routes/products.js";
import orderRoutes from "./routes/orders.js";
import userRoutes from "./routes/users.js";
import paymentRoutes from "./routes/payments.js";

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
connectToDatabase();

// Routes

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/users", userRoutes);
app.use("/api/payments", paymentRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Folder structure:
// - models/
//   - User.js
//   - Product.js
//   - Order.js
// - routes/
//   - auth.js
//   - products.js
//   - orders.js
//   - users.js
//   - payments.js
// - controllers/
//   - authController.js
//   - productController.js
//   - orderController.js
//   - userController.js
//   - paymentController.js
// - middleware/
//   - auth.js
// - config/
//   - database.js
// - utils/
//   - helpers.js
// - .env
// - package.json
// - index.js (this file)

// Note: Make sure to add "type": "module" to your package.json file
// and use .js extension when importing local files
