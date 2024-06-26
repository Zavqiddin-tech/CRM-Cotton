import { ref } from "vue";
import { defineStore } from "pinia";
import { useApiStore } from "@/stores/admin/api/api";

export const useWorkersStore = defineStore("workers", () => {
  const workers = ref([]);
  const openWorkers = ref([]);
  const calendarData = ref([])
  const chartData = ref([])

  const api = useApiStore();

  // Barcha ishchilarni olish
  const get_all_workers = async () => {
    await api
      .getAxios({
        url: "workers",
      })
      .then((res) => {
        workers.value = [...res.data];
        openWorkers.value = [...res.data]
      });
  };

  // Yangi ishchi qo'shish
  const new_worker = async (data) => {
    await api
      .postAxiosFile({
        url: "workers",
        data,
      })
      .then((res) => {
        workers.value = [res.data, ...workers.value];
        openWorkers.value = [res.data, ...openWorkers.value];
      });
  };

  // Bitta ishchini olish
  const get_worker = async (_id) => {
    return await api.getAxios({
      url: `workers/${_id}`,
    });
  };

  // Ma'lumotni yangilab saqlash
  const update_worker = async (data) => {
    await api
      .putAxiosFile({
        url: `workers/${data._id}`,
        data,
      })
      .then((res) => {
        workers.value = workers.value.map((item) => {
          if (item._id == res.data._id) return res.data;
          return item;
        });
        openWorkers.value = [...workers.value];
      });
  };

  // Ishchini o'chirish
  const delete_worker = async (_id) => {
    await api
      .deleteAxios({
        url: `workers/${_id}`
      })
      .then(() => {
        workers.value = workers.value.filter((item) => {
          if (item._id == _id) return false;
          return item;
        });
        openWorkers.value = [...workers.value];
      });
  };

  // kalendar bo'yicha kg larni topib beradi
  const calendarWork = async (data) => {
    await api.postAxios({url: 'workers/calendar-work', data}).then(res => {
      calendarData.value = [...res.data]
    })
  }
  const getAllWorks = async () => {
    let res = await api.getAxios({url: "workers/calendarDto"})
    if (res.status == 200) {
      chartData.value = [...res.data]
    }
  };


  const filtered = (val) => {
    openWorkers.value = [...val]
  }

  return {
    workers,
    openWorkers,
    calendarData,
    chartData,
    filtered,
    get_all_workers,
    get_worker,
    new_worker,
    update_worker,
    delete_worker,
    calendarWork,
    getAllWorks
  };
});
