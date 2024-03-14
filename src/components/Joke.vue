<template>
  <ChatBox
    :response="response"
    :chatWindowTitle="chatWindowTitle"
    :chatWindowDesciption="chatWindowDesciption"
    v-model="modelValue"
    @getResponse="onGetResponse"
  >
    <template v-if="response">
      <p
        class="inline-flex text-[9px] bg-gray-400 text-gray-200 px-2 rounded-sm"
      >
        Setup
      </p>
      <p class="ml-3 mb-3">{{ response.setup }}</p>
      <p
        class="inline-flex text-[9px] bg-gray-400 text-gray-200 px-2 rounded-sm"
      >
        Punchline
      </p>
      <p class="ml-3">{{ response.punchline }}</p>
    </template>
  </ChatBox>
</template>

<script setup>
import { ref } from "vue";
import { getJokeResponse } from "../lib/jokes";

const chatWindowTitle = ref("Prompt Template Schema Example");
const chatWindowDesciption = ref("Tell a Joke about {thing}");
const response = ref();
const modelValue = ref("pigeon");

const onGetResponse = async () => {
  response.value = await getJokeResponse(modelValue.value);
  console.log(response.value);
};
</script>
