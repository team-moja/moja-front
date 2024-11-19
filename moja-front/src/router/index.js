import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import HelpListView from '@/views/HelpListView.vue'
import HelpCreateView from '@/views/HelpCreateView.vue'
import HelpDetailView from '@/views/HelpDetailView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/help',
      name: 'help-list',
      component: HelpListView,
    },
    {
      path: '/help/create',
      name: 'help-create',
      component: HelpCreateView,
    },
    {
      path: '/help/:id',
      name: 'help-detail',
      component: HelpDetailView,
      props: true,
    },
  ],
})

export default router

