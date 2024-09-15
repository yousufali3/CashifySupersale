import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary
cloudinary.config({
  cloud_name: "dkkuh5iig",
  api_key: "222396557852865",
  api_secret: "lq2DyWwyzVR31AT0KKg13mnJD4M",
});

// Configure multer to use Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "products", // Folder name in Cloudinary
    allowed_formats: ["jpg", "png", "jpeg"],
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
}).array("images", 5);

const uploadMiddleware = (req, res, next) => {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      console.error("Multer error:", err);
      return res.status(400).json({ error: err.message });
    } else if (err) {
      console.error("Unknown error:", err);
      return res
        .status(500)
        .json({ error: "An error occurred during file upload" });
    }

    next();
  });
};

export default uploadMiddleware;
