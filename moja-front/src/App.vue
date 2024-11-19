<template>
  <div>
    <h1>메인</h1>
    <button @click="moveToLogin">로그인</button>
    <button @click="store.logout()">로그아웃</button>
    <button @click="moveToSignin">회원가입</button>
    <RouterView></RouterView>
  </div>
</template>

<script setup>
import { RouterLink, RouterView, useRouter } from 'vue-router'
import { useAccountStore } from './stores/account';

const router = useRouter()
const store = useAccountStore()

const moveToLogin = function () {
  router.push({name:'login'})
}
const moveToSignin = function () {
  router.push({name:'signin'})
}


</script>

<style scoped>

</style>