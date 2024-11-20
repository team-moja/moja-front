<template>
  <div>
    <h1>상품 목록</h1>
    <button @click="moveToRecommend">예적금 추천</button>
    <br>
    <ProductList v-for="product in productList" :key="product.id" :product="product"/>
  </div>
</template>

<script setup>
import ProductList from '@/components/financese/ProductList.vue'
import {ref, onMounted} from 'vue'
import { useRouter } from 'vue-router';
import axios from 'axios';
const productList = ref([])
const router = useRouter()

const moveToRecommend = function () {
  router.push('/product/recommend')
}

onMounted(() => {
  axios({
    url: 'http://127.0.0.1:8000/finances/product/',
    method: 'get'
  })
  .then((res) => {
    productList.value = res.data
    console.log(productList.value)
  })
  .catch((err) => {
    console.log(err);
  })
})

</script>

<style scoped>

</style>