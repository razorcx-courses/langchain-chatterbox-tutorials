import { ChatOpenAI } from "@langchain/openai";

//https://platform.openai.com/docs/models/gpt-3-5-turbo
export const chatOpenAIModel = new ChatOpenAI({
  openAIApiKey: import.meta.env.VITE_APP_OPEN_API_KEY,
  modelName: "gpt-3.5-turbo",
  temperature: 0,
});
