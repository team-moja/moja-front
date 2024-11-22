<template>
  <div class="home-container">
    <!-- Main Banner -->
    <section class="banner-section">
      <div class="banner-content">
        <div class="banner-grid">
          <div class="banner-text">
            <h1 class="nowrap">모으자 자산!<br>모르겠다 자산관리!</h1>
            <p class="nowrap">간단한 과정을 거쳐 최적의 상품을 추천받을 수 있습니다.</p>
            <button @click="startRecommendation" class="start-button">시작하기</button>
          </div>
          <div class="banner-image">
            <img src="/image/mainmoney.png" alt="메인 이미지" class="main-money-image" />
          </div>
        </div>
      </div>
    </section>

    <!-- 카드 섹션 -->
    <div class="main-content">      
      <!-- 하단 콘텐츠 섹션 -->
      <div class="bottom-container">
        <!-- HOT 게시글 -->
        <div class="hot-posts-section">
          <h2 class="section-title">🔥 HOT 게시글</h2>
          <div class="post-list">
            <div class="post-item" v-for="post in hotPosts" :key="post.id">
              <div class="post-content">
                <span class="post-badge">{{ post.badge }}</span>
                <p class="post-text">{{ post.content }}</p>
              </div>
              <div class="post-stats">
                <span>❤️ {{ post.likes }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- 오른쪽 섹션 -->
        <div class="right-section">
          <!-- 챌린지 섹션 -->
          <div class="challenge-section">
            <h2 class="section-title">🏆 진행 중인 챌린지</h2>
            <div class="challenge-card">
              <span class="challenge-badge">💰 30만원으로 한 달 살기!</span>
              <span class="challenge-progress">🧢💰 30</span>
              <span class="challenge-total"> 👨‍👦‍👦18/20</span>
              <p class="challenge-description">매일 소비내역 인증하고 알뜰살뜰한 연말을 보내고 싶으신 분들? 모이세요 !!!</p>
            </div>
          </div>

          <!-- 추천받기 버튼 섹션 -->
          <div class="recommendation-section">
            <div class="recommendation-buttons">
              <button class="rec-button">
                <span class="button-text-long">카드 추천받기</span>
                <span class="button-text-short">카드</span>
              </button>
              <button class="rec-button">
                <span class="button-text-long">예적금 추천받기</span>
                <span class="button-text-short">예적금</span>
              </button>
            </div>
          </div>

          <!-- 고정된 모자 아이콘 -->
          <div class="fixed-cap-icon">
            <img 
              src="/image/cap.png" 
              alt="모자 아이콘" 
              class="cap-icon" 
              @click="toggleModal"
            />
          </div>

          <!-- 모달 -->
          <transition name="modal">
            <div v-if="isModalOpen" class="modal-overlay" @click="closeModal">
              <div class="modal-content" @click.stop>
                <div class="modal-header">
                  <h3>기능 바로가기</h3>
                </div>
                <div class="modal-body">
                  <button class="modal-button">비교함</button>
                  <button class="modal-button" @click="openMap">지점 찾기</button>
                  <button class="modal-button" @click="openExchange">환율 계산기</button>
                </div>
              </div>
            </div>
          </transition>

        </div>
      </div>

      <div v-if="isExchange" class="modal-backdrop">
      <div class="exchange-modal-content">
        <div class="exchange-modal-header">
          <h5 class="exchange-modal-title">환율 계산기</h5>
        </div>
        <div class="exchange-modal-body">
          <MoneyChangeView/>
        </div>
        <div class="exchange-modal-footer">
          <button class="btn btn-secondary" @click="openExchange">닫기</button>
        </div>
      </div>
    </div>

    <div v-if="isMap" class="modal-backdrop">
      <div class="map-modal-content">
        <div class="map-modal-header">
          <h5 class="map-modal-title">지점 검색</h5>
        </div>
        <div class="map-modal-body">
          <MapTest />
        </div>
        <div class="map-modal-footer">
          <button class="btn btn-secondary" @click="openMap">닫기</button>
        </div>
      </div>
    </div>
    </div>
  </div>
</template>


<script setup>
import { ref } from 'vue';
import MoneyChangeView from '../exchange/MoneyChangeView.vue';
import MapTest from '@/components/MapTest.vue';
const isModalOpen = ref(false);
const isExchange = ref(false)
const isMap = ref(false)

const toggleModal = () => {
  isModalOpen.value = !isModalOpen.value;
};

const closeModal = () => {
  isModalOpen.value = false;
};

const handleButtonClick = (action) => {
  console.log(`Selected action: ${action}`);
 // 각 버튼에 대한 동작 구현
  closeModal();
};

const openExchange = function () {
  isExchange.value = !isExchange.value
  console.log(isExchange.value);
}

const openMap = function () {
  isMap.value = !isMap.value
  console.log(isMap.value);
}

// HOT 게시글 데이터
const hotPosts = ref([
  {
    id: 1,
    badge: "📈 TODAY 모자",
    content: "내가 진짜 좋은 카드 추천해줘요. 이걸로 5천원 캐시백 받음 ...",
    likes: 20,
  },
  {
    id: 2,
    badge: "👑 주간 모자",
    content: "광주은행 n년차 행원이 추천해주는 생활비 절약 tip 3가지",
    likes: 20,
  },
  {
    id: 3,
    badge: "👑 월간 모자",
    content: "내가 진짜 좋은 카드 추천해줘요. 이걸로 5천원 캐시백 받음 ...",
    likes: 20,
  }
]);

const startRecommendation = () => {
  // 추천 시작 로직
  console.log('추천 시작');
};
</script>


<style scoped>
.home-container {
  width: 100%;
}

.banner-section {
  background-color: #FFF6E9;
  width: 100vw;
  margin-left: calc(-50vw + 50%);
  margin-right: calc(-50vw + 50%);
  padding: 1rem 0;
  overflow: hidden; /* 텍스트가 배너 밖으로 넘어가는 것을 방지 */
}

.banner-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.banner-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  gap: 2rem;
}

.banner-text {
  text-align: left;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

/* .nowrap {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
} */

.banner-text h1 {
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

.banner-text p {
  font-size: 1.2rem;
  margin-bottom: 2rem;
}

.banner-image {
  display: flex;
  justify-content: center;
  align-items: center;
}

.main-money-image {
  max-width: 100%;
  height: auto;
  object-fit: contain;
}

.start-button {
  background-color: #0D9276;
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 8px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  align-self: flex-start;
  white-space: nowrap;
}

.start-button:hover {
  background-color: #0B7B63;
  transform: translateY(-2px);
}

.main-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

.bottom-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-top: 2rem;
}

/* HOT 게시글 스타일 */
.hot-posts-section {
  background: #FFFFFF;
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.section-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

.post-item {
  background: #FFFFFF;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1rem;
}

.post-content {
  margin-bottom: 0.5rem;
}

.post-badge {
  background: #FFE4B5;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.9rem;
  margin-right: 0.5rem;
}

.post-text {
  margin: 0.5rem 0;
}

.post-stats {
  display: flex;
  gap: 1rem;
  color: #666;
  font-size: 0.9rem;
}

/* 오른쪽 섹션 스타일 */
.right-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.challenge-section {
  background: #FFFFFF;
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.challenge-card {
  background: #F8F9FA;
  border-radius: 8px;
  padding: 1rem;
}

.challenge-badge {
  font-weight: 500;
  margin-right: 1rem;
}

.challenge-progress,
.challenge-total {
  font-size: 0.9rem;
  color: #666;
}

.challenge-description {
  margin-top: 0.5rem;
  font-size: 0.9rem;
  color: #666;
}

/* 추천받기 버튼 스타일 */
.recommendation-buttons {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  position: relative;
  padding-bottom: 2rem; /* 모자 아이콘을 위한 여백 */
}

.rec-button {
  width: 100%;
  padding: 1rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  background-color: #A0A0A0;
  color: #FFFFFF;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
}

.rec-button:hover {
  background-color: #0D9276;
  transform: translateY(-2px);
}

.button-text-long {
  display: inline-block;
}

.button-text-short {
  display: none;
}


.fixed-cap-icon {
  position: fixed;
  bottom: 40px;
  right: 40px;
  z-index: 999;
}

.cap-icon {
  width: 60px;
  height: 60px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.cap-icon:hover {
  transform: scale(1.1);
}

/* 모달 애니메이션 */
.modal-enter-active,
.modal-leave-active {
  transition: all 0.2s ease;
}

.modal-enter-from {
  opacity: 0;
  transform: translate(10px);
}

.modal-leave-to {
  opacity: 0;
  transform: translate(10px);
}

/* 모달 스타일 */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(128, 128, 128, 0.3); /* #0D9276 with opacity */
  backdrop-filter: blur(2px);
  display: block;
  z-index: 1000;
}

.modal-content {
  position: absolute;
  bottom: 120px; /* 모자 아이콘 위치보다 위에 */
  right: 0;
  width: 200px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  overflow: hidden;
}

.modal-header {
  padding: 0.8rem;
  /* background: #40A2E3; */
  padding: 0.8rem;
  text-align: center;
  background: #fff;
  border-bottom: 1px solid #eee;
}

.modal-header h3 {
  margin: 0;
  font-size: 1rem;
  color: #333;
  font-weight: 600;
}

.modal-body {
  padding: 0.8rem;
}

.modal-button {
  display: block;
  width: 100%;
  padding: 0.8rem;
  margin: 0.3rem 0;
  border: none;
  border-radius: 8px;
  background-color: #b4bbc0;
  color: white;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 0.9rem;
  text-align: center;
}

.close-button {
  background: none;
  border: none;
  font-size: 1.8rem;
  cursor: pointer;
  color: white;
  opacity: 0.8;
  transition: all 0.2s ease;
  padding: 0 0.5rem;
}

.close-button:hover {
  opacity: 1;
  transform: rotate(90deg);
}

.modal-button:hover {
  background-color: #40A2E3;
  transform: translateY(-2px);
  box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
}

/* .modal-button:hover {
  background-color: #0D9276;
} */

.modal-button:active {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

@keyframes slideUp {
  from {
    transform: translateY(100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}


/* 반응형 디자인 */
@media (max-width: 1200px) {
  .banner-text h1 {
    font-size: calc(1.5rem + 1vw);
  }
  
  .banner-text p {
    font-size: calc(0.9rem + 0.5vw);
  }
}


@media (max-width: 768px) {
  .fixed-cap-icon {
    bottom: 20px;
    right: 20px;
  }

.cap-icon {
  width: 50px;
  height: 50px;
}

.modal-content {
  bottom: 80px;
  right: 20px;
  width: 180px;
}

.banner-section {
    padding: 1.5rem 0;
  }

  .banner-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .banner-text h1,
  .banner-text p,
  .banner-image {
    display: none;
  }

  .banner-text {
    gap: 0;
  }

  .start-button {
    font-size: 1rem;
    padding: 1rem 1.8rem;
    width: 100%;
    box-sizing: border-box;
    text-align: center;
  }
}

@media (max-width: 480px) {
  .button-text-long {
    display: none;
  }
  
  .button-text-short {
    display: inline-block;
  }
  
  .rec-button {
    padding: 0.8rem;
    font-size: 0.9rem;
  }
}


.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

/* 모달 내용 */
.exchange-modal-content {
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  width: 90%;
  max-width: 800px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

/* 헤더 */
.exchange-modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e5e5e5;
  margin-bottom: 10px;
}

/* 닫기 버튼 */
.exchange-btn-close {
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
}

.exchange-modal-footer {
  text-align: right;
}


.map-modal-content {
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  width: 90%;
  max-width: 800px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

/* 헤더 */
.map-modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e5e5e5;
  margin-bottom: 10px;
}

/* 닫기 버튼 */
.map-btn-close {
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
}

.map-modal-footer {
  text-align: right;
}
</style>