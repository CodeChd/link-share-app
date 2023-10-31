import express from "express";
import {
  getUserProfile,
  loginUser,
  updateProfile,
} from "../controllers/usersController";
import { authUser } from "../middleware/authHandler";

const router = express.Router();

router.route("/login").post(loginUser);
router.route("/profile").put(authUser, updateProfile);
router.get("/info", authUser, getUserProfile);

export default router;
