// import axios from 'axios'
// import { ref } from 'vue'
// import { defineStore } from 'pinia'

// export const useHelpStore = defineStore('help', () => {
//   const helps = ref([])
//   const API_URL = 'http://127.0.0.1:8000/boards'

//   const getHelps = async () => {
//     try {
//       const token = localStorage.getItem('token')  // 저장된 토큰 가져오기
//       const response = await axios.get(`${API_URL}/help/`, {
//         headers: {
//           Authorization: `Token ${token}`  // 토큰을 헤더에 추가
//         }
//       })
//       helps.value = response.data
//     } catch (error) {
//       console.error('질문 리스트 로드 실패:', error)
//     }
//   }

//   const createHelp = async (helpData) => {
//     try {
//       const token = localStorage.getItem('token')  // 저장된 토큰 가져오기
//       const response = await axios.post(
//         `${API_URL}/help/`,
//         helpData,
//         {
//           headers: {
//             Authorization: `Token ${token}`  // 토큰을 헤더에 추가
//           }
//         }
//       )
//       helps.value.unshift(response.data)
//       return response.data
//     } catch (error) {
//       console.error('질문 생성 실패:', error.response)
//       throw error
//     }
//   }

//   return { helps, getHelps, createHelp }
// })

import axios from "axios";
import { ref } from "vue";
import { defineStore } from "pinia";
import { useAccountStore } from "./account";

export const useHelpStore = defineStore(
  "help",
  () => {
    const helps = ref([]);
    const API_URL = "http://127.0.0.1:8000/boards/help";

    // 질문 게시글 리스트 가져오기
    const getHelps = async () => {
      try {
        const response = await axios.get(`${API_URL}/`, {
          headers: {
            Authorization: `Token ${useAccountStore().token}`,
          },
        });
        console.log(response.data);
        helps.value = response.data;
      } catch (error) {
        console.error("질문 리스트 로드 실패:", error);
      }
    };

    // 질문 게시글 생성
    const createHelp = async (helpData) => {
      try {      
        const response = await axios.post(`${API_URL}/`, helpData, {
          headers: {
            Authorization: `Token ${useAccountStore().token}`,
            "Content-Type": "application/json",
          },
        });
        helps.value.unshift(response.data);
        return response.data;
      } catch (error) {
        console.error("질문 생성 실패:", error.response);
        throw error;
      }
    };

    return { helps, getHelps, createHelp };
  },
  { persist: true }
);

