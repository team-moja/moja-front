<template>
  <div>
    <h1>메인</h1>
    <button @click="moveToLogin">로그인</button>
    <RouterView></RouterView>
  </div>
</template>

<script setup>
import { RouterLink, RouterView, useRouter } from 'vue-router'

const router = useRouter()
const moveToLogin = function () {
  router.push({name:'login'})
}
</script>

<style scoped>

</style>