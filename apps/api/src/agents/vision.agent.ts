import { uiAnalysisSchema, type UIAnalysis } from "@repo/types";
import { generateObject, generateText, Output } from "ai";
import { defaultProvider } from "../utils/ai.utils.js";
import {
  VISION_SYSTEM_PROMPT,
  VISION_USER_PROMPT,
} from "../prompts/ai.prompts.js";

export const runVisionAgent = async (
  imageBase64: string,
): Promise<UIAnalysis> => {
  const { output } = await generateText({
    model: defaultProvider,
    output: Output.object({
      schema: uiAnalysisSchema,
    }),
    system: VISION_SYSTEM_PROMPT,
    messages: [
      {
        role: "user",
        content: [
          { type: "text", text: VISION_USER_PROMPT },
          { type: "image", image: imageBase64 },
        ],
      },
    ],
  });

  return output;
};
