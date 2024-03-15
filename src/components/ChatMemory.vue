<template>
  <ChatBox
    :response="response"
    :chatWindowTitle="chatWindowTitle"
    :chatWindowDesciption="chatWindowDesciption"
    v-model="modelValue"
    @getResponse="onGetResponse"
  >
    <template v-if="response">
      <p>{{ response }}</p>
    </template>
  </ChatBox>
</template>

<script setup>
import { ref } from "vue";

import { BufferMemory } from "langchain/memory";
import {
  ChatPromptTemplate,
  MessagesPlaceholder,
} from "@langchain/core/prompts";
import { RunnableSequence } from "@langchain/core/runnables";

import { StringOutputParser } from "@langchain/core/output_parsers";
import { chatOpenAIModel as model } from "../lib/chatOpenAI";

const chatWindowTitle = ref("Chat Message History");
const chatWindowDesciption = ref(
  "How to add Memory to an arbitrary message chain."
);
const response = ref();
const modelValue = ref("Hey, I'm Chucky! ");

//https://js.langchain.com/docs/expression_language/cookbook/adding_memory
const prompt = ChatPromptTemplate.fromMessages([
  [
    "system",
    "You are a helpful chatbot who likes to tell jokes.  Every response should include one joke that is relavent to the context of the message history.  Never tell the same joke twice.",
  ],
  new MessagesPlaceholder("history"),
  ["human", "{input}"],
]);

// Default "inputKey", "outputKey", and "memoryKey values would work here
// but we specify them for clarity.
const memory = new BufferMemory({
  returnMessages: true,
  inputKey: "input",
  outputKey: "output",
  memoryKey: "history",
});

const chain = RunnableSequence.from([
  {
    input: (initialInput) => initialInput.input,
    memory: () => memory.loadMemoryVariables({}),
  },
  {
    input: (previousOutput) => previousOutput.input,
    history: (previousOutput) => previousOutput.memory.history,
  },
  prompt,
  model,
]);

const onGetResponse = async () => {
  const inputs = {
    input: modelValue.value,
  };

  const stringParser = new StringOutputParser();

  const result = await chain.invoke(inputs);

  const parsed = await stringParser.invoke(result);

  await memory.saveContext(inputs, {
    output: result.content,
  });

  response.value = parsed;
};
</script>
