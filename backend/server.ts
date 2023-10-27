import express, { Request, Response } from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes";
import connectDB from "./config/db";
dotenv.config();
const port = process.env.PORT || 3000;
connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.send("Api is running...");
});

app.use("/api/users", userRoutes);

app.listen(port, () => console.log(`Server is running on port${port}`));
