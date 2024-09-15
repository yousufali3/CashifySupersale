import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: "dkkuh5iig",
  api_key: "222396557852865",
  api_secret: "lq2DyWwyzVR31AT0KKg13mnJD4M",
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
