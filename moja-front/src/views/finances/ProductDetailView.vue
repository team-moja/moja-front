<template>
  <div class="container py-5" v-if="product.id">
    <!-- 상품 정보 카드 -->
    <div class="card mb-4 shadow-sm">
      <div class="card-body">
        <div class="row align-items-center">
          <!-- 은행 로고 -->
          <div class="col-auto">
            <img :src="`/src/assets/images/banks/${product.bank.bank_name}.png`" alt="은행 로고" class="rounded-circle" />
          </div>
          <!-- 상품명 및 은행명 -->
          <div class="col">
            <h5 class="mb-0">{{ product.prdt_name }}</h5>
            <small class="text-muted">{{ product.bank.bank_name }}</small>
          </div>
          <!-- 최고 금리 -->
          <div class="col-auto text-end">
            <p>🔼 최고 금리: {{ highestOption.max_intr_rate }}% (기간: {{ highestOption.save_trm }}개월)</p>
            <p>🔽 최저 금리: {{ lowestOption.max_intr_rate }}% (기간: {{ lowestOption.save_trm }}개월)</p>
          </div>
        </div>
        <hr />
        <!-- 상세 정보 -->
        <div class="row">
          <div class="col-12">
            <p>📅 가입기간: {{ lowestOption.save_trm }}개월 ~ {{ highestOption.save_trm }}개월</p>
            <p>💰 최소 가입금액: 1만원 이상</p>
            <p>👤 대상: {{ product.join_member }}</p>
          </div>
        </div>
        <!-- 금리 정보 -->
        <!-- 버튼 -->
        <div class="d-flex justify-content-between mt-3">
          <a :href="product.bank.bank_url" class="btn btn-primary">은행사 바로가기</a>
          <button class="btn btn-outline-secondary">지점 검색하기</button>
        </div>
      </div>
    </div>

    <!-- 추가정보 섹션 -->
    <div class="card text-center p-4 border-dashed">
      <p>추가정보 있으면 넣기</p>
      <button class="btn btn-info text-white">내 정보 등록하기</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';

// 현재 URL 경로에서 productId 가져오기
const route = useRoute();
const productId = route.params.id;

// product 상태 관리
const product = ref({});
const highestOption = ref({});
const lowestOption = ref({});

// 컴포넌트가 마운트될 때 데이터를 가져옴
onMounted(() => {
  axios({
    url: `http://127.0.0.1:8000/finances/product/detail/${productId}`,
    method: 'get',
  }).then((res) => {
    product.value = res.data;

    // 금리 데이터 중 최고, 최저를 계산
    if (product.value.product_options && product.value.product_options.length > 0) {
      const options = product.value.product_options;
      highestOption.value = options.reduce((max, option) => (option.max_intr_rate > max.max_intr_rate ? option : max), options[0]);
      lowestOption.value = options.reduce((min, option) => (option.max_intr_rate < min.max_intr_rate ? option : min), options[0]);
    }
  });
});
</script>

<style scoped>
.border-dashed {
  border: 2px dashed #ccc;
}

.card-body img {
  width: 60px;
  height: 60px;
}

.card-body {
  max-width: 800px; /* 최대 크기 제한 */
  /* width: 600px; */
  padding: 20px; /* 내부 여백 조절 */
  margin: auto; /* 가운데 정렬 */
}
</style>
