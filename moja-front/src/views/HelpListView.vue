<template>
  <div>
    <h1>질문 리스트</h1>
    <router-link to="/help/create">
      <button>질문 작성</button>
    </router-link>

    <div v-for="(help, index) in helps" :key="help.id">
      <h3>{{ index + 1 }}. {{ help.help_title }}</h3>
      <p>{{ help.help_content }}</p>
      <router-link :to="`/help/${help.id}`">
        <button>자세히 보기</button>
      </router-link>
      <hr />
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useHelpStore } from '@/stores/help'

const store = useHelpStore()

onMounted(() => {
  store.getHelps()
})

const helps = store.helps
</script>
