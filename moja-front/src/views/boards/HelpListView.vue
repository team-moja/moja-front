<template>
  <div class="help-container">
    <h1 class="help-title">질문 리스트</h1>
    <router-link to="/help/create">
      <button class="btn">질문 작성</button>
    </router-link>

    <div class="help-list">
      <div v-for="(help, index) in helps" :key="help.id" class="help-item">
        <h3>{{ index + 1 }}. {{ help.help_title }}</h3>
        <p>{{ help.help_content }}</p>
        <router-link :to="`/help/${help.id}`">
          <button class="btn">자세히 보기</button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useHelpStore } from "@/stores/help";

const store = useHelpStore();

onMounted(() => {
  store.getHelps();
});

const helps = store.helps;
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

.help-list {
  margin-top: 2rem;
}

.help-item {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  margin-bottom: 1.5rem;
}

.help-item h3 {
  color: #40A2E3;
  margin: 0 0 1rem 0;
}

.help-item p {
  color: #666;
  margin-bottom: 1rem;
}
</style>