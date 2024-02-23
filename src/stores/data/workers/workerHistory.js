import { ref } from "vue";
import { defineStore } from "pinia";
import { useApiStore } from "@/stores/admin/api/api";
import axios from "axios";

export const useWorkerHistory = defineStore("history", () => {
  const api = useApiStore();

  const oneWorker = ref({});
  const setOneWorker = (val) => (oneWorker.value = val);

  // Ishchini paxta terganini qo'shadi
  const new_workerHistory = async (id, data) => {
    await api
      .putAxios({
        url: `workers/addWork/${id}`,
        data,
      })
      .then((res) => {
        setOneWorker(res.data);
      });
  };

  // Ishchini paxta terganini update qiladi
  const update_workerHistory = async (id, data) => {
    console.log(id, data);
    await api
      .putAxios({
        url: `workers/history/${id}`,
        data,
      })
      .then((res) => {
        setOneWorker(res.data);
      });
  };

  return {
    oneWorker,
    setOneWorker,
    new_workerHistory,
    update_workerHistory,
  };
});
