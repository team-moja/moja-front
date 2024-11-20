<template>
  <div>
    <h1>상세</h1>
    <p>{{ product.prdt_name }}</p>
    <p>{{ product.bank.bank_name }}</p>
  </div>
</template>

<script setup>
import {ref, onMounted} from 'vue'
import { useRoute } from 'vue-router';
import axios from 'axios';

const route = useRoute()
const productId = route.params.id

const product = ref({})

onMounted(() => {
  axios({
    url: `http://127.0.0.1:8000/finances/product/detail/${productId}`,
    method: 'get'
  })
  .then((res) => {
    product.value = res.data
  })
})

</script>

<style scoped>

</style>