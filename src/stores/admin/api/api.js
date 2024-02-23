import { ref } from "vue";
import { defineStore } from "pinia";
import axios from "axios";
import router from "@/router";
import { useTokenStore } from "@/stores/admin/auth/token";

import { useAnimStore } from "@/stores/animation/anim";

export const useApiStore = defineStore("api", () => {
  const url = ref("http://localhost:3000");
  const tokenStore = useTokenStore();

  const { setMessageBox } = useAnimStore();

  const getAxios = (payload) => {
    return axios
      .get(`${url.value}/${payload.url}`,
      {
        ...tokenStore.header
      })
      .catch((e) => {
        if (e.response.status == 401) {
          setMessageBox({
            toggle: true,
            type: "error",
            title: "Kirish man etiladi",
            text: "sizga bu sahifaga ruxsat yo'q",
          });
          router.push("/login");
          return false;
        }
        console.log(e.message);
      });
  };

  const postAxios = (payload) => {
    return axios
      .post(`${url.value}/${payload.url}`, payload.data, {
        ...tokenStore.header
      })
      .catch((e) => {
        if (e.response.status == 401) {
          setMessageBox({
            toggle: true,
            type: "error",
            title: "Xatolik",
            text: "Login yoki parol xato",
          });
        }
        console.log(e.message);
      });
  };

  const putAxios = (payload) => {
    return axios.put(`${url.value}/${payload.url}`, payload.data).catch((e) => {
      console.log(e.message);
    });
  };

  const deleteAxios = (payload) => {
    return axios.delete(`${url.value}/${payload.url}`).catch((e) => {
      console.log(e.message);
    });
  };
  return {
    getAxios,
    postAxios,
    putAxios,
    deleteAxios,
  };
});
