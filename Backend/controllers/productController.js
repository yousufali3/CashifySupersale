import Product from "../models/Product.js";
import { uploadImagesToCloudinary } from "../utils/uploadtocloudinary.js"; // Adjust import path as necessary

// Product creation with image upload
export const createProduct = async (req, res) => {
  try {
    // Destructure fields from req.body
    const {
      model,
      storage,
      color,
      condition,
      price,
      originalReleaseYear,
      batteryHealth,
      description,
      inStock,
      serialNumber,
      isUnlocked,
      originalAccessories,
      seller,
    } = req.body;

    // Ensure required fields are provided
    if (
      !model ||
      !storage ||
      !color ||
      !condition ||
      !price ||
      !originalReleaseYear ||
      !batteryHealth ||
      !description ||
      !serialNumber ||
      !seller
    ) {
      return res
        .status(400)
        .json({ error: "All required fields must be provided" });
    }

    // Handle multiple file uploads
    const imageFiles = req.files;
    const filePaths = imageFiles.map((file) => file.path);

    const imageUrls = await uploadImagesToCloudinary(filePaths);

    if (imageUrls.length === 0) {
      return res.status(400).json({ error: "No images were uploaded" });
    }

    // Create the product
    const product = new Product({
      model,
      storage,
      color,
      condition,
      price,
      originalReleaseYear,
      batteryHealth,
      description,
      images: imageUrls, // Cloudinary image URLs
      inStock: inStock || 1,
      serialNumber,
      isUnlocked: isUnlocked || false,
      originalAccessories: originalAccessories || [],
      seller,
    });

    await product.save();
    res.status(201).json({ message: "Product created successfully", product });
  } catch (error) {
    console.error("Create product error:", error);
    res.status(500).json({ error: "Failed to create product" });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({ isActive: true });
    res.json(products);
  } catch (error) {
    console.error("Get all products error:", error);
    res.status(500).json({ error: "Failed to retrieve products" });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    console.error("Get product by ID error:", error);
    res.status(500).json({ error: "Failed to retrieve product" });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { images, ...updateData } = req.body;
    console.log(updateData);
    const product = await Product.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json({ message: "Product updated successfully", product });
  } catch (error) {
    console.error("Update product error:", error);
    res
      .status(500)
      .json({ error: "Failed to update product", details: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Delete product error:", error);
    res.status(500).json({ error: "Failed to delete product" });
  }
};
