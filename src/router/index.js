import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

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
      component: () => import('../views/ChatMemory.vue')
    },
    {
      path: '/rag',
      name: 'rag',
      component: () => import('../views/RAG.vue')
    }
  ]
})

export default router
