<template>
  <div class="container-fluid mt-4">
    <div class="row">
      <!-- 필터 영역 -->
      <div class="col-md-3 mb-4 filter-container">
        <div class="search-section mb-3">
          <h5>금융상품 검색</h5>
          <input type="text" class="form-control" placeholder="상품명을 입력하세요" v-model="searchKeyword"
            @input="filterBySearch" />
        </div>

        <div class="category-filter mb-3">
          <h5>카테고리 선택</h5>
          <div class="btn-group w-100">
            <button 
              v-for="category in categories" 
              :key="category.value" 
              :class="['btn', 'btn-outline-primary', selectedCategory === category.value ? 'active' : '']" 
              @click="filterByCategory(category.value)">
              {{ category.label }}
            </button>
          </div>
        </div>

        <div class="bank-filter mb-3">
          <h5>은행 선택</h5>
          <div class="d-flex flex-wrap gap-2 ">
            <div v-for="bank in banks" :key="bank.id"
              :class="['bank-item', selectedBanks.includes(bank.bank_name) ? 'active' : '']"
              @click="filterByBank(bank.bank_name)">
              <img :src="`/src/assets/images/banks/${bank.bank_name}.png`" alt="logo" class="bank-logo">
              {{ bank.bank_nick }}
            </div>
          </div>
        </div>

        <div class="rate-slider">
          <h5>이자율 필터</h5>
          <label>최대 이자율: {{ rateLimit }}%</label>
          <input type="range" class="form-range" v-model="rateLimit" :min="0" :max="10" :step="0.1"
            @input="filterByRate" />
        </div>
      </div>

      <!-- 콘텐츠 영역 -->
      <div class="col-md-9 content-field">
        <div class="d-flex justify-content-between align-items-center mb-3">
          <h2>예/적금 목록</h2>
          <button class="btn btn-primary" @click="moveToRecommend">예적금 추천</button>
        </div>

        <div class="row g-4">
          <div v-for="product in filteredList" :key="product.id" class="col-lg-4 col-md-6 col-sm-12">
            <div class="card h-100 shadow-sm">
              <div class="card-body" @click="moveToDetail(product.id)">
                <div class="d-flex align-items-center mb-3">
                  <img :src="`/src/assets/images/banks/${product.bank.bank_name}.png`" alt="logo"
                    class="bank-logo me-3" />
                  <div>
                    <h5 class="card-title mb-1">{{ product.prdt_name }}</h5>
                    <p class="card-subtitle text-muted">{{ product.bank.bank_name }}</p>
                  </div>
                </div>
                <div class="rate-info text-end">
                  <p class="mb-0 text-success" v-if="product.product_options.length > 1">
                    최고: {{ product.product_options[1].max_intr_rate }}%
                  </p>
                  <p class="mb-0 text-muted">기본: {{ product.product_options[0].intr_rate }}%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>



<script setup>
import ProductList from '@/components/financese/ProductList.vue';
import '@/assets/css/finances/ProductListView.css';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const categories = ref([
  { label: '전체', value: null },
  { label: '예금', value: 1 },
  { label: '적금', value: 2 }
]);

// 필터 데이터
const banks = ref([
  {
    "id": 1,
    "bank_nick": "우리",
    "bank_name": "우리은행",
    "bank_code": "0010001",
    "bank_url": "https://spot.wooribank.com/pot/Dream?withyou=po"
  },
  {
    "id": 2,
    "bank_nick": "SC",
    "bank_name": "한국스탠다드차타드은행",
    "bank_code": "0010002",
    "bank_url": "http://www.standardchartered.co.kr"
  },
  {
    "id": 3,
    "bank_nick": "아이엠",
    "bank_name": "아이엠뱅크",
    "bank_code": "0010016",
    "bank_url": "http://www.imbank.co.kr"
  },
  {
    "id": 4,
    "bank_nick": "부산",
    "bank_name": "부산은행",
    "bank_code": "0010017",
    "bank_url": "http://www.busanbank.co.kr"
  },
  {
    "id": 5,
    "bank_nick": "광주",
    "bank_name": "광주은행",
    "bank_code": "0010019",
    "bank_url": "http://www.kjbank.com"
  },
  {
    "id": 6,
    "bank_nick": "제주",
    "bank_name": "제주은행",
    "bank_code": "0010020",
    "bank_url": "https://www.jejubank.com"
  },
  {
    "id": 7,
    "bank_nick": "전북",
    "bank_name": "전북은행",
    "bank_code": "0010022",
    "bank_url": "https://www.jbbank.co.kr/EFINANCE_MAIN.act"
  },
  {
    "id": 8,
    "bank_nick": "경남",
    "bank_name": "경남은행",
    "bank_code": "0010024",
    "bank_url": "https://www.knbank.co.kr/ib20/mnu/FPMDPT020000000"
  },
  {
    "id": 9,
    "bank_nick": "IBK",
    "bank_name": "중소기업은행",
    "bank_code": "0010026",
    "bank_url": "http://www.ibk.co.kr"
  },
  {
    "id": 10,
    "bank_nick": "KDB",
    "bank_name": "한국산업은행",
    "bank_code": "0010030",
    "bank_url": "https://www.kdb.co.kr"
  },
  {
    "id": 11,
    "bank_nick": "국민",
    "bank_name": "국민은행",
    "bank_code": "0010927",
    "bank_url": "http://www.kbstar.com"
  },
  {
    "id": 13,
    "bank_nick": "신한",
    "bank_name": "신한은행",
    "bank_code": "0011625",
    "bank_url": "http://www.shinhan.com"
  },
  {
    "id": 14,
    "bank_nick": "농협",
    "bank_name": "농협은행주식회사",
    "bank_code": "0013175",
    "bank_url": "https://banking.nonghyup.com"
  },
  {
    "id": 15,
    "bank_nick": "하나",
    "bank_name": "하나은행",
    "bank_code": "0013909",
    "bank_url": "http://www.hanabank.com"
  },
  {
    "id": 16,
    "bank_nick": "케이",
    "bank_name": "주식회사 케이뱅크",
    "bank_code": "0014674",
    "bank_url": "https://www.kbanknow.com"
  },
  {
    "id": 17,
    "bank_nick": "수협",
    "bank_name": "수협은행",
    "bank_code": "0014807",
    "bank_url": "http://www.suhyup-bank.com"
  },
  {
    "id": 18,
    "bank_nick": "카카오",
    "bank_name": "주식회사 카카오뱅크",
    "bank_code": "0015130",
    "bank_url": "https://www.kakaobank.com/"
  },
  {
    "id": 19,
    "bank_nick": "토스",
    "bank_name": "토스뱅크 주식회사",
    "bank_code": "0017801",
    "bank_url": "https://www.tossbank.com/product-service/savings/account"
  }
]);


// 다중 선택을 위한 배열
const selectedBanks = ref([]);
const searchKeyword = ref('');
const rateLimit = ref(10); // 최대 이자율
const selectedCategory = ref(null); // 카테고리 선택 상태
const productList = ref([]);
const filteredList = ref([]);
const router = useRouter();

const moveToDetail = (productId) => {
  router.push({ name: 'productDetail', params: { id: productId } });
};

// 추천 페이지 이동
const moveToRecommend = () => {
  router.push('/product/recommend');
};

// 검색 필터
const filterBySearch = () => {
  applyFilters();
};

// 카테고리 필터
const filterByCategory = (category) => {
  selectedCategory.value = category;
  applyFilters();
};

// 은행 필터
const filterByBank = (bankName) => {
  if (selectedBanks.value.includes(bankName)) {
    selectedBanks.value = selectedBanks.value.filter((selected) => selected !== bankName);
  } else {
    selectedBanks.value.push(bankName);
  }
  applyFilters();
};

// 이자율 필터
const filterByRate = () => {
  applyFilters();
};

// 필터 적용
const applyFilters = () => {
  filteredList.value = productList.value.filter((product) => {
    const matchesBank =
      selectedBanks.value.length === 0 ||
      selectedBanks.value.includes(product.bank.bank_name);
    const matchesSearch =
      searchKeyword.value === '' ||
      product.prdt_name.toLowerCase().includes(searchKeyword.value.toLowerCase());
    const maxRate =
      product.product_options.length > 1
        ? parseFloat(product.product_options[1].max_intr_rate)
        : parseFloat(product.product_options[0].intr_rate);
    const matchesRate = maxRate <= rateLimit.value;
    const matchesCategory =
      selectedCategory.value === null || product.product_category === selectedCategory.value;
    return matchesBank && matchesSearch && matchesRate && matchesCategory;
  });
};

// 데이터 가져오기
onMounted(() => {
  axios.get('http://127.0.0.1:8000/finances/product/')
    .then((res) => {
      productList.value = res.data;
      filteredList.value = res.data; // 초기값
    })
    .catch((err) => {
      console.error(err);
    });
});
</script>

<style scoped>
.btn-group .btn.active {
  background-color: #007bff;
  color: white;
}
</style>