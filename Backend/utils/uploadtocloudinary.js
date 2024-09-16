import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Function to upload a single image
const uploadSingleImage = async (localpath) => {
  try {
    if (!localpath) {
      return null;
    }

    const response = await cloudinary.uploader.upload(localpath, {
      resource_type: "auto",
    });

    fs.unlinkSync(localpath);
    return response.secure_url;
  } catch (error) {
    fs.unlinkSync(localpath);
    throw new Error(error.message);
  }
};

// Function to handle multiple image uploads
export const uploadImagesToCloudinary = async (filePaths) => {
  if (!Array.isArray(filePaths) || filePaths.length === 0) {
    throw new Error("No files provided for upload.");
  }

  try {
    const uploadPromises = filePaths.map(uploadSingleImage);
    const imageUrls = await Promise.all(uploadPromises);
    return imageUrls;
  } catch (error) {
    console.error("Error uploading images:", error);
    throw new Error("Failed to upload images.");
  }
};
