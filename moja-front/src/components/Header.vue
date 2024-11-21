<template>
  <header>
    <nav class="navbar navbar-expand-lg navbar-light">
      <div class="container-fluid">
        <!-- 로고 -->
        <router-link to="/" class="navbar-brand d-flex align-items-center">
          <span class="fs-4">🧢 MOJA</span>
        </router-link>

        <!-- 토글 버튼 (작은 화면) -->
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <!-- 네비게이션 -->
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto">
            <!-- 검색 -->
            <li class="nav-item">
              <router-link to="/search" class="nav-link d-flex align-items-center">
                <img src="/image/search.png" alt="검색" class="icon" />
                <span class="d-lg-none ms-2">검색</span>
              </router-link>
            </li>
            <!-- 저장 -->
            <li class="nav-item">
              <router-link to="/" class="nav-link d-flex align-items-center">
                메인
                <span class="d-lg-none ms-2">저장</span> <!-- 큰 화면에서 텍스트 숨김 -->
              </router-link>
            </li>
            <li class="nav-item">
              <router-link to="/saved-products" class="nav-link d-flex align-items-center">
                <img src="/image/save.png" alt="저장" class="icon" />
                <span class="d-lg-none ms-2">저장</span>
              </router-link>
            </li>
            <!-- 커뮤니티 -->
            <li class="nav-item">
              <router-link to="/community" class="nav-link d-flex align-items-center">
                <img src="/image/community.png" alt="커뮤니티" class="icon" />
                <span class="d-lg-none ms-2">커뮤니티</span>
              </router-link>
            </li>
            <!-- 프로필 -->
            <li class="nav-item">
              <router-link to="/profile" class="nav-link d-flex align-items-center">
                <img src="/image/profile.png" alt="프로필" class="icon" />
                <span class="d-lg-none ms-2">프로필</span>
              </router-link>
            </li>
            <!-- 랭킹: 넣을지 안 넣을지 고민 중 -->
            <!-- <li class="nav-item">
              <router-link to="/ranking" class="nav-link d-flex align-items-center">
                <img src="/image/ranking.png" alt="랭킹" class="icon" />
                <span class="d-lg-none ms-2">랭킹</span>
              </router-link>
            </li> -->
            <li class="nav-item" v-if="accountStore.token === ''">
              <router-link to="/account/login" class="nav-link d-flex align-items-center">
                <!-- <img src="" alt="로그인" class="icon d-lg-none" /> -->
                <span class="ms-2">로그인</span>
              </router-link>
            </li>
            <li class="nav-item" v-if="accountStore.token !== ''" @click="logout">
                <!-- <img src="" alt="로그인" class="icon d-lg-none" /> -->
                <span class="ms-2">로그아웃</span>
            </li>
          </ul>
        </div>
      </div>
      <!-- <a href="#" class="nav-item">모자 챌린지</a> -->
      <RouterLink to="/product">예적금</RouterLink>
    </nav>
  </header>
</template>

<script setup>
import { useAccountStore } from '@/stores/account';
import axios from 'axios';
const accountStore = useAccountStore()

const logout = function () {
  axios({
    url: `http://127.0.0.1:8000/accounts/dj-rest-auth/logout/`,
    method: 'post'
  })
  accountStore.token = ''
}

</script>

<style scoped>
.icon {
  width: 20px;
  height: 20px;
}

.nav-link span {
  font-size: 14px;
  font-weight: 500;
  color: #333;
}

.nav-link:hover span {
  color: #40a2e3;
}

.d-lg-none {
  display: none !important;
}

@media (max-width: 992px) {
  .d-lg-none {
    display: inline !important;
  }
}
</style>
