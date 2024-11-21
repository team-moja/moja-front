<template>
    <div class="comparison-page container">
      <h1 class="main-title">상품 비교</h1>
      <p class="subtitle">혜택이 모자라~~</p>
  
      <!-- 선택된 상품 카드들 -->
      <div class="selected-products d-flex justify-content-between">
        <div
          class="product-card"
          v-for="(product, index) in selectedProducts"
          :key="product.product_id"
          :class="{ selected: selectedProductId === product.product_id }"
          @click="selectProduct(product)"
        >
          <div class="card-content">
            <img
              :src="`/src/assets/images/banks/${product.bank_name}.png`"
              alt="은행 로고"
              class="bank-logo"
            />
            <div class="product-info">
              <h5 class="product-name">{{ product.product_name }}</h5>
              <p class="bank-name">{{ product.bank_name }}</p>
              <p class="interest-rate">
                금리 {{ product.max_intr_rate || product.avg_intr_rate || product.intr_rate || "정보 없음" }}%
              </p>
              <p>기간: {{ product.save_trm || "정보 없음" }}개월 이상</p>
              <p>금액: 100만 원 이상</p>
              <p>대상: 개인 및 개인 사업자</p>
            </div>
            <div class="total-amount mt-3">
              예상: <strong>{{ formatCurrency(getTotalAmount(product)) }}원</strong>
            </div>
          </div>
        </div>
      </div>
  
      <!-- 월 저축액 및 저축기간 슬라이더 -->
      <div class="sliders mt-4">
        <div class="slider-container">
          <label for="monthly-saving">월 저축액</label>
          <input
            type="range"
            id="monthly-saving"
            v-model="monthlySaving"
            :min="50000"
            :max="5000000"
            step="50000"
          />
          <span>{{ formatCurrency(monthlySaving) }}원</span>
        </div>
  
        <div class="slider-container">
          <label for="saving-period">저축기간</label>
          <input
            type="range"
            id="saving-period"
            v-model="savingPeriod"
            :min="1"
            :max="60"
            step="1"
          />
          <span>{{ savingPeriod }}개월</span>
        </div>
      </div>
  
      <!-- Footer Buttons -->
      <div class="footer-buttons mt-4 d-flex justify-content-between">
        <button class="btn btn-secondary" @click="goBack">이전으로</button>
        <button class="btn btn-primary" :disabled="!selectedProductId" @click="goToProductDetail">
          선택하기
        </button>
      </div>
    </div>
  </template>
  
  
  <script setup>
  import { ref } from "vue";
  import { useRouter } from "vue-router";
  import { useFinanceStore } from "@/stores/finance";
  
  // Router 및 Store 활용
  const router = useRouter();
  const financeStore = useFinanceStore();
  
  // 선택된 상품 데이터
  const selectedProducts = financeStore.selectedProduct;
  
  // 선택된 상품 ID 저장
  const selectedProductId = ref(null);
  
  // 슬라이더 값
  const monthlySaving = ref(1000000); // 기본 월 저축액
  const savingPeriod = ref(12); // 기본 저축 기간
  
  // 상품 클릭 시 선택/해제 동작
  const selectProduct = (product) => {
    if (selectedProductId.value === product.product_id) {
      selectedProductId.value = null; // 이미 선택된 경우 선택 해제
    } else {
      selectedProductId.value = product.product_id; // 새 상품 선택
    }
  };
  
  // 총 금액 계산
  const getTotalAmount = (product) => {
    const maxRate = parseFloat(product.max_intr_rate || 0) / 100;
    const principal = monthlySaving.value * savingPeriod.value; // 원금
    const interest = principal * maxRate; // 이자
    return principal + interest; // 총 금액
  };
  
  // 금액 포맷
  const formatCurrency = (value) => {
    return value.toLocaleString();
  };
  
  // 뒤로가기
  const goBack = () => {
    router.push({ name: "productRecommendResult" });
  };
  
  // 선택된 상품 상세보기로 이동
  const goToProductDetail = () => {
    router.push({
      name: "productDetail",
      params: { id: selectedProductId.value },
    });
  };
  </script>
  
  
  <style scoped>
  .container {
    max-width: 1200px;
    margin: 0 auto;
    text-align: center;
    padding: 20px;
  }
  
  .main-title {
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 10px;
  }
  
  .subtitle {
    color: #555;
    font-size: 1.2rem;
    margin-bottom: 20px;
  }
  
  .selected-products {
    display: flex;
    justify-content: space-between;
    gap: 20px;
  }
  
  .product-card {
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    text-align: left;
    flex: 1;
    cursor: pointer;
  }
  
  .product-card.selected {
    border-color: #0d9276;
  }
  
  .bank-logo {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-bottom: 10px;
  }
  
  .product-info {
    text-align: left;
    margin-bottom: 10px;
  }
  
  .product-name {
    font-weight: bold;
    margin: 0 0 10px;
  }
  
  .total-amount {
    font-size: 1.2rem;
    font-weight: bold;
    color: #0d9276;
  }
  
  .sliders {
    margin-top: 20px;
    text-align: left;
  }
  
  .slider-container {
    margin-bottom: 15px;
  }
  
  .slider-container label {
    display: block;
    font-weight: bold;
    margin-bottom: 5px;
  }
  
  .slider-container input {
    width: 100%;
    margin-bottom: 5px;
  }
  
  .footer-buttons button {
    width: 150px;
  }
  </style>
  