import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import {useRouter} from 'vue-router'
import axios from 'axios'


export const useAccountStore = defineStore('counter', () => {
  const router = useRouter()
  const token = ref('')
  const BASE_URL = 'http://127.0.0.1:8000/accounts'
  const isSuccess = ref(false)
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
      token.value = res.data.key;
      isSuccess.value = !isSuccess.value
      console.log(isSuccess.value);
    })
    .catch((err) => {
      // console.error(err);
      window.alert('로그인이 실패했습니다!')
      isSuccess.value = true; // 로그인 실패 시 false
    });
  }

  const logout = function() {
    // 로컬에서 토큰 삭제
    token.value = '';

    // 서버에 로그아웃 요청 (선택 사항, JWT는 클라이언트에서 관리하므로 실제로 필요하지 않지만)
    axios.post(`${BASE_URL}/dj-rest-auth/logout/`)
      .then((res) => {
        console.log('로그아웃 성공');
        // 로그아웃 후 처리 (예: 로그인 페이지로 리디렉션)
      })
      .catch((err) => {
        console.log('로그아웃 오류:', err);
      });

    // 로그아웃 후 필요한 추가 작업 (예: 로그인 페이지로 이동)
    // 예시: this.$router.push('/login');
  };

  return {login, BASE_URL, token, logout, isSuccess}
}, { persist: true })
