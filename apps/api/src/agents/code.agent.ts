import { UIAnalysis } from "@repo/types";
import { streamText } from "ai";
import { defaultProvider } from "../utils/ai.utils.js";
import { CODE_GEN_SYSTEM_PROMPT } from "../prompts/ai.prompts.js";

export const runCodeAgent = async (
  imageBase64: string,
  analysis: UIAnalysis,
  userPrompt: string,
) => {
  return streamText({
    model: defaultProvider,
    system: CODE_GEN_SYSTEM_PROMPT,
    messages: [
      {
        role: "user",
        content: [
          {
            type: "text",
            text: `COMPONENT ANALYSIS:\n${JSON.stringify(analysis)}\n\n USER OVERRIDE INSTRUCTION:\n${userPrompt || "build this component perfectly based on analysis"}`,
          },
          { type: "image", image: imageBase64 },
        ],
      },
    ],
  });
};
