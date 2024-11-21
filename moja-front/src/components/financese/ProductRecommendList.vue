<template>
  <div class="recommendation-page container">
    <h1 class="main-title mb-3">상품 추천</h1>
    <!-- <h5 class="section-title mb-3 mt-3">최대 3개 선택</h5> -->

    <div class="recommendation-sections d-flex justify-content-between">
      <!-- 모자가 추천하는 상품 -->
      <div class="recommendation-category">
        <h3>모자가 추천하는 상품</h3>
        <div class="product-list accordion" id="categoryAccordion">
          <div class="accordion-item" v-for="(product, index) in recommendProductLists.category_based_recommendations"
            :key="product.product_id">
            <div class="product-card" :class="{ selected: isSelected(product) }" @click="toggleSelection(product)">
              <img :src="`/src/assets/images/banks/${product.bank_name}.png`" alt="은행 로고" class="bank-logo" />
              <div class="product-info">
                <h5 class="product-name">{{ product.product_name }}</h5>
                <p class="bank-name">{{ product.bank_name }}</p>
                <p class="interest-rate">
                  금리 {{ product.max_intr_rate || product.avg_intr_rate || product.intr_rate || "정보 없음" }}%
                </p>
              </div>
              <button class="btn btn-sm btn-outline-primary" type="button" data-bs-toggle="collapse"
                :data-bs-target="`#categoryCollapse-${index}`" aria-expanded="false"
                :aria-controls="`categoryCollapse-${index}`" @click.stop>
                상세 정보
              </button>
            </div>
            <div :id="`categoryCollapse-${index}`" class="collapse accordion-collapse"
              :aria-labelledby="`categoryHeading-${index}`" data-bs-parent="#categoryAccordion">
              <div class="accordion-body">
                <p><strong>금리:</strong> {{ product.max_intr_rate || product.avg_intr_rate || product.intr_rate || "정보 없음"
                  }}%</p>
                <p><strong>기간:</strong> {{ product.save_trm || "정보 없음" }}개월 이상</p>
                <p><strong>금액:</strong> 100만 원 이상</p>
                <p><strong>대상:</strong> 개인 및 개인 사업자</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 내 연령대가 가장 많이 쓰는 상품 -->
      <div class="recommendation-category">
        <h3>내 연령대가 가장 많이 쓰는 상품</h3>
        <div class="product-list accordion" id="ageAccordion">
          <div class="accordion-item" v-for="(product, index) in recommendProductLists.age_group_recommendations"
            :key="product.product_id">
            <div class="product-card" :class="{ selected: isSelected(product) }" @click="toggleSelection(product)">
              <img :src="`/src/assets/images/banks/${product.bank_name}.png`" alt="은행 로고" class="bank-logo" />
              <div class="product-info">
                <h5 class="product-name">{{ product.product_name }}</h5>
                <p class="bank-name">{{ product.bank_name }}</p>
                <p class="interest-rate">
                  금리 {{ product.max_intr_rate || "정보 없음" }}%
                </p>
              </div>
              <button class="btn btn-sm btn-outline-primary" type="button" data-bs-toggle="collapse"
                :data-bs-target="`#ageCollapse-${index}`" aria-expanded="false" :aria-controls="`ageCollapse-${index}`"
                @click.stop>
                상세 정보
              </button>
            </div>
            <div :id="`ageCollapse-${index}`" class="collapse accordion-collapse"
              :aria-labelledby="`ageHeading-${index}`" data-bs-parent="#ageAccordion">
              <div class="accordion-body">
                <p><strong>금리:</strong> {{ product.max_intr_rate || "정보 없음" }}%</p>
                <p><strong>기간:</strong> {{ product.save_trm || "정보 없음" }}개월 이상</p>
                <p><strong>금액:</strong> 100만 원 이상</p>
                <p><strong>대상:</strong> 개인 및 개인 사업자</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 베스트셀러 -->
      <div class="recommendation-category">
        <h3>베스트셀러</h3>
        <div class="product-list accordion" id="bestSellerAccordion">
          <div class="accordion-item" v-for="(product, index) in recommendProductLists.top_products_by_all_users"
            :key="product.product_id">
            <div class="product-card" :class="{ selected: isSelected(product) }" @click="toggleSelection(product)">
              <img :src="`/src/assets/images/banks/${product.bank_name}.png`" alt="은행 로고" class="bank-logo" />
              <div class="product-info">
                <h5 class="product-name">{{ product.product_name }}</h5>
                <p class="bank-name">{{ product.bank_name }}</p>
                <p class="interest-rate">
                  금리 {{ product.max_intr_rate || "정보 없음" }}%
                </p>
              </div>
              <button class="btn btn-sm btn-outline-primary" type="button" data-bs-toggle="collapse"
                :data-bs-target="`#bestSellerCollapse-${index}`" aria-expanded="false"
                :aria-controls="`bestSellerCollapse-${index}`" @click.stop>
                상세 정보
              </button>
            </div>
            <div :id="`bestSellerCollapse-${index}`" class="collapse accordion-collapse"
              :aria-labelledby="`bestSellerHeading-${index}`" data-bs-parent="#bestSellerAccordion">
              <div class="accordion-body">
                <p><strong>금리:</strong> {{ product.max_intr_rate || "정보 없음" }}%</p>
                <p><strong>기간:</strong> {{ product.save_trm || "정보 없음" }}개월 이상</p>
                <p><strong>금액:</strong> 100만 원 이상</p>
                <p><strong>대상:</strong> 개인 및 개인 사업자</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer Buttons -->
    <div class="footer-buttons mt-4 d-flex justify-content-between">
      <button class="btn btn-secondary" @click="moveToBack">이전으로</button>
      <button class="btn btn-primary" :disabled="selectedProducts.length === 0" @click="goToComparison">
        비교하기({{ selectedProducts.length }}/3)
      </button>
  </div>

  </div>

</template>




<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useFinanceStore } from "@/stores/finance";

const router = useRouter()
const financeStore = useFinanceStore()

const moveToBack = function() {
  router.push('/product/recommend')
}

const goToComparison = () => {
  console.log(selectedProducts.value);
  financeStore.selectedProduct = selectedProducts.value
  router.push({
    name: "productComparison",
  });
};


defineProps({
  recommendProductLists: {
    type: Object,
    default: () => ({}),
  },
});

// 선택된 상품 리스트
const selectedProducts = ref([]);

// 선택 여부 확인
const isSelected = (product) => {
  return selectedProducts.value.some(
    (selected) => selected.product_id === product.product_id
  );
};

// 상품 선택/해제
const toggleSelection = (product) => {
  const index = selectedProducts.value.findIndex(
    (selected) => selected.product_id === product.product_id
  );

  // 이미 선택된 경우
  if (index !== -1) {
    selectedProducts.value.splice(index, 1);
  } else {
    // 최대 3개 초과 시 알림
    if (selectedProducts.value.length >= 3) {
      alert("최대 3개의 상품만 선택할 수 있습니다.");
      return;
    }
    // 선택 추가
    selectedProducts.value.push(product);
  }
};
</script>




<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
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

.progress-container {
  margin-bottom: 30px;
}

.progress-bar {
  width: 100%;
  height: 10px;
}

.recommendation-sections {
  gap: 20px;
}

.recommendation-category {
  flex: 1;
  text-align: center;
}

.product-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.product-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: border-color 0.3s ease-in-out;
  min-height: 200px;
}

.product-card:hover {
  border-color: #0d9276;
}

.bank-logo {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}

.product-info {
  flex: 1;
  margin-left: 15px;
  text-align: left;
}

.product-card.selected {
  border-color: #0d9276;
  border: 2px solid #0d9276;
}
</style>
