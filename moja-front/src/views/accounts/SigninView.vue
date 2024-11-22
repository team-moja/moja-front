<template>
  <div class="signup-container">
    <h1 class="title">회원가입</h1>
    <form @submit.prevent="signin" class="signup-form">
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
      <button type="submit" class="submit-button">회원가입</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useAccountStore } from "@/stores/account";
import { useRouter } from "vue-router";
import axios from "axios";

const store = useAccountStore();
const router = useRouter()

const username = ref("");
const password1 = ref("");
const password2 = ref("");
const email = ref("");
const nickname = ref("");
const birthdate = ref("");
const monthlyIncome = ref(2000000);
const monthlyExpenses = ref(100000);

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
  };

  axios({
    method: "post",
    url: `${store.BASE_URL}/dj-rest-auth/registration`,
    data: signinData,
  })
    .then((res) => {
      console.log(res.data);
      router.push('/')
      store.isSuccess = true
    })
    .catch((err) => {
      console.log(err);
    });
};
</script>

<style scoped>
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
