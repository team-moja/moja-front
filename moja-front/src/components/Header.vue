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
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>

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