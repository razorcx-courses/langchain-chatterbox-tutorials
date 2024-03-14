<template>
</template>

<script setup>
import { onMounted } from "vue";

import {
  ChatPromptTemplate,
  PromptTemplate,
  SystemMessagePromptTemplate,
  AIMessagePromptTemplate,
  HumanMessagePromptTemplate,
} from "@langchain/core/prompts";
import {
  AIMessage,
  HumanMessage,
  SystemMessage,
} from "@langchain/core/messages";
import { RunnableSequence } from "@langchain/core/runnables";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { chatOpenAIModel as model } from "../lib/chatOpenAI";

const useSystemTemplate = async () => {
  const systemTemplate =
    "You are a helpful assistant that translates {input_language} to {output_language}.";
  const humanTemplate = "{text}";

  const chatPrompt = ChatPromptTemplate.fromMessages([
    ["system", systemTemplate],
    ["human", humanTemplate],
  ]);

  const stringParser = new StringOutputParser();

  const chain = RunnableSequence.from([chatPrompt, model, stringParser]);

  const result = await chain.invoke({
    input_language: "English",
    output_language: "French",
    text: "I love programming.",
    format_instructions: stringParser.getFormatInstructions(),
  });

  return result;
};

onMounted(async () => {
  const result = await useSystemTemplate();
  console.log(result);
});
</script>
