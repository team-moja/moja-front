<template>
  <div class="currency-converter">
    <!-- 사용자 입력 (금액) -->
    <div>
      <label for="amount">금액</label>
      <input type="number" v-model="amount" id="amount" placeholder="금액을 입력하세요" />
    </div>
    
    <!-- 출발 통화 선택 -->
    <div>
      <label for="fromCurrency">출발 통화</label>
      <select v-model="fromCurrency" id="fromCurrency">
        <option v-for="currency in exchangeRates" :key="currency.id" :value="currency.cur_unit">
          {{ currency.cur_nm }}
        </option>
      </select>
    </div>

    <!-- 목표 통화 선택 -->
    <div>
      <label for="toCurrency">목표 통화</label>
      <select v-model="toCurrency" id="toCurrency">
        <option v-for="currency in exchangeRates" :key="currency.id" :value="currency.cur_unit">
          {{ currency.cur_nm }}
        </option>
      </select>
    </div>

    <!-- 환율 계산 결과 -->
    <div v-if="convertedAmount !== null">
      <h3>변환된 금액: {{ convertedAmount }} {{ toCurrency }}</h3>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios';
import { ref, computed, onMounted } from 'vue';

// 제공된 환율 데이터
const exchangeRates = ref([]);

onMounted(() => {
  axios({
    url: `http://127.0.0.1:8000/finances/exchange/`,
    method: 'get'
  })
  .then((res) => {
    exchangeRates.value = res.data;
  });
});

// 사용자 입력
const amount = ref(0);
const fromCurrency = ref('USD');
const toCurrency = ref('KRW');

// 환율 계산
const convertedAmount = computed(() => {
  if (amount.value <= 0) return null;

  // 출발 통화와 목표 통화에 해당하는 환율 찾기
  const fromRate = exchangeRates.value.find(rate => rate.cur_unit === fromCurrency.value);
  const toRate = exchangeRates.value.find(rate => rate.cur_unit === toCurrency.value);

  if (!fromRate || !toRate) return null;

  // 계산 (ttb: 출발 통화 -> 목표 통화의 매매 기준율)
  let fromRateValue = parseFloat(fromRate.ttb.replace(/,/g, ''));
  let toRateValue = parseFloat(toRate.tts.replace(/,/g, ''));

  // 값이 0일 경우 1로 변경
  if (fromRateValue === 0) fromRateValue = 1;
  if (toRateValue === 0) toRateValue = 1;

  const conversionRate = fromRateValue / toRateValue;

  return (amount.value * conversionRate).toFixed(2);
});
</script>

<style scoped>
.currency-converter {
  max-width: 400px;
  margin: auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
}

h2 {
  text-align: center;
  margin-bottom: 20px;
}

div {
  margin-bottom: 10px;
}

label {
  font-weight: bold;
}

input,
select {
  width: 100%;
  padding: 8px;
  margin-top: 5px;
  border-radius: 4px;
  border: 1px solid #ccc;
}

button {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>
