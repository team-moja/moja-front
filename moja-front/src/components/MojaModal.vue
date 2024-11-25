<template>
  <!-- 고정된 모자 아이콘 -->
  <div class="fixed-cap-icon">
    <img
      src="/src/assets/images/boards/cap.png"
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
          <!--
          <button class="modal-button">비교함</button>
          -->
          <button class="modal-button" @click="">카드 추천받기</button>
          <button class="modal-button" @click="goToProductRecommend">예적금 추천받기</button>
          <button class="modal-button" @click="openMap">지점 찾기</button>
          <button class="modal-button" @click="openExchange">
            환율 계산기
          </button>
        </div>
      </div>
    </div>
  </transition>

  <div v-if="isExchange" class="modal-backdrop">
    <div class="exchange-modal-content">
      <div class="exchange-modal-header">
        <h5 class="exchange-modal-title">환율 계산기</h5>
      </div>
      <div class="exchange-modal-body">
        <MoneyChangeView />
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
</template>

<script setup>
import { ref } from "vue";
import MoneyChangeView from "@/views/exchange/MoneyChangeView.vue";
import MapTest from "@/components/MapTest.vue";
import { useRouter } from "vue-router";
import { useAccountStore } from "@/stores/account";
import Swal from "sweetalert2";

const router = useRouter();
const accountStore = useAccountStore();

const isModalOpen = ref(false);
const isExchange = ref(false);
const isMap = ref(false);

const toggleModal = () => {
  isModalOpen.value = !isModalOpen.value;
};

const closeModal = () => {
  isModalOpen.value = false;
};

const openExchange = function () {
  isExchange.value = !isExchange.value;
  console.log(isExchange.value);
};

const openMap = function () {
  isMap.value = !isMap.value;
  console.log(isMap.value);
};

const goToProductRecommend = function () {
  if (accountStore.token === "") {
    Swal.fire({
      title: "로그인 필요",
      text: "로그인을 안하신거같아요!",
      icon: "error", // success, error, warning, info
      confirmButtonText: "확인",
      timer: 1500,
      customClass: {
        confirmButton: "custom-warning-button", // 버튼에 커스텀 클래스 추가
      },
    });
  } else {
    router.push("/product/recommend");
  }
};
</script>

<style scoped>

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
  background: rgba(128, 128, 128, 0.3);
  /* #0D9276 with opacity */
  backdrop-filter: blur(2px);
  display: block;
  z-index: 1000;
}

.modal-content {
  position: absolute;
  bottom: 120px;
  /* 모자 아이콘 위치보다 위에 */
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
  background-color: #40a2e3;
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
