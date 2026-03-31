import express, { type Request, type Response } from "express";
import cors from "cors";
import "dotenv/config";
import aiRoutes from "./routes/ai.routes.js";

const app = express();
const port = 4000;

app.use(express.json({ limit: "50mb" }));
app.use(cors());

//routes

app.use("/api/ai", aiRoutes);

app.get("/", (_req: Request, res: Response) => {
  res.send("hello");
});

app.listen(port, () => {
  console.log(`server started ${port}`);
});
