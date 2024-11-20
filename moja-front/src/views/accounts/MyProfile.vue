<template>
  <div class="profile-container">
    <h2>나의 프로필</h2>

    <div class="profile-card">
      <div class="profile-image-container">
        <div class="profile-image-wrapper">
          <img
            :src="profileImageUrl"
            alt="프로필 이미지"
            class="profile-image"
          />
          <!-- <img src="@/assets/blue-cap.png" alt="모자" class="cap-overlay" /> -->
        </div>
        <input
          type="file"
          ref="imageInput"
          @change="handleImageUpload"
          accept="image/*"
          class="hidden"
        />
        <button @click="$refs.imageInput.click()" class="upload-button">
          사진 변경
        </button>
      </div>

      <div class="profile-info">
        <div class="info-item">
          <span class="label">아이디:</span>
          <span class="value">{{ userInfo.username }}</span>
        </div>
        <div class="info-item">
          <span class="label">이메일:</span>
          <span class="value">{{ userInfo.email }}</span>
        </div>
        <div class="info-item">
          <span class="label">닉네임:</span>
          <span class="value">{{ userInfo.nickname }}</span>
        </div>
        <div class="info-item">
          <span class="label">주거래 은행:</span>
          <div class="bank-list">
            <div
              v-for="userBank in userInfo.user_banks"
              :key="userBank.user_bank_pk"
              class="bank-item"
            >
              <span :class="{ 'main-bank': userBank.main_bank }">
                {{ userBank.bank.name }}
                <span span v-if="userBank.main_bank" class="main-badge"
                  >주거래</span
                >
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const userInfo = ref({});
const profileImageUrl = ref("");

onMounted(async () => {
  try {
    const response = await axios.get("/api/v1/accounts/profile/");
    userInfo.value = response.data;
    if (response.data.profile_image) {
      profileImageUrl.value =
        process.env.VUE_APP_API_URL + response.data.profile_image;
    } else {
      // profileImageUrl.value = '@/assets/default-profile.png'
    }
  } catch (error) {
    console.error("프로필 로딩 실패:", error);
  }
});

const handleImageUpload = async (event) => {
  const file = event.target.files[0];
  if (!file) return;

  const formData = new FormData();
  formData.append("profile_image", file);

  try {
    const response = await axios.put(
      "/api/v1/accounts/profile/update/",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    profileImageUrl.value =
      process.env.VUE_APP_API_URL + response.data.profile_image;
  } catch (error) {
    console.error("이미지 업로드 실패:", error);
  }
};
</script>

<style scoped>
.bank-list {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.bank-item {
  padding: 0.5rem 1rem;
  background: #f0f0f0;
  border-radius: 6px;
}

.main-bank {
  font-weight: bold;
  color: #40a2e3;
}

.main-badge {
  background: #40a2e3;
  color: white;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 0.8rem;
  margin-left: 0.5rem;
}
</style>
