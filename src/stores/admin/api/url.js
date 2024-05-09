import { ref } from "vue";
import { defineStore } from "pinia";

export const useUrlStore = defineStore('url', ()=> {
    const url = ref(import.meta.env.VITE_APP_API_URL)

    return {
       url
    }
})