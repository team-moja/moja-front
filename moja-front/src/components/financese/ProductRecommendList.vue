<template>
  <h1>사이트 추천</h1>
  <div v-for=" categoryProduct in financeStore.recommendProductLists.category_based_recommendations" :key="categoryProduct.id">
    {{ categoryProduct }}
    
  </div>
  <h1>연령대</h1>
  <div v-for=" ageProduct in financeStore.recommendProductLists.age_group_recommendations" :key="ageProduct.id">
    {{ ageProduct }}
    
  </div>
  <h1>전체 사용자</h1>
  <div v-for=" allUsersProduct in financeStore.recommendProductLists.top_products_by_all_users" :key="allUsersProduct.id">
    {{ allUsersProduct }}
    
  </div>
</template>

<script setup>
import { useFinanceStore } from '@/stores/finance';
const financeStore = useFinanceStore()

</script>

<style scoped>

</style>