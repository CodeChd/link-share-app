import asyncHandler from "../middleware/asyncHandler";
import express, { Request, Response } from "express";
import multer from "multer";
import { cloudinary } from "../config/cloudinary";

const router = express.Router();

const storage = multer.diskStorage({
  filename(req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage,
});

router.post(
  "/",
  upload.single("image"),
  asyncHandler(async (req: Request, res: Response) => {
    try {
      const cloudinaryAny: any = cloudinary;

      const result = await cloudinaryAny.uploader.upload(req.file?.path);

      res.status(200).json({
        message: "Image Uploaded",
        image: result.secure_url,
      });
    } catch (error) {
      res.status(200).json({
        message: "Image upload failed!",
      });
    }
  })
);

export default router;
