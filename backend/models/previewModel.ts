import mongoose, { Document, Model } from "mongoose";

interface LinkItem {
  name: string;
  link: string;
  image: string;
}

interface PreviewDocument extends Document {
  userId: number;
  profileImage: string;
  fullName: string;
  email: string;
  linkItems: LinkItem[];
  created_at: Date;
  updated_at: Date;
}

const previewSchema = new mongoose.Schema({
  userId: {
    type: Number,
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
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

previewSchema.pre("save", async function (next) {
  try {
    if (this.isNew) {
      const count = await Preview.countDocuments();
      this.userId = count + 1;
    }
    this.updated_at = new Date();
    if (!this.created_at) {
      this.created_at = new Date();
    }
    next();
  } catch (err: any) {
    next(err);
  }
});

const Preview: Model<PreviewDocument> = mongoose.model<PreviewDocument>(
  "Preview",
  previewSchema
);

export default Preview;
