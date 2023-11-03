import jwt from "jsonwebtoken";
import { Response } from "express";
import { Types } from "mongoose";

export default function generateToken(
  res: Response,
  userId: string | Types.ObjectId
) {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET as string, {
    expiresIn: "1d",
  });

  res.cookie("jwt", token, {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV !== "development",
    maxAge: 30 * 30 * 60 * 60 * 200,
  });
}
