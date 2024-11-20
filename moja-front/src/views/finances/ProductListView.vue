<template>
  <div class="container">
    <div class="header">
      <h1>예/적금 목록</h1>
      <button @click="moveToRecommend">예적금 추천</button>
    </div>
    
    <!-- ProductList 컴포넌트가 들어갈 자리 -->
    <div id="product-list-container">
          <ProductList v-for="product in productList" :key="product.id" :product="product"/>
        </div>
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
.container {
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
        }

        .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
        }

        .recommend-button {
            padding: 10px 20px;
            background-color: #007bff;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
        }
</style>