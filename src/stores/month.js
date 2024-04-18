import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useMonthStore = defineStore('counter', () => {
  const month = ref(["yanvar", "fevral", "mart", "aprel", "may", "iyun", "iyul", "avgust", "sentyabr", "oktyabr", "noyabr", "dekabr"])
  const week = ref(["dushanba", "seshanba", "chorshanba", "payshanba", "juma", "shanba", "yakshanba"])

  return {
    month,
    week
  }
})
