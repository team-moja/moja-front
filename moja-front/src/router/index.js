import { createRouter, createWebHistory } from 'vue-router'
import HelpListView from '@/views/boards/HelpListView.vue'
import HelpCreateView from '@/views/boards/HelpCreateView.vue'
import HelpDetailView from '@/views/boards/HelpDetailView.vue'
import LoginView from '@/views/accounts/LoginView.vue'
import SigninView from '@/views/accounts/SigninView.vue'
import ProductListView from '@/views/finances/ProductListView.vue'
import ProductDetailView from '@/views/finances/ProductDetailView.vue'
import ProductRecommendView from '@/views/finances/ProductRecommendView.vue'
import ProductRecommendResultView from '@/views/finances/ProductRecommendResultView.vue'
import MoneyChangeView from '@/views/exchange/MoneyChangeView.vue'
import ProductComparisonView from '@/views/finances/ProductComparisonView.vue'
import BankMapView from '@/views/map/BankMapView.vue'
import HomeView from '@/views/boards/HomeView.vue'
import CommunityView from '@/views/boards/CommunityView.vue'
import MyProfile from '@/views/accounts/MyProfile.vue'  // 마이페이지 프로필
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


    {
      path: '/product',
      name: 'product',
      component: ProductListView,
    },
    {
      path: '/product/:id',
      name: 'productDetail',
      component: ProductDetailView,
    },
    {
      path: '/product/recommend',
      name: 'productRecommend',
      component: ProductRecommendView,
    },
    {
      path: "/product/comparison",
      name: "productComparison",
      component: ProductComparisonView,
    },
    {
      path: '/product/recommend/result',
      name: 'productRecommendResult',
      component: ProductRecommendResultView,
    },
    {
      path: '/exchange',
      name: 'exchange',
      component: MoneyChangeView,
    },
    {
      path: '/map',
      name: 'map',
      component: BankMapView,
    },
    {
      path: '/community',
      name: 'community',
      component: CommunityView
    },
    {
      path: '/profile',
      name: 'profile',
      component: MyProfile,
      // meta: { requiresAuth: true }
    },
  ],
})

export default router

