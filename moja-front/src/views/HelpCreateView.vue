<template>
  <div>
    <h1>질문 작성</h1>
    <form @submit.prevent="submitHelp">
      <label for="title">제목</label>
      <input type="text" v-model="title" required />

      <label for="content">내용</label>
      <textarea v-model="content" required></textarea>

      <button type="submit">작성하기</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useHelpStore } from '@/stores/help'
import { useRouter } from 'vue-router'

const title = ref('')
const content = ref('')
const store = useHelpStore()
const router = useRouter()

const submitHelp = async () => {
  try {
    const helpData = {
      help_title: title.value,
      help_content: content.value
    }
    await store.createHelp(helpData)
    router.push({ name: 'help-list' })
  } catch (error) {
    console.error('질문 생성 중 오류 발생:', error)
    // 여기에 사용자에게 오류 메시지를 보여주는 로직을 추가할 수 있습니다
  }
}
</script>
