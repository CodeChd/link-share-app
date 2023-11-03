import User from "./models/userModel";
import bcrypt from "bcryptjs";
import connectDB from "./config/db";

const ImportUser = async () => {
  try {
    await connectDB();
    await User.deleteMany({});

    await User.insertMany([
      {
        email: "cj@gmail.com",
        password: bcrypt.hashSync("handsome123"),
      },
      {
        email: "john@gmail.com",
        password: bcrypt.hashSync("handsome123"),
      },
    ]);

    console.log("UserData Imported");
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await connectDB();
    await User.deleteMany();
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  ImportUser();
}
