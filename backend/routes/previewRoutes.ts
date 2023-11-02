import { Router } from "express";
import { authUser } from "../middleware/authHandler";
import { createPreviewProfile } from "../controllers/previewController";

const router = Router();

router.route("/").post(authUser, createPreviewProfile);

export default router;
