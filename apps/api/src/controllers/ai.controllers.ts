import type { Request, Response } from "express";
import { runVisionAgent } from "../agents/vision.agent.js";
import { runCodeAgent } from "../agents/code.agent.js";

export const handleGenerate = async (req: Request, res: Response) => {
  try {
    const { imageBase64, prompt } = req.body;

    if (!imageBase64) {
      res.status(400).json({ error: "Missing Image Payload" });
      return;
    }

    const rawBase64 = imageBase64.includes(",")
      ? imageBase64.split(",")[1]
      : imageBase64;

    console.log("1. vision agent analysing component");

    const analysisJson = await runVisionAgent(rawBase64);

    console.log("running code agent");

    const stream = await runCodeAgent(rawBase64, analysisJson, prompt);

    stream.pipeTextStreamToResponse(res);
  } catch (error) {
    (console.error("orchestration Error:", error),
      res.status(500).json({ error: "internal error occurred" }));
  }
};
