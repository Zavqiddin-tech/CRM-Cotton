import { ref } from "vue";
import { defineStore } from "pinia";
import { useApiStore } from "@/stores/admin/api/api";

export const useFarmerStore = defineStore("farmer", () => {
  const farmers = ref([]);

  const api = useApiStore();

  const getAllFarmers = async () => {
    let res = await api.getAxios({ url: "auth/users" });
    if (res.status == 200) {
      farmers.value = [...res.data];
    }
  };

  // add new farmer
  const newFarmer = async (data) => {
    await api.postAxios({ url: "auth/regis", data }).then((res) => {
      farmers.value = [...res.data];
    });
  };

  // one farmer
  const getOneFarmer = async (id) => {
    return await api.getAxios({ url: `auth/users/${id}` });
  };

  // change status
  const changeStatusFarmer = async (id) => {
    await api.putAxios({ url: `auth/users/status/${id}` }).then((res) => {
      farmers.value = [...res.data];
    });
  };

  // update full
  const updateFarmer = async (data) => {
    await api.putAxios({ url: `auth/users/${data._id}`, data }).then((res) => {
      farmers.value = [...res.data]
    });
  };

  // delete farmer
  const deleteFarmer = async (id) => {
    await api.deleteAxios({ url: `auth/users/${id}` }).then((res) => {
      farmers.value = farmers.value.filter((item) => {
        if (item._id == id) return false;
        return item;
      });
    });
  };

  return {
    farmers,
    getAllFarmers,
    newFarmer,
    getOneFarmer,
    changeStatusFarmer,
    updateFarmer,
    deleteFarmer,
  };
});
