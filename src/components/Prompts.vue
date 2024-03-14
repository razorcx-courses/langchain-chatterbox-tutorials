<template>
  <ChatBox
    :response="response"
    :chatWindowTitle="chatWindowTitle"
    :chatWindowDesciption="chatWindowDesciption"
    v-model="modelValue"
    @getResponse="onGetResponse"
  >
    <template v-if="response">
      <p class="ml-3 mb-3">{{ response }}</p>
    </template>
  </ChatBox>
</template>

<script setup>
import { ref } from "vue";
import { simplePromptTemplateExample } from "../lib/prompts";

const chatWindowTitle = ref("Simple Prompt Window Example");
const chatWindowDesciption = ref("Company Name from {productType}");
const response = ref();
const modelValue = ref("boxes");

const onGetResponse = async () => {
  response.value = await simplePromptTemplateExample(modelValue.value);
  console.log(response.value);
};
</script>
