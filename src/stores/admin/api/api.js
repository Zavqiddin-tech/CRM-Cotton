import { ref } from "vue";
import { defineStore, storeToRefs } from "pinia";
import axios from "axios";
import router from "@/router";
import { useTokenStore } from "@/stores/admin/auth/token";
import { useUrlStore } from "@/stores/admin/api/url";

export const useApiStore = defineStore("api", () => {
  const { url } = storeToRefs(useUrlStore());
  const tokenStore = useTokenStore();


  const getAxios = (payload) => {
    return axios
      .get(`${url.value}/${payload.url}`, {
        headers: { Authorization: `Bearer ${tokenStore.token}` },
      })
      .catch((e) => {
        if (e.response.status == 401) {
          alert("Kirish man etiladi")
          router.push("/login");
          return false;
        }
        console.log(e.message);
      });
  };

  const postAxios = (payload) => {
    return axios
      .post(`${url.value}/${payload.url}`, payload.data, {
        headers: { Authorization: `Bearer ${tokenStore.token}` },
      })
      .catch((e) => {
        if (e.response.status == 401) {
          alert("Xatolik")
        }
        console.log(e.message);
      });
  };
  const postAxiosFile = (payload) => {
    console.log(payload);
    let formData = new FormData();
    formData.append("file", payload.data.file);
    formData.append("firstName", payload.data.firstName)
    formData.append("lastName", payload.data.lastName)
    formData.append("date", payload.data.date)
    formData.append("verify", payload.data.verify)
    return axios
      .post(`${url.value}/${payload.url}`, formData, {
        headers: { Authorization: `Bearer ${tokenStore.token}` },
      })
      .catch((e) => {
        console.log(e.message);
      });
  };

  const putAxios = (payload) => {
    return axios
      .put(`${url.value}/${payload.url}`, payload.data, {
        headers: { Authorization: `Bearer ${tokenStore.token}` },
      })
      .catch((e) => {
        console.log(e.message);
      });
  };
  const putAxiosFile = (payload) => {
    console.log(payload);
    let formData = new FormData()
    formData.append("file", payload.data.file)
    formData.append("firstName", payload.data.firstName)
    formData.append("lastName", payload.data.lastName)
    formData.append("date", payload.data.date)
    formData.append("verify", payload.data.verify)
    formData.append("img", payload.data.img)
    formData.append("user", payload.data.user)
    return axios.put(`${url.value}/${payload.url}`, formData, {
      headers: { Authorization: `Bearer ${tokenStore.token}` },
    }).catch((e)=> {
      console.log(e.message);
    })
  }


  const deleteAxios = (payload) => {
    return axios
      .delete(`${url.value}/${payload.url}`, {
        headers: { Authorization: `Bearer ${tokenStore.token}` },
      })
      .catch((e) => {
        console.log(e.message);
      });
  };
  return {
    getAxios,
    postAxios,
    postAxiosFile,
    putAxios,
    putAxiosFile,
    deleteAxios,
  };
});
