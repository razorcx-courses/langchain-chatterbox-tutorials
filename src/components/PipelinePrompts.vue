<template></template>

<script setup>
import { onMounted } from "vue";

import {
  PromptTemplate,
  PipelinePromptTemplate,
} from "@langchain/core/prompts";

import { StringOutputParser } from "@langchain/core/output_parsers";
import { chatOpenAIModel as model } from "../lib/chatOpenAI";

const usePipelinePrompt = async (input) => {
  const fullPrompt = PromptTemplate.fromTemplate(`{introduction}

{example}

{start}`);

  const introductionPrompt = PromptTemplate.fromTemplate(
    `You are impersonating {person}.`
  );

  const examplePrompt =
    PromptTemplate.fromTemplate(`Here's an example of an interaction:
Q: {example_q}
A: {example_a}`);

  const startPrompt = PromptTemplate.fromTemplate(`Now, do this for real!
Q: {input}
A:`);

  const composedPrompt = new PipelinePromptTemplate({
    pipelinePrompts: [
      {
        name: "introduction",
        prompt: introductionPrompt,
      },
      {
        name: "example",
        prompt: examplePrompt,
      },
      {
        name: "start",
        prompt: startPrompt,
      },
    ],
    finalPrompt: fullPrompt,
  });

  const formattedPrompt = await composedPrompt.format({
    person: "Elon Musk",
    example_q: `What's your favorite car?`,
    example_a: "Telsa",
    input: input,
  });

  const stringParser = new StringOutputParser();

  const result = await model.pipe(stringParser).invoke(formattedPrompt);

  return result;
};

onMounted(async () => {
  const input = `What's your favorite social media site?`;
  const result = await usePipelinePrompt(input);
  console.log(result);
});
</script>
