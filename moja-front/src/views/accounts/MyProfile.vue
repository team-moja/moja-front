<!-- accounts/MyProfile.vue -->
<template>
  <div class="my-page-container">
    <div class="profile-section">

      <!-- 프로필 이미지 -->
      <div class="profile-image-section">
        <div class="profile-image-container">
          <img src="/cap-image.png" alt="모자" class="cap-image">
          <img :src="profileImage" alt="프로필 이미지" class="profile-image">
        </div>
      </div>

      <div class="profile-header">
        <h1>회원 정보</h1>
        <button 
          v-if="!isEditing" 
          @click="toggleEdit" 
          class="edit-button"
        >
          정보 수정
        </button>
      </div>

      <!-- 정보 표시 모드 -->
      <div v-if="!isEditing" class="user-info">
        <div class="info-grid">
          <div class="info-item">
            <label>아이디</label>
            <span>{{ userInfo.username }}</span>
          </div>
          <div class="info-item">
            <label>이메일</label>
            <span>{{ userInfo.email }}</span>
          </div>
          <div class="info-item">
            <label>닉네임</label>
            <span>{{ userInfo.nickname }}</span>
          </div>
          <div class="info-item">
            <label>생년월일</label>
            <span>{{ formatDate(userInfo.birth_date) }}</span>
          </div>
          <div class="info-item">
            <label>월 소득액</label>
            <span>{{ formatCurrency(userInfo.user_monthly_income) }}원</span>
          </div>
          <div class="info-item">
            <label>월 지출액</label>
            <span>{{ formatCurrency(userInfo.user_monthly_expenses) }}원</span>
          </div>
          <div class="info-item">
            <label>주거래은행</label>
            <span>{{ userInfo.bank?.bank_name || '미등록' }}</span>
          </div>
        </div>
      </div>

      <!-- 정보 수정 모드 -->
      <div v-else class="edit-form">
        <form @submit.prevent="handleSubmit">
          <div class="form-grid">
            <div class="form-item">
              <label>아이디</label>
              <div class="readonly-value">{{ userInfo.username }}</div>
            </div>
            <div class="form-item">
              <label>이메일</label>
              <input v-model="editForm.email" type="email" required>
            </div>
            <div class="form-item">
              <label>생년월일</label>
              <div class="readonly-value">{{ formatDate(userInfo.birth_date) }}</div>
            </div>
            <div class="form-item">
              <label>월 소득액: <strong>{{ formatCurrency(editForm.user_monthly_income) }}원</strong></label>
              <input 
                type="range" 
                v-model="editForm.user_monthly_income" 
                min="0" 
                max="10000000" 
                step="100000" 
                class="slider"
              />
            </div>
            <div class="form-item">
              <label>월 지출액: <strong>{{ formatCurrency(editForm.user_monthly_expenses) }}원</strong></label>
              <input 
                type="range" 
                v-model="editForm.user_monthly_expenses" 
                min="0" 
                max="10000000" 
                step="100000" 
                class="slider"
              />
            </div>
            <div class="form-item">
              <label>주거래은행</label>
              <select v-model="editForm.bank">
                <option v-for="bank in banks" :key="bank.id-1" :value="bank.id-1">
                  {{ bank.bank_name }}
                </option>
              </select>
            </div>
          </div>

          <div class="button-group">
            <button type="submit" class="save-button">저장</button>
            <button type="button" @click="toggleEdit" class="cancel-button">취소</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAccountStore } from '@/stores/account'
import axios from 'axios'

const accountStore = useAccountStore()
const isEditing = ref(false)
const userInfo = ref({})
// const banks = ref([])
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

]);

const editForm = ref({
  nickname: '',
  email: '',
  birth_date: '',
  user_monthly_income: 0,
  user_monthly_expenses: 0,
  bank: null
})

// 사용자 정보 불러오기
const fetchUserInfo = async () => {
  try {
    const response = await axios({
      method: 'get',
      url: `${accountStore.BASE_URL}/detail/${accountStore.userId}`,
      headers: {
        'Authorization': `Token ${accountStore.token}`
      }
    })
    console.log('서버 응답 데이터:', response.data)
    
    userInfo.value = {
      userId: response.data.pk,
      username: response.data.username,
      email: response.data.email,
      nickname: response.data.nickname,
      birth_date: response.data.birth_date,
      user_monthly_income: parseInt(response.data.user_monthly_income) || 0,
      user_monthly_expenses: parseInt(response.data.user_monthly_expenses) || 0,
      bank: response.data.bank
    }
    
    initEditForm()
  } catch (error) {
    console.error('사용자 정보 로드 실패:', error)
  }
}

// 수정 폼 초기화 - 수정 가능한 필드만 포함
const initEditForm = () => {
  editForm.value = {
    nickname: userInfo.value.nickname || '',
    email: userInfo.value.email || '',
    user_monthly_income: parseInt(userInfo.value.user_monthly_income) || 0,
    user_monthly_expenses: parseInt(userInfo.value.user_monthly_expenses) || 0,
    bank: userInfo.value.bank
  }
}

const toggleEdit = () => {
  if (isEditing.value) {
    initEditForm()
  }
  isEditing.value = !isEditing.value
}

const formatDate = (date) => {
  if (!date) return ''
  return new Date(date).toLocaleDateString('ko-KR')
}

const formatCurrency = (amount) => {
  const num = parseInt(amount) || 0
  return new Intl.NumberFormat('ko-KR').format(num)
}


// 폼 제출 처리 - 수정 가능한 필드만 전송
const handleSubmit = async () => {
  try {
    const response = await axios({
      method: 'put',
      url: `${accountStore.BASE_URL}/detail/${accountStore.userId}/`,
      headers: {
        'Authorization': `Token ${accountStore.token}`
      },
      data: editForm.value
    })

    await fetchUserInfo()
    isEditing.value = false
    alert('회원 정보가 수정되었습니다.')
  } catch (error) {
    console.error('회원 정보 수정 실패:', error)
    alert('회원 정보 수정에 실패했습니다.')
  }
}

// 기본 프로필 이미지 경로
const profileImage = ref('/default-profile.png')

onMounted(() => {
  fetchUserInfo()
})
</script>

<style scoped>

.readonly-value {
  padding: 0.5rem;
  background-color: #f5f5f5;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  color: #666;
}

.slider {
  width: 100%;
  margin-top: 0.5rem;
  cursor: pointer;
}

.form-item strong {
  color: #1890ff;
  margin-left: 0.5rem;
}

.my-page-container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem;
}

.profile-section {
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 2rem;
}

.profile-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.edit-button {
  background-color: #40A2E3;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
}

.info-grid, .form-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
}

.info-item {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.info-item label {
  font-weight: 500;
  color: #666;
}

.info-item span {
  font-size: 1.1rem;
}

.form-item {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-item input,
.form-item select {
  padding: 0.5rem;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  font-size: 1rem;
}

.button-group {
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
  justify-content: flex-end;
}

.save-button,
.cancel-button {
  padding: 0.5rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
}

.save-button {
  background-color: #40A2E3;
  color: white;
  border: none;
}

.cancel-button {
  background-color: white;
  border: 1px solid #d9d9d9;
}

.save-button:hover {
  background-color: #40A2E3;
}

.cancel-button:hover {
  background-color: #f5f5f5;
}

/* 프로필 이미지 관련 스타일 추가 */
.profile-image-section {
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
}

.profile-image-container {
  position: relative;
  width: 200px;
  height: 200px;
}

.profile-image {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #40A2E3;
  position: relative;
  z-index: 1;
}

.cap-image {
  position: absolute;
  top: -70px; /* 모자 위치 조정 */
  left: 50%;
  transform: translateX(-50%);
  width: 160px; /* 모자 크기 조정 */
  height: auto;
  z-index: 2;
}
</style>