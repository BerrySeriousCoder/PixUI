import express, { type Request, type Response } from "express";

const app = express();
const port = 4000;

app.get("/", (_req: Request, res: Response) => {
  res.send("hello");
});

app.listen(port, () => {
  console.log(`server started ${port}`);
});
