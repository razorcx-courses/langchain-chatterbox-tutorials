<template>
  <div class="flex flex-col justify-between items-center">
    <input id="pdfInput" type="file" accept=".pdf" />
  </div>
</template>

<script setup>
// import { onMounted } from "vue";

// import { PromptTemplate } from "@langchain/core/prompts";
// import { CommaSeparatedListOutputParser } from "@langchain/core/output_parsers";
// import { RunnableSequence } from "@langchain/core/runnables";

// import { chatOpenAIModel as model } from "../lib/chatOpenAI";

// import { PDFLoader } from "langchain/document_loaders/fs/pdf";
// // Or, in web environments:
// import { WebPDFLoader } from "langchain/document_loaders/web/pdf";

// const blob = new Blob(); // e.g. from a file input


// // const loader = new PDFLoader("src/document_loaders/example_data/example.pdf");

const docs = await loader.load();

// const useCsvListOutputParser = async (input) => {
//   const parser = new CommaSeparatedListOutputParser();

//   const chain = RunnableSequence.from([
//     PromptTemplate.fromTemplate("List five {subject}.\n{format_instructions}"),
//     model,
//     parser,
//   ]);

//   /*
//  List five ice cream flavors.
//  Your response should be a list of comma separated values, eg: `foo, bar, baz`
// */
//   const result = await chain.invoke({
//     subject: input,
//     format_instructions: parser.getFormatInstructions(),
//   });

//   return result;
// };

// onMounted(async () => {
//   // const input = "ice cream flavors";
//   // const result = await useCsvListOutputParser(input);
//   // console.log(result);

 

//   // document
//   //   .getElementById("pdfInput")
//   //   .addEventListener("change", function (event) {
//   //     // Check if the user has selected a file
//   //     if (this.files && this.files.length > 0) {
//   //       // Access the file
//   //       const file = this.files[0];
//   //       blob = file;
//   //       console.log(blob);

//   //       // const loader = new WebPDFLoader(blob);
//   //       // const docs = await loader.load();
//   //       // // Optional: If you want to read the file data as a Blob for further processing
//   //       // const reader = new FileReader();

//   //       // // Event handler executed when readAsDataURL is finished
//   //       // reader.onload = function (loadEvent) {
//   //       //   // The result attribute contains the data as a base64 encoded string
//   //       //   console.log(loadEvent.target.result);
//   //       // };

//   //       // // Read the file as Data URL (base64)
//   //       // blob = reader.readAsDataURL(file);
//   //       // console.log(blob)
//   //     }
//   //   });
// });
</script>
