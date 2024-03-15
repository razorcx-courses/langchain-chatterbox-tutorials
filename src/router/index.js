import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ChatMemory from '../views/ChatMemory.vue'
import RAG from '../views/RAG.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/chat-memory',
      name: 'chat-memory',
      component: ChatMemory
    },
    {
      path: '/rag',
      name: 'rag',
      component: RAG
    }
  ]
})

export default router
