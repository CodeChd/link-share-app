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
  const user = await User.findById(req.user._id);

  interface LinkType {
    image: string;
    name: string;
    link: string;
  }

  if (!user) {
    res.status(400);
    throw new Error("Invalid resource");
  }

  let link = await Link.findOne({ user: req.user._id });

  if (!link) {
    link = new Link({
      user: user._id,
      linkItems: linkItem.map((x: LinkType) => ({
        name: x.name,
        link: x.link,
        image: x.image,
      })),
    });
  } else {
    link.linkItems = linkItem.map((x: LinkType) => ({
      name: x.name,
      link: x.link,
      image: x.image,
    }));
  }

  const newLinks = await link.save();
  res.status(201).json(newLinks);
});

//@desc Fetch a user links
//@routes GET /api/links
//@access Private
const getLinks = asyncHandler(async (req: CustomRequest, res: Response) => {
  const userLink = await Link.findOne({ user: req.user._id });

  if (userLink) {
    res.status(200).json(userLink);
  } else {
    res.status(404);
    throw new Error("Links not found!");
  }
});

export { saveLinks, getLinks };
