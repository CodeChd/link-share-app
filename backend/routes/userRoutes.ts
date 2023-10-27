import express, { Request, Response } from "express";
import { loginUser } from "../controllers/usersController";

const router = express.Router();

router.route("/login").post(loginUser);

export default router;
