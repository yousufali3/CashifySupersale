import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
        price: {
          type: Number,
          required: true,
          min: 0,
        },
      },
    ],
    totalAmount: {
      type: Number,
      required: true,
      min: 0,
    },
    shippingAddress: {
      street: String,
      city: String,
      state: String,
      postalCode: String,
      country: String,
    },
    status: {
      type: String,
      enum: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"],
      default: "Pending",
    },
    paymentMethod: {
      type: String,
      required: true,
      enum: ["Credit Card", "PayPal", "Bank Transfer"],
    },
    paymentStatus: {
      type: String,
      enum: ["Pending", "Completed", "Failed", "Refunded"],
      default: "Pending",
    },
    trackingNumber: String,
    notes: String,
  },
  {
    timestamps: true,
  }
);

// Virtual for order URL
orderSchema.virtual("url").get(function () {
  return `/orders/${this._id}`;
});

// Method to calculate total amount
orderSchema.methods.calculateTotalAmount = function () {
  this.totalAmount = this.products.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);
};

// Pre-save hook to calculate total amount
orderSchema.pre("save", function (next) {
  if (this.isModified("products")) {
    this.calculateTotalAmount();
  }
  next();
});

// Static method to find orders by status
orderSchema.statics.findByStatus = function (status) {
  return this.find({ status: status });
};

const Order = mongoose.model("Order", orderSchema);

export default Order;
