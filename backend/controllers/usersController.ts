import { Request, Response } from "express";
import { Document } from "mongoose";
import asyncHandler from "../middleware/asyncHandler";
import User from "../models/userModel";
import generateToken from "../utils/generateToken";

//@desc Login user
//@routes POST /api/user/login
//@access Public
const loginUser = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  // Document type
  interface UserDocument extends Document {
    email: string;
    matchPassword: (enteredPassword: string) => Promise<boolean>;
  }

  const user = (await User.findOne({ email })) as UserDocument;

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);

    res.status(200).json({
      id: user._id,
      email: user.email,
    });
  } else {
    res.status(404);
    throw new Error("Invalid email or password");
  }
});

export { loginUser };
