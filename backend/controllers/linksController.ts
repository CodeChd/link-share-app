import { Request, Response } from "express";
import asyncHandler from "../middleware/asyncHandler";
import Link from "../models/linkModel";
import User from "../models/userModel";

//@desc Save links to db
//@routes POST /api/links
//@access Private
interface CustomRequest extends Request {
  user?: any;
}
const saveLinks = asyncHandler(async (req: CustomRequest, res: Response) => {
  const { linkItem } = req.body;

  const user = await User.findById(req.user._id);

  interface LinkType {
    id: number;
    image: string;
    name: string;
    link: string;
  }

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

export { saveLinks };
