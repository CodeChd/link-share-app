import express from "express";
import { saveLinks } from "../controllers/linksController";
import { authUser } from "../middleware/authHandler";

const router = express.Router();

router.route("/").post(authUser, saveLinks);

export default router;
