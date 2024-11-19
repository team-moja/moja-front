<template>
    <div>
        <h1>회원가입</h1>
        <form @submit.prevent="signin">
            <label>아이디: </label>
            <input type="text" v-model="username"><br>
            <label>비밀번호: </label>
            <input type="text" v-model="password1"><br>
            <label>비밀번호확인: </label>
            <input type="text" v-model="password2"><br>
            <label>이메일: </label>
            <input type="text" v-model="email"><br>
            <label>닉네임: </label>
            <input type="text" v-model="nickname"><br>
            <label>생년월일: </label>
            <input type="text" v-model="birthdate"><br>
            <label>월소득액: </label>
            <input type="text" v-model="monthlyIncome"><br>
            <label>월지출액: </label>
            <input type="text" v-model="monthlyExpenses"><br>
            <input type="submit">
        </form>
    </div>
</template>

<script setup>
import {ref} from 'vue'
import {useAccountStore} from '@/stores/account'
import axios from 'axios'

const store = useAccountStore()

const username = ref('')
const password1 = ref('')
const password2 = ref('')
const email = ref('')
const nickname = ref('')
const birthdate = ref('')
const monthlyIncome = ref('')
const monthlyExpenses = ref('')

const signin = function () {
    const signinData = {
        username: username.value,
        password1: password1.value,
        password2: password2.value,
        nickname: nickname.value,
        email: email.value,
        birth_date: birthdate.value,
        user_monthly_income: monthlyIncome.value,
        user_monthly_expenses: monthlyExpenses.value,
    }

    axios({
        method: 'post',
        url: `${store.BASE_URL}/dj-rest-auth/registration`,
        data: signinData
    })
    .then((res) => {
        console.log(res.data)
    })
    .catch((err) => {
        console.log(err);
    })
}
</script>

<style scoped>

</style>