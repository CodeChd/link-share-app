import { Request, Response } from "express";
import { Document } from "mongoose";
import asyncHandler from "../middleware/asyncHandler";
import User from "../models/userModel";
import generateToken from "../utils/generateToken";

interface CustomRequest extends Request {
  user?: any;
}

//@desc Login user
//@routes POST /api/users/login
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
      isloggedIn: true,
      message: "Successfully logged in!",
    });
  } else {
    res.status(404);
    throw new Error("Invalid email or password");
  }
});

//@desc Update user profile
//@routes PUT /api/users/profile
//@access Private
const updateProfile = asyncHandler(
  async (req: CustomRequest, res: Response) => {
    const { firstName, lastName, email } = req.body;
    const user = await User.findOne(req.user._id);

    if (user) {
      user.firstName = firstName;
      user.lastName = lastName;
      user.email = email || user.email;

      await user.save();

      res.status(200).json({
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      });
    } else {
      res.status(404);
      throw new Error("User not found!");
    }
  }
);

//@desc Get user profile
//@routes PUT /api/users/:id
//@access Private
const getUserProfile = asyncHandler(
  async (req: CustomRequest, res: Response) => {
    interface UserDocument extends Document {
      firstName: string;
      lastName: string;
      email: string;
    }

    const user = (await User.findById(req.user._id).select(
      "-password"
    )) as UserDocument;

    if (user) {
      res.status(200).json({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      });
    } else {
      res.status(404);
      throw new Error("User not found!");
    }
  }
);

export { loginUser, updateProfile, getUserProfile };
