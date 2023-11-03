import { Router } from "express";
import { authUser } from "../middleware/authHandler";
import {
  createPreviewProfile,
  getUserPublicProfile,
} from "../controllers/previewController";

const router = Router();

router.route("/").post(authUser, createPreviewProfile);
router.route("/:id/profile").get(getUserPublicProfile);

export default router;
