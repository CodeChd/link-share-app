import { Request, Response, NextFunction } from "express";
import asyncHandler from "./asyncHandler";
import jwt, { JwtPayload } from "jsonwebtoken";
import User from "../models/userModel";

interface CustomRequest extends Request {
  user?: any;
}

export const authUser = asyncHandler(
  async (req: CustomRequest, res: Response, next: NextFunction) => {
    let token = req.cookies.jwt;

    if (token) {
      const decode = jwt.verify(
        token,
        process.env.JWT_SECRET as string
      ) as JwtPayload;
      req.user = await User.findById(decode.userId).select("-password");
      next();
    } else {
      res.status(401);
      throw new Error("Not Authorized, no token");
    }
  }
);
