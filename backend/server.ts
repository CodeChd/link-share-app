import express, { Request, Response } from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes";
dotenv.config();
const port = process.env.PORT || 3000;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Api is running...");
});

app.use("/api/user", userRoutes);

app.listen(port, () => console.log(`Server is running on port${port}`));
