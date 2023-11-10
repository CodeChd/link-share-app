import mongoose from "mongoose";

// for docker
// const env = process.env.MONGO_URL || "mongodb://127.0.0.1:27017/devlinks";

const env =
  (process.env.MONGO_URL as string) ||
  (process.env.MONGO_URI as string) ||
  "mongodb://127.0.0.1:27017/devlinks";
async function connectDB() {
  try {
    await mongoose.connect(env);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

export default connectDB;
