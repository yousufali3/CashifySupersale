import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    model: {
      type: String,
      required: [true, "iPhone model is required"],
      trim: true,
    },
    storage: {
      type: Number,
      required: [true, "Storage capacity is required"],
      enum: [16, 32, 64, 128, 256, 512, 1024], // in GB
    },
    color: {
      type: String,
      required: [true, "Color is required"],
      trim: true,
    },
    condition: {
      type: String,
      required: [true, "Condition is required"],
      enum: ["Excellent", "Good", "Fair", "Poor"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price cannot be negative"],
    },
    originalReleaseYear: {
      type: Number,
      required: [true, "Original release year is required"],
    },
    batteryHealth: {
      type: Number,
      min: 0,
      max: 100,
      required: [true, "Battery health percentage is required"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },
    images: [
      {
        type: String,
        required: [true, "At least one image URL is required"],
      },
    ],
    inStock: {
      type: Number,
      required: [true, "Stock quantity is required"],
      min: [0, "Stock quantity cannot be negative"],
      default: 1,
    },
    serialNumber: {
      type: String,
      required: [true, "Serial number is required"],
    },
    isUnlocked: {
      type: Boolean,
      default: false,
    },

    seller: {
      type: String,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Virtual for url
productSchema.virtual("url").get(function () {
  return `/products/${this._id}`;
});

// Static method to find products by model
// productSchema.statics.findByModel = function (model) {
//   return this.find({ model: new RegExp(model, "i") });
// };

// Instance method to update stock
productSchema.methods.updateStock = function (quantity) {
  this.inStock += quantity;
  return this.save();
};

const Product = mongoose.model("Product", productSchema);

export default Product;
