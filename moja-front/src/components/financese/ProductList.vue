<template>
    <div @click="moveToDetail(product.id)">
        <p>상품평: {{ product.prdt_name }}</p>
        <p>은행: {{ product.bank.bank_name }}</p>
        <p>기본이율: {{ product.product_options[0].intr_rate }}</p>
        <p v-if="product.product_options.length > 1">최대이율: {{ product.product_options[1].max_intr_rate }}</p>
        <hr>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

defineProps({
    product: Object
})

const router = useRouter()

const moveToDetail = function (productId) {
    router.push({name: 'productDetail', params: {id: productId}})
}

</script>

<style scoped>

</style>