import { createApp } from "vue";
import "../index.css";
import App from "./App.vue";
import router from "./router";

import Nav from "./components/Nav.vue";
import Hero from "./components/Hero.vue";
import ChatBox from "./components/ChatBox.vue";
import Footer from "./components/Footer.vue";
import Joke from "./components/Joke.vue";
import Prompts from "./components/Prompts.vue";
import ChatPrompts from '@/components/ChatPrompts.vue';
import FewShotPrompts from '@/components/FewShotPrompts.vue';
import PromptingWithFunctions  from '@/components/PromptingWithFunctions.vue';
import PipelinePrompts from '@/components/PipelinePrompts.vue'; 
import JsonOutputParsers from '@/components/JsonOutputParsers.vue';
import CSVListOutputParser from '@/components/CSVListOutputParser.vue';
import RAGwithPDF from '@/components/RAGwithPDF.vue';
import ChatMemory from '@/components/ChatMemory.vue';

const app = createApp(App)
  .use(router)
  .component("Nav", Nav)
  .component("Hero", Hero)
  .component("ChatBox", ChatBox)
  .component("Footer", Footer)
  .component("Joke", Joke)
  .component("Prompts", Prompts)
  .component("ChatPrompts", ChatPrompts)
  .component("FewShotPrompts", FewShotPrompts)
  .component("PromptingWithFunctions", PromptingWithFunctions)
  .component("PipelinePrompts", PipelinePrompts)
  .component("JsonOutputParsers", JsonOutputParsers)
  .component("CSVListOutputParser", CSVListOutputParser)
  .component("RAGwithPDF", RAGwithPDF)
  .component("ChatMemory", ChatMemory)
  .mount("#app");
