import cors from "cors";
import express, { Request, Response } from "express";
import morgan from "morgan";
import { Readable } from "stream";
import { mastra } from "./mastra/index";
import "dotenv/config";
const app = express();
const port = 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("dev"));

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, world!");
});

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, world!");
});

app.post("/api/chat", async (req, res) => {
  const { messages } = req.body;
  const agent = mastra.getAgent("weatherAgent");
  const result = await agent.stream(messages, { format: "aisdk" });
  const standardResponse = result.toUIMessageStreamResponse();
  standardResponse.headers.forEach((value, key) => {
    res.setHeader(key, value);
  });
  res.status(standardResponse.status);
  if (standardResponse.body) {
    Readable.fromWeb(standardResponse.body as any).pipe(res);
  } else {
    res.end();
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
