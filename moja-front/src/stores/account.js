import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

export const useAccountStore = defineStore('counter', () => {
  const token = ref('')
  const BASE_URL = 'http://127.0.0.1:8000/accounts'
  const login = function(loginData) {
    axios({
        url: `${BASE_URL}/dj-rest-auth/login/`,
        method: 'post',
        data: {
          username: loginData.userId,
          password: loginData.password
      }
    })
    .then((res) => {
      console.log('로그인 성공');
      token.value = res.data.key
      console.log(token.value);
    })
    .catch((err) => {
      console.log(err);
    })
  }

  return {login, BASE_URL}
})
