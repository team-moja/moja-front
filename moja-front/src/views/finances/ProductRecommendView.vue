<template>
  <div class="recommendation-container">
    <h1>예/적금 추천</h1>
    <p>혜택이 모자라~~</p>

    <!-- 상품 선택 -->
    <div class="select-container">
      <label for="product-type">상품 선택</label>
      <select id="product-type" v-model="productType">
        <option value="예금">예금</option>
        <option value="적금">적금</option>
      </select>
    </div>

    <!-- 월 저축액 슬라이더 -->
    <div class="slider-container">
      <label for="monthly-saving">월 저축액</label>
      <div class="slider">
        <input
          id="monthly-saving"
          type="range"
          v-model="monthlySaving"
          min="50000"
          max="5000000"
          step="50000"
        />
        <span>{{ formatCurrency(monthlySaving) }}원</span>
      </div>
    </div>

    <!-- 저축기간 슬라이더 -->
    <div class="slider-container">
      <label for="saving-period">저축기간</label>
      <div class="slider">
        <input
          id="saving-period"
          type="range"
          v-model="savingPeriod"
          min="6"
          max="36"
          step="6"
        />
        <span>{{ savingPeriod }}개월</span>
      </div>
    </div>

    <button @click="sendRecommend">추천</button>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useFinanceStore } from "@/stores/finance";

const productType = ref("savings"); // 기본값: 적금
const monthlySaving = ref(125000);
const savingPeriod = ref(6);

function formatCurrency(value) {
  return value.toLocaleString();
}


const sendRecommend = function () {
  const financeStore = useFinanceStore()
  const data = {
    category: productType.value,
    save_money: monthlySaving.value,
    save_trm: savingPeriod.value,
    user_birthday: '1999-12-25'
  }
  financeStore.recommendProduct(data)
}
</script>

<style scoped>
.recommendation-container {
  max-width: 500px;
  margin: 0 auto;
  text-align: center;
}

h1 {
  font-size: 24px;
  margin-bottom: 10px;
}

p {
  color: #888;
  margin-bottom: 20px;
}

.select-container {
  margin-bottom: 20px;
  text-align: left;
}

.select-container label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.select-container select {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.slider-container {
  margin-bottom: 20px;
  text-align: left;
}

.slider-container label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.slider {
  display: flex;
  align-items: center;
}

.slider input {
  flex: 1;
  margin-right: 10px;
}

.slider span {
  min-width: 80px;
  text-align: right;
}
</style>
