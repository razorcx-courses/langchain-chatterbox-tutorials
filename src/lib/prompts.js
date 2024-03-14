import { PromptTemplate } from "@langchain/core/prompts";
import { RunnableSequence } from "@langchain/core/runnables";
import { StringOutputParser } from "@langchain/core/output_parsers";

import { chatOpenAIModel as model } from "../lib/chatOpenAI";

//https://js.langchain.com/docs/modules/model_io/prompts/quick_start

const stringParser = new StringOutputParser();

const getChain = (template, parser) => {
  // langchain will automatically infer the inputVariables
  const prompt = PromptTemplate.fromTemplate(template);

  const chain = RunnableSequence.from([prompt, model, parser]);

  return chain;
};

const simplePromptTemplateExample = async (input) => {
  const prompt = PromptTemplate.fromTemplate(
    `You are a naming consultant for new companies.
    What is a good name for a company that makes {product}?`
  );

  const chain = RunnableSequence.from([prompt, model, stringParser]);

  const result = await chain.invoke({
    product: input,
    format_instructions: stringParser.getFormatInstructions(),
  });

  return result;
};

const noInputPromptTemplateExample = async (template) => {
  const chain = getChain(template, stringParser);

  const result = await chain.invoke({
    format_instructions: stringParser.getFormatInstructions(),
  });

  return result;
};

const oneInputPromptTemplateExample = async (template, input) => {
  const chain = getChain(template, stringParser);

  const result = await chain.invoke({
    adjective: input,
    format_instructions: stringParser.getFormatInstructions(),
  });

  return result;
};

const multiInputPromptTemplateExample = async (template, input1, input2) => {
  const chain = getChain(template, stringParser);

  const result = await chain.invoke({
    adjective: input1,
    content: input2,
    format_instructions: stringParser.getFormatInstructions(),
  });

  return result;
};

export {
  simplePromptTemplateExample,
  noInputPromptTemplateExample,
  oneInputPromptTemplateExample,
  multiInputPromptTemplateExample,
};
