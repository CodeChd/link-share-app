import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes";
import linkRoutes from "./routes/linkRoutes";
import uploadRoute from "./routes/uploadImageRoute";
import connectDB from "./config/db";
import { errorHandler, notFound } from "./middleware/errorHandler";

dotenv.config();
const port = process.env.PORT || 3000;
connectDB();

const app = express();

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/links", linkRoutes);
app.use("/api/upload", uploadRoute);

app.use(notFound);
app.use(errorHandler);

app.get("/", (req: Request, res: Response) => {
  res.send("Api is running...");
});

app.listen(port, () => console.log(`Server is running on port ${port}`));
