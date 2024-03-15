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
import { onMounted, ref } from "vue";
import { simplePromptTemplateExample } from "../lib/prompts";
import {
  noInputPromptTemplateExample,
  oneInputPromptTemplateExample,
  multiInputPromptTemplateExample,
} from "../lib/prompts";

const chatWindowTitle = ref("Simple Prompt Window Example");
const chatWindowDesciption = ref("Company Name from {productType}");
const response = ref();
const modelValue = ref("boxes");

const onGetResponse = async () => {
  response.value = await simplePromptTemplateExample(modelValue.value);
  console.log(response.value);
};

onMounted(async () => {
  let template = "Tell me a joke.";
  const noInput = await noInputPromptTemplateExample(template);

  template = "Tell me a {adjective} joke.";
  const oneInput = await oneInputPromptTemplateExample(template, "dog");

  template = "Tell me a {adjective} joke about {content}.";
  const multiInput = await multiInputPromptTemplateExample(
    template,
    "sarcastic",
    "lizard"
  );

  console.log(noInput);
  console.log(oneInput);
  console.log(multiInput);
});
</script>
