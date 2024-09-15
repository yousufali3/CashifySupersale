import Order from "../models/Order.js";
import Product from "../models/Product.js";

export const createOrder = async (req, res) => {
  try {
    const { products, shippingAddress, paymentMethod } = req.body;
    const order = new Order({
      user: req.user._id,
      products,
      shippingAddress,
      paymentMethod,
    });

    // Calculate total amount and update product stock
    for (const item of products) {
      const product = await Product.findById(item.product);
      if (!product) {
        return res
          .status(404)
          .json({ error: `Product not found: ${item.product}` });
      }
      if (product.inStock < item.quantity) {
        return res
          .status(400)
          .json({ error: `Insufficient stock for product: ${product.model}` });
      }
      item.price = product.price;
      await product.updateStock(-item.quantity);
    }

    order.calculateTotalAmount();
    await order.save();

    res.status(201).json(order);
  } catch (error) {
    console.error("Create order error:", error);
    res.status(500).json({ error: "Failed to create order" });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("user", "username email");
    res.json(orders);
  } catch (error) {
    console.error("Get all orders error:", error);
    res.status(500).json({ error: "Failed to retrieve orders" });
  }
};

export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      "user",
      "username email"
    );
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }
    res.json(order);
  } catch (error) {
    console.error("Get order by ID error:", error);
    res.status(500).json({ error: "Failed to retrieve order" });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }
    res.json(order);
  } catch (error) {
    console.error("Update order status error:", error);
    res.status(500).json({ error: "Failed to update order status" });
  }
};

export const cancelOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }
    console.log(order.status);
    if (order.status !== "Pending") {
      return res
        .status(400)
        .json({ error: "Cannot cancel order that is not pending" });
    }
    order.status = "Cancelled";
    await order.save();

    // Restore product stock
    for (const item of order.products) {
      await Product.findByIdAndUpdate(item.product, {
        $inc: { inStock: item.quantity },
      });
    }

    res.json(order);
  } catch (error) {
    console.error("Cancel order error:", error);
    res.status(500).json({ error: "Failed to cancel order" });
  }
};

export const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id });
    res.json(orders);
  } catch (error) {
    console.error("Get user orders error:", error);
    res.status(500).json({ error: "Failed to retrieve user orders" });
  }
};

export const getOrdersByStatus = async (req, res) => {
  try {
    const { status } = req.params;
    const orders = await Order.findByStatus(status);
    res.json(orders);
  } catch (error) {
    console.error("Get orders by status error:", error);
    res.status(500).json({ error: "Failed to retrieve orders by status" });
  }
};
