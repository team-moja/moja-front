<template>
    <div>
        <h1>로그인</h1>
        <form @submit.prevent="login">
            <label>아이디: </label>
            <input type="text" v-model="userId"><br>
            <label>비밀번호: </label>
            <input type="text" v-model="password"><br>
            <input type="submit">
        </form>
    </div>
</template>

<script setup>
import {ref} from 'vue'
import {useAccountStore} from '@/stores/account'
const userId = ref('')
const password = ref('')
const store = useAccountStore()

const login = function () {
    const loginData = {userId: userId.value, password: password.value}
    store.login(loginData)
}
</script>

<style scoped>

</style>