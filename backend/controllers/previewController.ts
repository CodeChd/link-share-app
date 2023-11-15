import {Request, Response} from "express";
import asyncHandler from "../middleware/asyncHandler";
import User from "../models/userModel";
import Preview from "../models/previewModel";
import Link from "../models/linkModel";

interface CustomRequest extends Request {
    user?: any;
}

//@desc Create users public profile
//@routes POST /api/users
//@access Private
const createPreviewProfile = asyncHandler(
    async (req: CustomRequest, res: Response) => {
        const user = await User.findById(req.user._id);
        const link = await Link.findOne({user: req.user._id});
        let userProfile = await Preview.findOne({
            userId: Number(req.body.userId),
        });

        if (!user) {
            res.status(404);
            throw new Error("User profile not found!");
        }

        if (!userProfile) {
            userProfile = new Preview({
                profileImage: user.image,
                fullName: `${user.firstName ?? ""} ${user.lastName ?? ""}`,
                email: user.email,
                linkItems: link?.linkItems,
            });
        } else {
            const existingUser = req.body.userId == userProfile.userId;
            if (existingUser) {
                userProfile.fullName =
                    `${user.firstName ?? ""} ${user.lastName ?? ""}` ||
                    userProfile.fullName;
                userProfile.email = user.email ?? userProfile.email;
                userProfile.profileImage = user.image ?? userProfile.profileImage;
            }

            if (link) {
                userProfile.linkItems = link?.linkItems ?? [];
            }
        }

        const preview = await userProfile?.save();

        res.status(200).json(preview);
    }
);

//@desc Fetch user public profile
//@routes GET /api/users/:id/preview
//@access Public
const getUserPublicProfile = asyncHandler(
    async (req: Request, res: Response) => {
        const preview = await Preview.findOne({userId: req.params.id});

        if (preview) {
            res.status(200).json(preview);
        } else {
            res.status(404);
            throw new Error("User profile not found!");
        }
    }
);

export {createPreviewProfile, getUserPublicProfile};
