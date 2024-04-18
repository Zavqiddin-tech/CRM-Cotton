import { ref } from "vue";
import { defineStore } from "pinia";
import { useApiStore } from "@/stores/admin/api/api";

export const useWorkerHistory = defineStore("history", () => {
  const api = useApiStore();

  const oneWorker = ref({});
  const setOneWorker = (val) => (oneWorker.value = val);
  const payArray = ref([]);

  // Ishchini paxta terganini qo'shadi
  const new_workerHistory = async (workerId, data) => {
    await api
      .postAxios({
        url: `workers/work-history/${workerId}`,
        data,
      })
      .then((res) => {
        console.log(res);
        setOneWorker(res.data);
      });
  };

  // Ishchini paxta terganini update qiladi
  const update_workerHistory = async (workerId, data) => {
    await api
      .putAxios({
        url: `workers/${workerId}/work-history/${data._id}`,
        data,
      })
      .then((res) => {
        setOneWorker(res.data);
      });
  };

  const paidHistory = async (workerId, data) => {
    console.log(workerId, data);
    await api
      .putAxios({ url: `workers/${workerId}/paid-history`, data })
      .then((res) => {
        setOneWorker(res.data);
        payArray.value = [];
      });
  };

  const changeVerify = async (id, data) => {
    await api
      .putAxios({ url: `workers/worker-verify/${id}`, data })
      .then((res) => {
        setOneWorker(res.data)
      });
  };

  return {
    oneWorker,
    payArray,
    setOneWorker,
    new_workerHistory,
    update_workerHistory,
    paidHistory,
    changeVerify,
  };
});
