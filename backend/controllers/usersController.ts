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

//@desc Register User
//@routes POST /api/users/register
//@access Public
const registerUser = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const userExist = await User.findOne({ email });

  if (userExist) {
    res.status(400);
    throw new Error("User already exist!");
  }

  if (email.length === 0 || password.length === 0) {
    res.status(400);
    throw new Error("Email or Password can't be empty!");
  }

  const user = await User.create({
    email,
    password,
  });

  if (user) {
    generateToken(res, user._id);

    res.status(201).json({
      isloggedIn: true,
      message: "User have been registered!",
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

//@desc Update user profile
//@routes PUT /api/users/profile
//@access Private
const updateProfile = asyncHandler(
  async (req: CustomRequest, res: Response) => {
    const { firstName, lastName, email, image } = req.body;
    const user = await User.findOne(req.user._id);

    if (user) {
      user.firstName = firstName || user.firstName;
      user.lastName = lastName || lastName;
      user.email = email || user.email;
      user.image = image || user.image;

      await user.save();

      res.status(200).json({
        message: "User profile updated!",
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
      image: string;
    }

    const user = (await User.findById(req.user._id).select(
      "-password"
    )) as UserDocument;

    if (user) {
      res.status(200).json({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        image: user.image,
      });
    } else {
      res.status(404);
      throw new Error("User not found!");
    }
  }
);

export { loginUser, registerUser, updateProfile, getUserProfile };
