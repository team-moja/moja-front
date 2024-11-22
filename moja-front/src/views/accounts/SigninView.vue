<template>
  <div class="signup-container">
    <h1 class="title">회원가입</h1>
    <form @submit.prevent="signin" class="signup-form">
      <!-- 기존 입력 필드 -->
      <div class="form-group">
        <label>아이디</label>
        <input type="text" v-model="username" placeholder="아이디를 입력하세요" required />
      </div>
      <div class="form-group">
        <label>비밀번호</label>
        <input
          type="password"
          v-model="password1"
          placeholder="영문, 숫자, 특수문자를 혼합하여 8자리 이상 입력해주세요."
          required
        />
      </div>
      <div class="form-group">
        <label>비밀번호 확인</label>
        <input type="password" v-model="password2" placeholder="비밀번호를 다시 입력하세요" required />
      </div>
      <div class="form-group">
        <label>이메일</label>
        <input type="email" v-model="email" placeholder="example@gmail.com" required />
      </div>
      <div class="form-group">
        <label>닉네임</label>
        <input type="text" v-model="nickname" placeholder="부적절한 닉네임은 사용할 수 없습니다" required />
      </div>
      <div class="form-group">
        <label>생년월일</label>
        <input type="date" v-model="birthdate" required />
      </div>
      <div class="form-group">
        <label>월 소득액: <strong>{{ monthlyIncome }}원</strong></label>
        <input type="range" v-model="monthlyIncome" min="0" max="10000000" step="100000" class="slider" />
      </div>
      <div class="form-group">
        <label>월 지출액: <strong>{{ monthlyExpenses }}원</strong></label>
        <input type="range" v-model="monthlyExpenses" min="0" max="10000000" step="100000" class="slider" />
      </div>

      <!-- 은행 선택 섹션 -->
      <div class="bank-filter form-group">
        <label>은행 선택</label>
        <div class="bank-slider">
          <div
            class="bank-item"
            v-for="bank in banks"
            :key="bank.id"
            :class="{ active: selectedBank === bank.id }"
            @click="selectBank(bank.id)"
          >
            <img :src="`/src/assets/images/banks/${bank.bank_name}.png`" alt="logo" class="bank-logo" />
            <div class="bank-name">{{ bank.bank_nick }}</div>
          </div>
        </div>
        <small v-if="selectedBank" class="text-success">선택된 은행: {{ selectedBankName }}</small>
      </div>

      <button type="submit" class="submit-button">회원가입</button>
    </form>
  </div>
</template>



<script setup>
import { ref, computed, onMounted } from "vue";
import { useAccountStore } from "@/stores/account";
import { useRouter } from "vue-router";
import axios from "axios";

const store = useAccountStore();
const router = useRouter();

const username = ref("");
const password1 = ref("");
const password2 = ref("");
const email = ref("");
const nickname = ref("");
const birthdate = ref("");
const monthlyIncome = ref(2000000);
const monthlyExpenses = ref(100000);

const banks = ref([
  {
    "id": 1,
    "bank_nick": "우리",
    "bank_name": "우리은행",
  },
  {
    "id": 2,
    "bank_nick": "SC",
    "bank_name": "한국스탠다드차타드은행",
  },
  {
    "id": 3,
    "bank_nick": "아이엠",
    "bank_name": "아이엠뱅크",
  },
  {
    "id": 4,
    "bank_nick": "부산",
    "bank_name": "부산은행",
  },
  {
    "id": 5,
    "bank_nick": "광주",
    "bank_name": "광주은행",
  },
  {
    "id": 6,
    "bank_nick": "제주",
    "bank_name": "제주은행",
  },
  {
    "id": 7,
    "bank_nick": "전북",
    "bank_name": "전북은행",
  },
  {
    "id": 8,
    "bank_nick": "경남",
    "bank_name": "경남은행",
  },
  {
    "id": 9,
    "bank_nick": "IBK",
    "bank_name": "중소기업은행",
  },
  {
    "id": 10,
    "bank_nick": "KDB",
    "bank_name": "한국산업은행",
  },
  {
    "id": 11,
    "bank_nick": "국민",
    "bank_name": "국민은행",
  },
  {
    "id": 13,
    "bank_nick": "신한",
    "bank_name": "신한은행",
  },
  {
    "id": 14,
    "bank_nick": "농협",
    "bank_name": "농협은행주식회사",
  },
  {
    "id": 15,
    "bank_nick": "하나",
    "bank_name": "하나은행",
  },
  {
    "id": 16,
    "bank_nick": "케이",
    "bank_name": "주식회사 케이뱅크",
  },
  {
    "id": 17,
    "bank_nick": "수협",
    "bank_name": "수협은행",
  },
  {
    "id": 18,
    "bank_nick": "카카오",
    "bank_name": "주식회사 카카오뱅크",
  },
  {
    "id": 19,
    "bank_nick": "토스",
    "bank_name": "토스뱅크 주식회사",
  },
  {
    "id": 0,
    "bank_nick": "없음",
    "bank_name": "없음",
  },

]); // 은행 리스트
const selectedBank = ref(null); // 선택된 은행 ID

// 선택된 은행 이름 계산
const selectedBankName = computed(() => {
  const bank = banks.value.find((b) => b.id === selectedBank.value);
  return bank ? bank.bank_nick : "";
});

// 은행 선택 처리
const selectBank = (bankId) => {
  selectedBank.value = bankId;
};


const signin = function () {
  const signinData = {
    username: username.value,
    password1: password1.value,
    password2: password2.value,
    nickname: nickname.value,
    email: email.value,
    birth_date: birthdate.value,
    user_monthly_income: monthlyIncome.value,
    user_monthly_expenses: monthlyExpenses.value,
    bank: selectedBank.value, // 선택된 은행 ID 추가
  };

  axios({
    method: "post",
    url: `${store.BASE_URL}/dj-rest-auth/registration`,
    data: signinData,
  })
    .then((res) => {
      console.log(res.data);
      router.push("/");
      store.isSuccess = true;
    })
    .catch((err) => {
      console.error("회원가입 중 오류 발생:", err);
    });
};
</script>


<style scoped>
.bank-slider {
  display: flex;
  gap: 15px; /* 항목 간 간격 */
  overflow-x: auto; /* 가로 스크롤 활성화 */
  padding: 10px 0;
  scroll-behavior: smooth; /* 스크롤 애니메이션 추가 */
  scrollbar-width: thin; /* 스크롤바 너비 설정 (모던 브라우저) */
}

.bank-slider::-webkit-scrollbar {
  height: 6px; /* 스크롤바 높이 설정 (크롬, 사파리) */
}

.bank-slider::-webkit-scrollbar-thumb {
  background: #ddd; /* 스크롤바 색상 */
  border-radius: 10px;
}

.bank-item {
  flex: 0 0 auto; /* 아이템 크기를 고정 */
  text-align: center;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
}

.bank-item.active {
  background-color: white;
  border: 2px solid #40A2E3;
  color: black;
  transform: scale(1.1); /* 선택된 항목 확대 */
}

.bank-logo {
  width: 50px;
  height: 50px;
  margin-bottom: 5px;
}

.bank-name {
  font-size: 14px;
  color: #333;
  font-weight: bold;
}

.text-success {
  color: green;
  font-size: 0.9em;
}

.signup-container {
  max-width: 1200px;
  margin: 50px auto;
  padding: 30px;
  border: 1px solid #ddd;
  border-radius: 10px;
  background-color: #ffffff;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  align-items: center; /* 수평 가운데 정렬 */
}

.title {
  text-align: center;
  font-size: 28px;
  color: #333;
  margin-bottom: 30px;
  font-weight: bold;
}

.signup-form {
  display: flex;
  flex-direction: column;
  align-items: center; /* 수평 가운데 정렬 */
  width: 100%; /* 폼을 부모 너비에 맞춤 */
}

.form-group {
  width: 100%; /* 입력 필드가 부모 너비를 채우도록 설정 */
  max-width: 500px; /* 입력 필드 최대 너비 제한 */
  margin-bottom: 25px;
  text-align: left; /* 라벨 및 입력 필드 왼쪽 정렬 */
}

.form-group label {
  display: block;
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 8px;
  color: #444;
}

.form-group input {
  width: 100%;
  padding: 12px 15px;
  font-size: 14px;
  border: 1px solid #ddd;
  border-radius: 6px;
  background-color: #f9f9f9;
  transition: border 0.3s ease;
}

.form-group input:focus {
  border-color: #007bff;
  outline: none;
  background-color: #fff;
}

.slider {
  width: 100%;
  margin-top: 15px;
}

.submit-button {
  padding: 15px;
  font-size: 18px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  margin-top: 15px;
  transition: background-color 0.3s ease;
  max-width: 500px; /* 버튼 너비를 제한 */
}

.submit-button:hover {
  background-color: #0056b3;
}
</style>
