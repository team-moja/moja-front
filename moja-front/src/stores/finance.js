import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useFinanceStore = defineStore('counter', () => {
  const FINANCE_URL = 'http://127.0.0.1:8000/finances'
  console.log(FINANCE_URL);
  

  return {FINANCE_URL}
})
