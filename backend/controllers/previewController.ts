import { Request, Response } from "express";
import { Document } from "mongoose";
import asyncHandler from "../middleware/asyncHandler";
import Link from "../models/linkModel";

interface CustomRequest extends Request {
  user?: any;
}

//@desc Fetch users profile by id
//@routes PUT /api/users/:id/preview
//@access Private
const previewProfile = asyncHandler(
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

export { loginUser, updateProfile, getUserProfile };
