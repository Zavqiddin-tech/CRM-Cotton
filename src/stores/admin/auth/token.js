import { ref } from "vue";
import { defineStore } from "pinia";
import cookies from "vue-cookies";

export const useTokenStore = defineStore('token', ()=> {
    const token = ref('')
    const header = ref({})

    const setToken = (payload)=> {
        cookies.set('cotton-token', payload)
        token.value = payload
        header.value = {
            headers: {
                'authorization': `Bearor ${payload}`,
              },
        }
    }

    return {
        token,
        setToken,
    }
})