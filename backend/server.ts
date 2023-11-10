import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes";
import linkRoutes from "./routes/linkRoutes";
import uploadRoute from "./routes/uploadImageRoute";
import previewRoute from "./routes/previewRoutes";
import connectDB from "./config/db";
import { errorHandler, notFound } from "./middleware/errorHandler";
import path from "path";

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
app.use("/api/preview", previewRoute);

if (process.env.NODE_ENV === ("production" as string)) {
  const __dirname = path.resolve();

  app.use(express.static(path.join(__dirname, "/frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
} else {
  app.get("/", (req: Request, res: Response) => {
    res.send("Api is running...");
  });
}

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server is running on port ${port}`));
