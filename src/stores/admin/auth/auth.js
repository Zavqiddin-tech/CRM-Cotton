import { ref } from "vue";
import { defineStore } from "pinia";
import { useApiStore } from "@/stores/admin/api/api";
import { useTokenStore } from "@/stores/admin/auth/token";
import cookies from "vue-cookies";
import router from "@/router";
import { useAnimStore } from "@/stores/animation/anim";



export const useAuthStore = defineStore("auth", () => {
  const api = useApiStore();
  const tokenStore = useTokenStore()
  const { setMessageBox } = useAnimStore();
  
  const login = async (data) => {
    await api
      .postAxios({
        url: "auth/login",
        data,
      })
      .then((res) => {
        if (res.data.token) {
          tokenStore.setToken(res.data.token)
          router.push('/dashboard')
          setMessageBox({
            toggle: true,
            type: "success",
            title: "Xush kelibsiz",
            text: "tizimga kirildi",
          });
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
