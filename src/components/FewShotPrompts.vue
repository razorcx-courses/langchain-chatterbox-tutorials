<template></template>

<script setup>
import { onMounted } from "vue";

import {
  ChatPromptTemplate,
  FewShotChatMessagePromptTemplate,
} from "@langchain/core/prompts";

import { StringOutputParser } from "@langchain/core/output_parsers";
import { chatOpenAIModel as model } from "../lib/chatOpenAI";

const fewShotPrompting = async () => {
  const examples = [
    {
      input: "Could the members of The Police perform lawful arrests?",
      output: "what can the members of The Police do?",
    },
    {
      input: "Jan Sindel's was born in what country?",
      output: "what is Jan Sindel's personal history?",
    },
  ];

  const examplePrompt = ChatPromptTemplate.fromTemplate(`Human: {input}
AI: {output}`);

  const fewShotPrompt = new FewShotChatMessagePromptTemplate({
    prefix:
      "Rephrase the users query to be more general, using the following examples",
    suffix: "Human: {input}",
    examplePrompt,
    examples,
    inputVariables: ["input"],
  });

  const formattedPrompt = await fewShotPrompt.format({
    input: "Why do cats wear clothing?",
  });

  const stringParser = new StringOutputParser();

  const result = await model.pipe(stringParser).invoke(formattedPrompt);

  return result;
};

onMounted(async () => {
  const result = await fewShotPrompting();
  console.log(result);
});
</script>
