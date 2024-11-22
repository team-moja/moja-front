<template>
  <div class="recommendation-page container">
    <h1 class="main-title mb-5">상품 추천</h1>

    <div class="recommendation-sections d-flex justify-content-between">
      <!-- 모자가 추천하는 상품 -->
      <div class="recommendation-category">
        <div class="text-center">
          <h3>모자가 추천하는 상품</h3>
        </div>
        <div class="product-list accordion" id="categoryAccordion">
          <div
            class="accordion-item"
            v-for="(product, index) in recommendProductLists.category_based_recommendations"
            :key="product.id"
          >
            <div class="product-card" :class="{ selected: isSelected(product) }" @click="toggleSelection(product)">
              <img :src="`/src/assets/images/banks/${product.bank.bank_name}.png`" alt="은행 로고" class="bank-logo" />
              <div class="product-info">
                <h5 class="product-name">{{ product.prdt_name }}</h5>
                <p class="bank-name">{{ product.bank.bank_name }}</p>
                <p class="interest-rate">
                  최고 금리:
                  {{
                    product.product_options
                      ? Math.max(...product.product_options.map((option) => option.max_intr_rate)) + "%"
                      : "정보 없음"
                  }}
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
                <p><strong>금리:</strong> {{ getProductRates(product) }}</p>
                <p><strong>가입 방법:</strong> {{ product.join_way || "정보 없음" }}</p>
                <p><strong>기타 정보:</strong> {{ product.etc_note || "정보 없음" }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 내 연령대가 가장 많이 쓰는 상품 -->
      <div class="recommendation-category">
        <div class="text-center">
          <h3>내 연령대 인기 상품</h3>
        </div>
        <div class="product-list accordion" id="ageAccordion">
          <div
            class="accordion-item"
            v-for="(product, index) in recommendProductLists.age_group_recommendations"
            :key="product.id"
          >
            <div class="product-card" :class="{ selected: isSelected(product) }" @click="toggleSelection(product)">
              <img :src="`/src/assets/images/banks/${product.bank.bank_name}.png`" alt="은행 로고" class="bank-logo" />
              <div class="product-info">
                <h5 class="product-name">{{ product.prdt_name }}</h5>
                <p class="bank-name">{{ product.bank.bank_name }}</p>
                <p class="interest-rate">
                  최고 금리:
                  {{
                    product.product_options
                      ? Math.max(...product.product_options.map((option) => option.max_intr_rate)) + "%"
                      : "정보 없음"
                  }}
                </p>
              </div>
              <button class="btn btn-sm btn-outline-primary" type="button" data-bs-toggle="collapse"
                :data-bs-target="`#ageCollapse-${index}`" aria-expanded="false"
                :aria-controls="`ageCollapse-${index}`" @click.stop>
                상세 정보
              </button>
            </div>
            <div :id="`ageCollapse-${index}`" class="collapse accordion-collapse"
              :aria-labelledby="`ageHeading-${index}`" data-bs-parent="#ageAccordion">
              <div class="accordion-body">
                <p><strong>금리:</strong> {{ getProductRates(product) }}</p>
                <p><strong>가입 방법:</strong> {{ product.join_way || "정보 없음" }}</p>
                <p><strong>기타 정보:</strong> {{ product.etc_note || "정보 없음" }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 베스트셀러 -->
      <div class="recommendation-category">
        <div class="text-center">
          <h3>베스트셀러</h3>
        </div>
        <div class="product-list accordion" id="bestSellerAccordion">
          <div
            class="accordion-item"
            v-for="(product, index) in recommendProductLists.top_products_by_all_users"
            :key="product.id"
          >
            <div class="product-card" :class="{ selected: isSelected(product) }" @click="toggleSelection(product)">
              <img :src="`/src/assets/images/banks/${product.bank.bank_name}.png`" alt="은행 로고" class="bank-logo" />
              <div class="product-info">
                <h5 class="product-name">{{ product.prdt_name }}</h5>
                <p class="bank-name">{{ product.bank.bank_name }}</p>
                <p class="interest-rate">
                  최고 금리:
                  {{
                    product.product_options
                      ? Math.max(...product.product_options.map((option) => option.max_intr_rate)) + "%"
                      : "정보 없음"
                  }}
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
                <p><strong>금리:</strong> {{ getProductRates(product) }}</p>
                <p><strong>가입 방법:</strong> {{ product.join_way || "정보 없음" }}</p>
                <p><strong>기타 정보:</strong> {{ product.etc_note || "정보 없음" }}</p>
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

const router = useRouter();
const financeStore = useFinanceStore();

const moveToBack = () => {
  router.push("/product/recommend");
};

const goToComparison = () => {
  financeStore.selectedProduct = selectedProducts.value;
  router.push({ name: "productComparison" });
};

// Props
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
  return selectedProducts.value.some((selected) => selected.id === product.id);
};

// 상품 선택/해제
const toggleSelection = (product) => {
  const index = selectedProducts.value.findIndex((selected) => selected.id === product.id);

  if (index !== -1) {
    selectedProducts.value.splice(index, 1);
  } else if (selectedProducts.value.length < 3) {
    selectedProducts.value.push(product);
  } else {
    alert("최대 3개의 상품만 선택할 수 있습니다.");
  }
};

// 상품의 금리 정보 가져오기
const getProductRates = (product) => {
  if (!product.product_options || product.product_options.length === 0) {
    return "정보 없음";
  }

  const rates = product.product_options.map((option) => `${option.save_trm}개월: ${option.max_intr_rate}%`);
  return rates.join(", ");
};
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.recommendation-sections {
  gap: 20px;
  display: flex;
}

.recommendation-category {
  flex: 1;
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
  height: 200px; /* 카드 높이 고정 */
  overflow: hidden; /* 텍스트가 넘칠 경우 처리 */
  position: relative;
}

.product-card.selected {
  border: 2px solid #0d9276;
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
  overflow: hidden;
}

.product-name {
  font-size: 16px;
  font-weight: bold;
  margin: 0 0 5px;
  white-space: normal; /* 줄바꿈 허용 */
  text-overflow: clip; /* 생략 대신 텍스트 전체 표시 */
}

.bank-name {
  font-size: 14px;
  color: #555;
  margin-bottom: 5px;
  white-space: normal; /* 줄바꿈 허용 */
}

.interest-rate {
  font-size: 14px;
  color: #007bff;
  white-space: normal; /* 줄바꿈 허용 */
}

.accordion-body {
  padding: 15px;
  background: #f9f9f9;
}

.footer-buttons {
  margin-top: 20px;
}
</style>
