<template>
  <div class="home-container">
    <!-- Main Banner -->
    <section class="banner-section">
      <div class="banner-content">
        <h1>모으자 자산! 모르겠다 자산관리!</h1>
        <p>간단한 과정을 거쳐 최적의 상품을 추천받을 수 있습니다.</p>
        <button @click="startRecommendation" class="start-button">시작하기</button>
      </div>
    </section>

    <!-- 카드 섹션 -->
    <div class="main-content">
      <!-- 카드 슬라이더 섹션 (이전 코드와 동일) -->
      
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
                <span>👍 {{ post.likes }}</span>
                <span>❤️ {{ post.hearts }}</span>
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
              <span class="challenge-progress">🔵 30</span>
              <span class="challenge-total">㍕ 18/20</span>
              <p class="challenge-description">매일 소비내역 인증하고 알뜰살뜰한 연말을 보내고 싶으신 분들? 모이세요 !!!</p>
            </div>
          </div>

          <!-- 추천받기 버튼 섹션 -->
          <div class="recommendation-section">
            <div class="recommendation-buttons">
              <button class="rec-button">카드 추천받기</button>
              <button class="rec-button">예적금 추천받기</button>
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
            <div v-if="isModalOpen" class="modal-overlay">
              <div class="modal-content" @click.stop>
                <div class="modal-header">
                  <h3>기능 바로가기</h3>
                  <button class="close-button" @click="closeModal">&times;</button>
                </div>
                <div class="modal-body">
                  <button class="modal-button" @click="handleButtonClick('compare')">비교함</button>
                  <button class="modal-button" @click="handleButtonClick('findBranch')">지점 찾기</button>
                  <button class="modal-button" @click="handleButtonClick('calculator')">환율 계산기</button>
                </div>
              </div>
            </div>
          </transition>

        </div>
      </div>
    </div>
  </div>
</template>


<script setup>
import { ref } from 'vue';
const isModalOpen = ref(false);

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

// HOT 게시글 데이터
const hotPosts = ref([
  {
    id: 1,
    badge: "📈 TODAY 모자",
    content: "내가 진짜 좋은 카드 추천해줘요. 이걸로 5천원 캐시백 받음 ...",
    likes: 20,
    hearts: 30
  },
  {
    id: 2,
    badge: "👑 주간 모자",
    content: "광주은행 n년차 행원이 추천해주는 생활비 절약 tip 3가지",
    likes: 20,
    hearts: 30
  },
  {
    id: 3,
    badge: "👑 월간 모자",
    content: "내가 진짜 좋은 카드 추천해줘요. 이걸로 5천원 캐시백 받음 ...",
    likes: 20,
    hearts: 30
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
  padding: 3rem 0;
  text-align: center;
}

.banner-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
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
}

.rec-button:hover {
  background-color: #0D9276;
  color: #FFFFFF;
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
  filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1));
}

.cap-icon:hover {
  transform: scale(1.1) rotate(-10deg);
  filter: drop-shadow(0 6px 8px rgba(0, 0, 0, 0.2));
}

/* 모달 애니메이션 */
.modal-enter-active,
.modal-leave-active {
  transition: all 0.3s ease;
}

.modal-enter-from {
  opacity: 0;
  transform: scale(0.9);
}

.modal-leave-to {
  opacity: 0;
  transform: scale(1.1);
}

/* 모달 스타일 */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(13, 146, 118, 0.2); /* #0D9276 with opacity */
  backdrop-filter: blur(5px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  width: 320px;
  background: #FFF6E9;
  border-radius: 20px;
  box-shadow: 0 10px 25px rgba(64, 162, 227, 0.2);
  overflow: hidden;
  position: relative;
  transform-origin: center;
}

.modal-header {
  padding: 1.2rem;
  background: #40A2E3;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-header h3 {
  margin: 0;
  font-size: 1.3rem;
  color: white;
  font-weight: 600;
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

.modal-body {
  padding: 1.5rem;
  background: linear-gradient(to bottom, #FFF6E9, #BBE2EC);
}

.modal-button {
  display: block;
  width: 100%;
  padding: 1rem;
  margin: 0.8rem 0;
  border: none;
  border-radius: 12px;
  background-color: #40A2E3;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1.1rem;
  font-weight: 500;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.modal-button:hover {
  background-color: #0D9276;
  transform: translateY(-2px);
  box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
}

.modal-button:active {
  transform: translateY(0);
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
   width: 90%;
   margin: 0 20px;
 }
}
</style>