<template>
  <!-- <Layout/> -->
    <!-- <div>
    <h1>메인</h1>
    <button @click="moveToLogin">로그인</button>
    <button @click="store.logout()">로그아웃</button>
    <button @click="moveToSignin">회원가입</button>
  </div> -->
    <!-- <router-view /> -->

<!-- Layout.vue -->
  <div class="layout">
    <Header />
    <main class="main-content">
      <router-view></router-view>
    </main>
    <Footer />
  </div>
</template>

<script setup>
import { RouterLink, RouterView, useRouter } from 'vue-router'
import { useAccountStore } from './stores/account';
// import Layout from '@/components/Layout.vue';
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'

const router = useRouter()
const store = useAccountStore()

const moveToLogin = function () {
  router.push({name:'login'})
}
const moveToSignin = function () {
  router.push({name:'signin'})
}


</script>

<style>
@font-face {
  font-family: "TheJamsil5";
  font-style: normal;
  font-weight: 100;
  src: url("@/assets/fonts/The Jamsil 1 Thin.ttf") format("woff2");
}
@font-face {
  font-family: "TheJamsil5";
  font-style: normal;
  font-weight: 300;
  src: url("@/assets/fonts/The Jamsil 2 Light.ttf") format("woff2");
}
@font-face {
  font-family: "TheJamsil5";
  font-style: normal;
  font-weight: 400;
  src: url("@/assets/fonts/The Jamsil 3 Regular.ttf") format("woff2");
}
@font-face {
  font-family: "TheJamsil5";
  font-style: normal;
  font-weight: 500;
  src: url("@/assets/fonts/The Jamsil 4 Medium.ttf") format("woff2");
}
@font-face {
  font-family: "TheJamsil5";
  font-style: normal;
  font-weight: 700;
  src: url("@/assets/fonts/The Jamsil 5 Bold.ttf") format("woff2");
}
@font-face {
  font-family: "TheJamsil5";
  font-style: normal;
  font-weight: 800;
  src: url("@/assets/fonts/The Jamsil 6 ExtraBold.ttf") format("woff2");
}

@font-face {
    font-family: 'Dovemayo-Medium';
    src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_four@1.0/Dovemayo-Medium.woff') format('woff');
    font-weight: normal;
    font-style: normal;
}
* {
  font-family: 'TheJamsil5';
  font-weight: 400;
}


body {
  margin: 0;
  font-family: Arial, sans-serif;
  background-color: #f9f9f9;
}
.main-content {
  flex-grow: 1;
  max-width: 1200px;
  margin: 0 auto;
  /* padding: 2rem 1rem; */
}

</style>