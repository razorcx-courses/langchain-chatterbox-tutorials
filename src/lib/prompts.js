import { PromptTemplate } from "@langchain/core/prompts";
import { RunnableSequence } from "@langchain/core/runnables";
import { StringOutputParser } from "@langchain/core/output_parsers";

import { chatOpenAIModel as model } from "../lib/chatOpenAI";

const simplePromptTemplateExample = async (input) => {
  const prompt = PromptTemplate.fromTemplate(
    `You are a naming consultant for new companies.
    What is a good name for a company that makes {product}?`
  );

  const stringParser = new StringOutputParser();

  const chain = RunnableSequence.from([prompt, model, stringParser]);

  const result = await chain.invoke({
    product: input,
    format_instructions: stringParser.getFormatInstructions(),
  });

  return result;
};

export { simplePromptTemplateExample };
