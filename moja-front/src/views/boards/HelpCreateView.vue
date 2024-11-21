<template>
<div class="help-container">
  <h1 class="help-title">질문 작성</h1>
  <form @submit.prevent="submitHelp" class="create-form">
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
const store = useHelpStore();
const router = useRouter();

const submitHelp = async () => {
  try {
    const helpData = {
      help_title: title.value,
      help_content: content.value,
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
  font-size: 2rem;
  margin-bottom: 2rem;
  text-align: center;
}

.create-form {
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  color: #2C7BA8;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  font-size: 1rem;
}

.form-group textarea {
  min-height: 150px;
  resize: vertical;
}

.btn {
  background-color: #40A2E3;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.2s;
}

.btn:hover {
  background-color: #2C7BA8;
}
</style>