import { createRouter, createWebHistory } from 'vue-router'
import HelpListView from '@/views/boards/HelpListView.vue'
import HelpCreateView from '@/views/boards/HelpCreateView.vue'
import HelpDetailView from '@/views/boards/HelpDetailView.vue'
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
import { useAccountStore } from '@/stores/account'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/help",
      name: "help-list",
      component: HelpListView,
    },
    {
      path: "/help/create",
      name: "help-create",
      component: HelpCreateView,
      meta: { requiresAuth: true }
    },
    {
      path: "/help/:id",
      name: "help-detail",
      component: HelpDetailView,
      props: true,
      meta: { requiresAuth: true }
    },

    {
      path: "/account/signin",
      name: "signin",
      component: SigninView,
    },

    // 금리 비교 차트에서의 routing
    {
      path: "/mypage",
      name: "myProfile",
      component: MyProfile,
      children: [
        {
          path: "product/:id", // 모달용 별도 라우트
          name: "productDetailModal",
          component: ProductDetailView,
          props: true,
        },
      ],
    },

    {
      path: "/product",
      name: "product",
      component: ProductListView,
    },
    {
      path: "/product/:id",
      name: "productDetail",
      component: ProductDetailView,
      meta: { requiresAuth: true }
    },
    {
      path: "/product/recommend",
      name: "productRecommend",
      component: ProductRecommendView,
      meta: { requiresAuth: true }
    },
    {
      path: "/product/comparison",
      name: "productComparison",
      component: ProductComparisonView,
    },
    {
      path: "/product/recommend/result",
      name: "productRecommendResult",
      component: ProductRecommendResultView,
    },
    {
      path: "/exchange",
      name: "exchange",
      component: MoneyChangeView,
    },
    {
      path: "/map",
      name: "map",
      component: BankMapView,
    },
    {
      path: "/community",
      name: "community",
      component: CommunityView,
    },
    {
      path: "/profile",
      name: "profile",
      component: MyProfile,
      meta: { requiresAuth: true }
    },
  ],
});


import Swal from 'sweetalert2';

router.beforeEach((to, from, next) => {
  const accountStore = useAccountStore()
  const isAuthenticated = accountStore.token !== '' // 로그인 여부 확인

  if (to.meta.requiresAuth && !isAuthenticated) {
    // 인증이 필요한 페이지에 접근하려고 하지만 로그인되지 않은 경우
    Swal.fire({
      title: '로그인 필요',
      text: '로그인을 해주세요 😥',
      icon: 'error', // success, error, warning, info
      confirmButtonText: '확인',
      customClass: {
        confirmButton: 'custom-warning-button', // 버튼에 커스텀 클래스 추가
      },
    });
    return next('/') // 로그인 페이지로 리다이렉트
  }

  next() // 다음 페이지로 이동
})

export default router;
