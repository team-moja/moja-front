<template>
<div class="help-container">
  <h1 class="help-title">질문 작성</h1>
  <form @submit.prevent="submitHelp" class="create-form">
    <div class="form-group">
        <label for="category">카테고리</label>
        <select v-model="category" required class="category-select">
          <option value="" disabled>카테고리를 선택하세요</option>
          <option v-for="category in categoryOptions" 
                  :key="category.value" 
                  :value="category.value">
            {{ category.label }}
          </option>
        </select>
      </div>
    <div class="form-group">
      <label for="title">제목</label>
      <input type="text" v-model="title" required />
    </div>
    <div class="form-group">
      <label for="content">내용</label>
      <textarea v-model="content" required></textarea>
    </div>
    <button type="submit" class="btn">작성하기</button>
  </form>
</div>
</template>

<script setup>
import { ref } from "vue";
import { useHelpStore } from "@/stores/help";
import { useRouter } from "vue-router";

const title = ref("");
const content = ref("");
const category = ref("");
const categoryOptions = ref([
  { label: '도와줘요', value: 'HELP' },
  { label: '추천해요', value: 'RECOM' },
  { label: '함께해요', value: 'TOGETHER' }
]);

const store = useHelpStore();
const router = useRouter();

const submitHelp = async () => {
  try {
    const helpData = {
      help_title: title.value,
      help_content: content.value,
      help_category: category.value,
    };
    await store.createHelp(helpData);
    router.push({ name: "help-list" });
  } catch (error) {
    console.error("질문 생성 중 오류 발생:", error.response?.data || error.message);
  }
};
</script>


<style scoped>
.help-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

.help-title {
  color: #40A2E3;
  text-align: center;
  margin-bottom: 2rem;
}

.create-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  font-weight: bold;
  color: #333;
}

.form-group input,
.form-group textarea,
.category-select {
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

.category-select {
  height: 2.5rem;
  background-color: white;
}

.form-group textarea {
  min-height: 200px;
  resize: vertical;
}

.btn {
  background-color: #40A2E3;
  color: white;
  padding: 0.75rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
}

.btn:hover {
  background-color: #2C7BA8;
}
</style>