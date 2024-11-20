<template>

    <div class="product-card" @click="moveToDetail(product.id)">
        <div class="product-info">
            <img :src="`/src/assets/images/banks/${product.bank.bank_name}.png`" alt="" class="bank-logo">
            <div class="product-details">
                <h3>{{ product.prdt_name }}</h3>
                <p>{{ product.bank.bank_name }}</p>
            </div>
            <div class="rate-info">
                <div class="max-rate" v-if="product.product_options.length > 1">최고 {{ product.product_options[1].max_intr_rate }}</div>
                <div class="base-rate">기본 {{ product.product_options[0].intr_rate }}</div>
            </div>
        </div>
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
        .product-card {
            border: 1px solid #ddd;
            border-radius: 8px;
            padding: 20px;
            margin-bottom: 15px;
            cursor: pointer;
        }

        .product-card:hover {
            background-color: #f8f9fa;
        }

        .product-info {
            display: flex;
            align-items: center;
            gap: 15px;
        }

        .bank-logo {
            width: 40px;
            height: 40px;
            /* background-color: #ffd700; */
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-weight: bold;
        }

        .product-details {
            flex: 1;
        }

        .rate-info {
            text-align: right;
        }

        .max-rate {
            color: #007bff;
            font-weight: bold;
            font-size: 1.1em;
        }

        .base-rate {
            color: #666;
            font-size: 0.9em;
        }
</style>