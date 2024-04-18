import { ref } from "vue";
import { defineStore } from "pinia";
import { useApiStore } from "@/stores/admin/api/api";
import { useTokenStore } from "@/stores/admin/auth/token";
import cookies from "vue-cookies";
import router from "@/router";



export const useAuthStore = defineStore("auth", () => {
  const api = useApiStore();
  const tokenStore = useTokenStore()
  
  const login = async (data) => {
    await api
      .postAxios({
        url: "auth/login",
        data,
      })
      .then((res) => {
        console.log(res.data);
        if (res.data.token) {
          tokenStore.setToken(res.data.token)
          tokenStore.setUser(res.data.user)
          router.push('/dashboard')

        }
      });
  };

  const checkUser = async () => {
    if (cookies.isKey('cotton-token')) {
        tokenStore.setToken(cookies.get('cotton-token'))
    }
    let res = await api.getAxios({
        url: "auth/checkuser"
    })
    if (res.status == 200) {
        console.log('success');
    }
  }

  return {
    login,
    checkUser
  };
});
