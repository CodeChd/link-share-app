import { Request, Response, Router } from "express";
import { getLinks, saveLinks } from "../controllers/linksController";
import { authUser } from "../middleware/authHandler";

const router = Router();

router.route("/").get(authUser, getLinks).post(authUser, saveLinks);

export default router;
