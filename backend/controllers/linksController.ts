import { Request, Response } from "express";
import asyncHandler from "../middleware/asyncHandler";
import Link from "../models/linkModel";
import User from "../models/userModel";

interface CustomRequest extends Request {
  user?: any;
}

//@desc Save links to db
//@routes POST /api/links
//@access Private
const saveLinks = asyncHandler(async (req: CustomRequest, res: Response) => {
  const { linkItem } = req.body;
  interface LinkType {
    id: number;
    image: string;
    name: string;
    link: string;
  }

  const user = await User.findById(req.user._id);

  if (user) {
    const saveLinkItems = new Link({
      user: user._id,
      linkItems: linkItem.map((x: LinkType) => ({
        name: x.name,
        image: x.image,
        link: x.link,
      })),
    });

    const newLinks = await saveLinkItems.save();
    res.status(201).json(newLinks);
  } else {
    res.status(400);
    throw new Error("Invalid resource");
  }
});

//@desc Fetch all links
//@routes GET /api/links
//@access Private
const getLinks = asyncHandler(async (req: CustomRequest, res: Response) => {
  const userLink = await Link.find({ user: req.user._id });

  if (userLink) {
    res.status(200).json(userLink);
  } else {
    res.status(404);
    throw new Error("Links not found!");
  }
});

export { saveLinks, getLinks };
