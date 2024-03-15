<template>
  <div class="flex flex-col justify-between items-center">
    <input id="pdfInput" type="file" accept=".pdf" />
  </div>
</template>

<script setup>
import { onMounted } from "vue";

import { PromptTemplate } from "@langchain/core/prompts";
import { CommaSeparatedListOutputParser } from "@langchain/core/output_parsers";
import { RunnableSequence } from "@langchain/core/runnables";

import { chatOpenAIModel as model } from "../lib/chatOpenAI";

import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { WebPDFLoader } from "langchain/document_loaders/web/pdf";

onMounted(async () => {
  document
    .getElementById("pdfInput")
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

        const doc = await pdfLoader.load();

        console.log(doc);
      }
    });
});
</script>
