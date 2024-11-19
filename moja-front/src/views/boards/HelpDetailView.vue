<template>
  <div class="help-container">
    <div class="help-detail">
      <h1>{{ help?.help_title }}</h1>
      <p>{{ help?.help_content }}</p>
      <router-link to="/help">
        <button class="btn back-btn">목록으로 돌아가기</button>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";

const route = useRoute();
const help = ref(null);

onMounted(async () => {
  const response = await axios.get(
    `http://127.0.0.1:8000/boards/help/${route.params.id}/`
  );
  help.value = response.data;
});
</script>

<style scoped>
.help-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

.help-detail {
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.help-detail h1 {
  color: #40a2e3;
  margin-bottom: 1.5rem;
  font-size: 2rem;
}

.help-detail p {
  color: #444;
  line-height: 1.6;
  margin-bottom: 2rem;
}

.btn {
  background-color: #40a2e3;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.2s;
}

.btn:hover {
  background-color: #2c7ba8;
}

.back-btn {
  margin-top: 1rem;
  display: inline-block;
}
</style>
