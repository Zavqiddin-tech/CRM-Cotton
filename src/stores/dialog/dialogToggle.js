import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useDialogToggle = defineStore('toggle', () => {
  const formToggle = ref(false)
  const setFormToggle = (val) => formToggle.value = val

  return { formToggle, setFormToggle }
})
