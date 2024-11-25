<template>
    <div class="container-fluid mt-4">
        <div class="row">
            <!-- 필터 영역 -->
            <div class="col-md-3 mb-4 filter-container">
                <div class="search-section mb-3">
                    <h5>카드 검색</h5>
                    <input type="text" class="form-control" placeholder="카드명을 입력하세요" v-model="searchKeyword"
                        @input="filterBySearch" />
                </div>

                <div class="category-filter mb-3">
                    <h5>카테고리 선택</h5>
                    <div class="btn-group w-100">
                        <button v-for="category in categories" :key="category.value"
                            :class="['btn', 'btn-outline-primary', selectedCategory === category.value ? 'active' : '']"
                            @click="filterByCategory(category.value)">
                            {{ category.label }}
                        </button>
                    </div>
                </div>

                <div class="bank-filter mb-3">
                    <h5>카드사 선택</h5>
                    <div class="d-flex flex-wrap gap-2">
                        <div v-for="company in companies" :key="company.id"
                            :class="['bank-item', selectedCompanies.includes(company.name) ? 'active' : '']"
                            @click="filterByCompany(company.name)">
                            <img :src="`/src/assets/images/companies/${company.name}.png`" alt="logo"
                                class="bank-logo" />
                            {{ company.name }}
                        </div>
                    </div>
                </div>
            </div>

            <!-- 콘텐츠 영역 -->
            <div class="col-md-9 content-field">
                <div class="d-flex justify-content-between align-items-center mb-3">
                    <h2>카드 목록</h2>
                </div>

                <div class="row g-4">
                    <div v-for="card in filteredList" :key="card.id" class="col-12">
                        <div class="card h-100 shadow-sm d-flex flex-row align-items-center">
                            <!-- 카드 이미지 -->
                            <img :src="getCardImage(card.card_name)" alt="card-image" class="card-img-left" />
                            <!-- 카드 정보 -->
                            <div class="card-body">
                                <h5 class="card-title">{{ card.card_name }}</h5>
                                <p class="card-subtitle text-muted">{{ card.company.name }}</p>
                                <div class="benefit-info mt-2">
                                    <h6>혜택</h6>
                                    <ul>
                                        <li v-for="option in card.cardoption_set" :key="option.id">
                                            {{ option.option_category.option_category }}: {{ option.detail }}
                                        </li>
                                    </ul>
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
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const router = useRouter();

// 데이터 초기화
const searchKeyword = ref('');
const selectedCategory = ref(null);
const selectedCompanies = ref([]);
const cardList = ref([]);
const filteredList = ref([]);

const categories = ref([
    { label: '전체', value: null },
    { label: '교통', value: 3 },
    { label: '통신', value: 1 },
    { label: '영화/문화', value: 13 },
    { label: '해외', value: 14 },
]);

const companies = ref([
    {
        "id": 1,
        "name": "신한카드",
        "url": "https://www.shinhancard.com/"
    },
    {
        "id": 2,
        "name": "삼성카드",
        "url": "https://www.samsungcard.com/"
    },
    {
        "id": 3,
        "name": "현대카드",
        "url": "https://www.hyundaicard.com/"
    },
    {
        "id": 4,
        "name": "우리카드",
        "url": "https://pc.wooricard.com/"
    },
    {
        "id": 5,
        "name": "국민카드",
        "url": "https://card.kbcard.com/"
    },
    {
        "id": 6,
        "name": "롯데카드",
        "url": "https://www.lottecard.co.kr/"
    },
    {
        "id": 7,
        "name": "하나카드",
        "url": "https://www.hanacard.co.kr/"
    },
    {
        "id": 8,
        "name": "농협카드",
        "url": "https://card.nonghyup.com/"
    },
    {
        "id": 9,
        "name": "ibk카드",
        "url": "https://www.ibk.co.kr/card/mainList.ibk"
    },
    {
        "id": 10,
        "name": "BC카드",
        "url": "https://www.bccard.com/app/card/MainActn.do"
    }
]);

// 카드 상세 페이지 이동
const moveToDetail = (cardId) => {
    router.push({ name: 'cardDetail', params: { id: cardId } });
};

const images = import.meta.glob('/src/assets/images/cards/*.{png,jpg,gif}');

const getCardImage = (cardName) => {
    // 특수문자 제거 및 공백을 "_"로 변환
    const formattedName = cardName.replace(/:/g, '');

    // 파일 경로 확인
    for (const ext of ['png', 'jpg', 'gif']) {
        const path = `/src/assets/images/cards/${formattedName}.${ext}`;
        if (images[path]) {
            return path; // 파일 경로 반환
        }
    }

    // 기본 이미지 반환
    return '/src/assets/images/cards/default.png';
};

const adjustImageOrientation = (event) => {
    const image = event.target;
    const { naturalWidth, naturalHeight } = image;

    // 가로 이미지를 세로로 보정
    if (naturalWidth > naturalHeight) {
        image.style.transform = 'rotate(90deg)';
    }
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

// 카드사 필터
const filterByCompany = (companyName) => {
    if (selectedCompanies.value.includes(companyName)) {
        selectedCompanies.value = selectedCompanies.value.filter((name) => name !== companyName);
    } else {
        selectedCompanies.value.push(companyName);
    }
    applyFilters();
};

// 필터 적용
const applyFilters = () => {
    filteredList.value = cardList.value.filter((card) => {
        const matchesSearch =
            searchKeyword.value === '' || card.card_name.toLowerCase().includes(searchKeyword.value.toLowerCase());
        const matchesCategory =
            selectedCategory.value === null ||
            card.cardoption_set.some((option) => option.option_category.id === selectedCategory.value);
        const matchesCompany = selectedCompanies.value.length === 0 || selectedCompanies.value.includes(card.company.name);

        return matchesSearch && matchesCategory && matchesCompany;
    });
};

// 데이터 가져오기
onMounted(() => {
    axios
        .get('http://127.0.0.1:8000/cards/')
        .then((res) => {
            cardList.value = res.data;
            filteredList.value = res.data; // 초기값
        })
        .catch((err) => {
            console.error(err);
        });
});
</script>

<style scoped>
.bank-logo {
    width: 50px;
    height: 50px;
}

.bank-item.active {
    border: 2px solid #007bff;
    border-radius: 5px;
}

.card {
    cursor: pointer;
    display: flex;
    flex-direction: row;
    gap: 20px;
}

.card-img-vertical {
    width: 120px;
    height: 180px;
    object-fit: cover;
    border-radius: 8px;
    transition: transform 0.2s ease-in-out;
}

img {
    width: 170px;
    height: 240px;
}

.card-body {
    flex: 1;
}
</style>