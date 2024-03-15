import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import ChatMemory from "../views/ChatMemoryView.vue";
import RAG from "../views/RAGView.vue";
import Prompts from "../views/PromptsView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/chat-memory",
      name: "chat-memory",
      component: ChatMemory,
    },
    {
      path: "/rag",
      name: "rag",
      component: RAG,
    },
    {
      path: "/prompts",
      name: "prompts",
      component: Prompts,
    },
  ],
});

export default router;
