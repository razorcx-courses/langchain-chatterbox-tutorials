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

  <section class="px-4">
    <div
      class="flex flex-col items-left max-w-sm md:max-w-xl mx-auto mb-16 bg-gray-200 p-6"
    >
      <label
        class="block mb-2 text-sm font-medium text-gray-900"
        for="file_input"
        >Upload file</label
      >
      <input
        class="text-sm text-gray-900 border rounded cursor-pointer bg-gray-50 focus:outline-none"
        id="file_input"
        type="file"
        accept=".pdf"
      />
    </div>
  </section>
</template>

<script setup>
import { onMounted, ref } from "vue";

import { PromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { chatOpenAIModel as model } from "../lib/chatOpenAI";

import { WebPDFLoader } from "langchain/document_loaders/web/pdf";
import { formatDocumentsAsString } from "langchain/util/document";
import {
  RunnableSequence,
  RunnablePassthrough,
} from "@langchain/core/runnables";

import { OpenAIEmbeddings } from "@langchain/openai";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { similarity } from "ml-distance";

const chatWindowTitle = ref("PDF Document Memory Vector Store");
const chatWindowDesciption = ref("Ask questions about the PDF document");
const response = ref();
const modelValue = ref("Tell me about council members.");

let vectorStoreRetriever;

const onGetResponse = async () => {
  if (!vectorStoreRetriever) {
    console.log("Load document and try again.");
    return;
  }

  const prompt =
    PromptTemplate.fromTemplate(`Answer the question based only on the following context:
{context}

Question: {question}`);

  const chain = RunnableSequence.from([
    {
      context: vectorStoreRetriever.pipe(formatDocumentsAsString),
      question: new RunnablePassthrough(),
    },
    prompt,
    model,
    new StringOutputParser(),
  ]);

  const result = await chain.invoke(modelValue.value);

  console.log(result);

  response.value = result;
};

onMounted(() => {
  document
    .getElementById("file_input")
    .addEventListener("change", async function (event) {
      // Check if the user has selected a file
      if (this.files && this.files.length > 0) {
        // Access the file
        const blob = this.files[0];

        //https://github.com/mozilla/pdf.js/issues/17245
        const pdfjs = await import("pdfjs-dist/legacy/build/pdf.min.mjs");
        const pdfjsWorker = await import(
          "pdfjs-dist/legacy/build/pdf.worker.min.mjs"
        );
        pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;

        const pdfLoader = new WebPDFLoader(blob, {
          parsedItemSeparator: "",
          pdfjs: () => Promise.resolve(pdfjs),
        });

        const docs = await pdfLoader.load();

        //https://github.com/langchain-ai/langchainjs/issues/943 - nov 24 2023 - Riyaancode
        const embeddings = new OpenAIEmbeddings({
          openAIApiKey: import.meta.env.VITE_APP_OPEN_API_KEY,
        });

        const vectorStore = await MemoryVectorStore.fromDocuments(
          docs,
          embeddings,
          { similarity: similarity.pearson }
        );

        // const jsonToStore = vectorStore.memoryVectors;
        //console.log(jsonToStore)

        // Next time when needed I load this file again using the following code.
        // const vectorStoreData = loadDataFromJsonFileStoredAbove();
        // const vectorStore = await MemoryVectorStore.fromExistingIndex(embeddings);
        // vectorStore.memoryVectors = vectorStoreData;

        // Initialize a retriever wrapper around the vector store
        vectorStoreRetriever = vectorStore.asRetriever();

        // const relaventDocs = await vectorStoreRetriever.getRelevantDocuments(
        //   modelValue.value
        // );

        // console.log(relaventDocs);
      }
    });
});
</script>
