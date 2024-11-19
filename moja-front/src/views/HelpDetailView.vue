<template>
  <div>
    <h1>{{ help?.help_title }}</h1>
    <p>{{ help?.help_content }}</p>
    <router-link to="/help">
      <button>목록으로 돌아가기</button>
    </router-link>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

const route = useRoute()
const help = ref(null)

onMounted(async () => {
  const response = await axios.get(`http://127.0.0.1:8000/boards/help/${route.params.id}/`)
  help.value = response.data
})
</script>
