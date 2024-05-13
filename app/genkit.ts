"use server";

import { generate } from "@genkit-ai/ai";
import { configureGenkit } from "@genkit-ai/core";
import { defineFlow, runFlow } from "@genkit-ai/flow";
import { geminiPro } from "@genkit-ai/googleai";
import * as z from "zod";
import { googleAI } from "@genkit-ai/googleai";
import { prompt } from "@genkit-ai/dotprompt";
configureGenkit({
  plugins: [googleAI()],
  logLevel: "debug",
  enableTracingAndMetrics: true,
});

export async function callJokeFlow() {
  console.log(geminiPro.name);
  const joke = await runFlow(jokeFlow, "banana");

  return joke;
}

const jokeFlow = defineFlow(
  {
    name: "jokeFlow",
    inputSchema: z.string(),
    outputSchema: z.string(),
  },
  async (subject) => {
    const greetingPrompt = await prompt("greeting");
    const result = await greetingPrompt.generate({
      model: "googleai/gemini-pro",
      input: {
        location: "the beach",
        style: "a fancy pirate",
      },
    });

    return result.text();
  }
);
