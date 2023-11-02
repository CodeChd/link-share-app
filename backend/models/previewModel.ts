import mongoose from "mongoose";

const previewSchema = new mongoose.Schema({
  userId: {
    type: Number,
    required: true,
  },
  profileImage: {
    type: String,
    required: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
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
        required: true,
      },
      image: {
        type: String,
        required: true,
      },
    },
  ],
});

const Preview = mongoose.model("Preview", previewSchema);

export default Preview;
