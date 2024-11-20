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

        <!-- 네비게이션 링크 -->
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto">
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
                <span class="d-lg-none ms-2">저장</span> <!-- 큰 화면에서 텍스트 숨김 -->
              </router-link>
            </li>
            <!-- 프로필 -->
            <li class="nav-item">
              <router-link to="/profile" class="nav-link d-flex align-items-center">
                <img src="/image/profile.png" alt="프로필" class="icon" />
                <span class="d-lg-none ms-2">프로필</span> <!-- 큰 화면에서 텍스트 숨김 -->
              </router-link>
            </li>
            <!-- 검색 -->
            <li class="nav-item">
              <router-link to="/search" class="nav-link d-flex align-items-center">
                <img src="/image/search.png" alt="검색" class="icon" />
                <!-- <span class="d-lg-none ms-2">검색</span> 큰 화면에서 텍스트 숨김 -->
              </router-link>
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
import { RouterLink } from 'vue-router';
</script>


<style scoped>
/* 아이콘 크기 */
.icon {
  width: 20px;
  height: 20px;
}

/* Navbar 텍스트 스타일 */
.nav-link span {
  font-size: 14px;
  font-weight: 500;
  color: #333;
}

/* 텍스트 호버 효과 */
.nav-link:hover span {
  color: #40a2e3;
}

/* 큰 화면에서 텍스트 숨김 */
.d-lg-none {
  display: none !important; /* 기본적으로 숨김 */
}

@media (max-width: 992px) {
  .d-lg-none {
    display: inline !important; /* 작은 화면에서 텍스트 표시 */
  }
}
</style>
