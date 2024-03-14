import { ChatOpenAI } from "@langchain/openai";

export const chatOpenAIModel = new ChatOpenAI({
  openAIApiKey: import.meta.env.VITE_APP_OPEN_API_KEY,
  temperature: 0,
});
