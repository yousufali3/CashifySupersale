import Razorpay from "razorpay";
import Order from "../models/Order.js";

const razorpay = new Razorpay({
  key_id: "rzp_test_okYGIC10jpEwlo",
  key_secret: "lgIi3xS7fTt4Ak6zMBz0dzgc",
});

export const processPayment = async (req, res) => {
  try {
    const { orderId } = req.body;

    // Validate orderId
    if (!orderId) {
      return res.status(400).json({ error: "Order ID is required" });
    }

    // Fetch the order from the database
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    // Create a payment order in Razorpay
    const payment = await razorpay.orders.create({
      amount: order.totalAmount * 100, // Amount in paise (smallest currency unit)
      currency: "INR",
      receipt: orderId,
    });

    if (!payment) {
      return res.status(500).json({ error: "Failed to create payment" });
    }

    // Respond with the Razorpay payment order
    res.json(payment);
  } catch (error) {
    console.error("Process payment error:", error);
    res.status(500).json({ error: "Failed to process payment" });
  }
};

export const getPaymentStatus = async (req, res) => {
  try {
    const { paymentId } = req.params;
    const payment = await razorpay.payments.fetch(paymentId);
    res.json(payment);
  } catch (error) {
    console.error("Get payment status error:", error);
    res.status(500).json({ error: "Failed to get payment status" });
  }
};

export const refundPayment = async (req, res) => {
  try {
    const { paymentId } = req.params;
    const refund = await razorpay.payments.refund(paymentId);
    res.json(refund);
  } catch (error) {
    console.error("Refund payment error:", error);
    res.status(500).json({ error: "Failed to refund payment" });
  }
};
