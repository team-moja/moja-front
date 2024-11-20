import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/boards/HomeView.vue'
import HelpListView from '@/views/boards/HelpListView.vue'
import HelpCreateView from '@/views/boards/HelpCreateView.vue'
import HelpDetailView from '@/views/boards/HelpDetailView.vue'
import LoginView from '@/views/accounts/LoginView.vue'
import SigninView from '@/views/accounts/SigninView.vue'

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
    {
      path: '/account/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/account/signin',
      name: 'signin',
      component: SigninView,
    },
  ],
})

export default router

