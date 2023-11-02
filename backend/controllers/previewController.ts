import { Request, Response } from "express";
import { Document } from "mongoose";
import asyncHandler from "../middleware/asyncHandler";
import User from "../models/userModel";
import Preview from "../models/previewModel";
import Link from "../models/linkModel";

interface CustomRequest extends Request {
  user?: any;
}

//@desc Fetch users profile by id
//@routes POST /api/users/preview
//@access Private
const createPreviewProfile = asyncHandler(
  async (req: CustomRequest, res: Response) => {
    const { userId } = req.body;
    const user = await User.findById(req.user._id);
    const link = await Link.findOne({ user: req.user._id });
    let userProfile = await Preview.findOne({ userId });

    if (!user) {
      res.status(404);
      throw new Error("User profile not found!");
    }

    if (!link) {
      res.status(404);
      throw new Error("Link not found!");
    }

    if (!userProfile) {
      userProfile = new Preview({
        userId,
        profileImage: user.image,
        fullName: `${user.firstName} ${user.lastName}`,
        email: user.email,
        linkItems: link?.linkItems,
      });
    } else {
      userProfile.fullName =
        `${user.firstName} ${user.lastName}` || userProfile.fullName;
      userProfile.email = user.email || userProfile.email;
      userProfile.profileImage = user.image || userProfile.profileImage;
      userProfile.linkItems = link?.linkItems;
    }

    const preview = await userProfile?.save();

    res.status(200).json(preview);
  }
);

export { createPreviewProfile };
