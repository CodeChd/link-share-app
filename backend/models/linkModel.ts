import mongoose from "mongoose";

const linkSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  linkItems: [
    {
      name: {
        type: String,
        required: true,
      },
      link: {
        type: String,
      },
      image: {
        type: String,
        required: true,
      },
    },
  ],
});

const Link = mongoose.model("Link", linkSchema);

export default Link;