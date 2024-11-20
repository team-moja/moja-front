<template>
  <div>
    <h1>상품 목록</h1>
    <ProductList v-for="product in productList" :key="product.id" :product="product"/>
  </div>
</template>

<script setup>
import ProductList from '@/components/financese/ProductList.vue'
import {ref, onMounted} from 'vue'
import { useFinanceStore } from '@/stores/finance.js';
import axios from 'axios';
const productList = ref([])

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