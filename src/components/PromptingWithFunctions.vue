<template></template>

<script setup>
import { onMounted } from "vue";

import {
  PromptTemplate,
} from "@langchain/core/prompts";

import { StringOutputParser } from "@langchain/core/output_parsers";
import { chatOpenAIModel as model } from "../lib/chatOpenAI";

const promptingWithFunctions = async () => {
  const getCurrentDate = () => {
    return new Date().toISOString();
  };

  const prompt = new PromptTemplate({
    template: "Tell me a {adjective} joke about the day {date}",
    inputVariables: ["adjective", "date"],
  });

  const partialPrompt = await prompt.partial({
    date: getCurrentDate,
  });

  const formattedPrompt = await partialPrompt.format({
    adjective: "funny",
  });

  const stringParser = new StringOutputParser();

  const result = await model.pipe(stringParser).invoke(formattedPrompt);

  return result;
};

onMounted(async () => {
  const result = await promptingWithFunctions();
  console.log(result);
});
</script>
