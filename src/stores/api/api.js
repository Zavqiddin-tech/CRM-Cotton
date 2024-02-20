import { ref } from 'vue';
import { defineStore } from 'pinia'
import axios from 'axios'


export const useApiStore = defineStore("api", () => {

  const url = ref('http://localhost:3000')


  const getAxios = (payload) => {
    return axios
      .get(`${url.value}/${payload.url}`,)
      .catch((e) => {
        console.log(e.message);
      });
  };

  const postAxios = (payload) => {
    return axios
      .post(`${url.value}/${payload.url}`, payload.data)
      .catch((e) => {
        console.log(e.message);
      });
  };

  const putAxios = (payload) => {
    return axios
      .put(`${url.value}/${payload.url}`, payload.data,)
      .catch((e) => {
        console.log(e.message);
      });
  };

  const deleteAxios = (payload) => {
    return axios
      .delete(`${url.value}/${payload.url}`)
      .catch((e) => {
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

