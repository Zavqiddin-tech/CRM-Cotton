<template>
  <div class="wrapper relative">
    <div
      v-if="updateToggle"
      class="edit-form w-full h-full absolute flex flex-col gap-4 justify-center items-center bg-black bg-opacity-70"
    >
      <div>{{ new Date(updateKg.date).toDateString() }}</div>
      <div class="flex gap-3">
        <input
          type="number"
          v-model="updateKg.kg"
          class="text-black px-2 py-2 rounded-md"
        />
        <button
          @click="submitKg()"
          class="btn bg-green-500 px-2 py-2 rounded-md"
        >
          Tasdiqlash
        </button>
        <button
          @click="setUpdateToggle(false)"
          class="btn bg-red-500 px-2 py-2 rounded-md"
        >
          Bekor qilish
        </button>
      </div>
    </div>
    <table
      v-if="
        Array.isArray(oneWorker.workHistory) && oneWorker.workHistory.length > 0
      "
      class="table-auto w-full"
    >
      <thead class="border-b border-zinc-400 text-left">
        <tr>
          <th></th>
          <th>#</th>
          <th class="py-4 font-medium">Sana</th>
          <th class="py-4 font-medium">Vaqt</th>
          <th class="py-4 font-medium">Jami KG</th>
          <th class="py-4 font-medium">To'lov holadi</th>
          <th class="py-4 font-medium text-center">Batafsil</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(item, index) of oneWorker.workHistory"
          class="border-b border-zinc-300 hover:bg-black hover:bg-opacity-20"
        >
          <td class="min-w-12">
            <div @click="onCheck(item)" class="square ml-2">
              <div v-show="!item.paid"
                class="box flex justify-center items-center border border-2 border-slate-800 rounded"
              >
                <i v-if="item.status === 1" class="bx bx-check font-bold"></i>
              </div>
            </div>
          </td>
          <td class="min-w-8">
            {{ index + 1 }}
          </td>
          <td class="min-w-40">
            <span
              class="text-md font-medium flex items-center gap-2 whitespace-nowrap"
            >
              {{ convertDate(item.date, 1) }}
              <i
                v-if="item.status === 1"
                class="bx bxs-check-circle text-2xl text-black"
              ></i>
            </span>
          </td>
          <td class="min-w-20">
            <span class="text-sm whitespace-nowrap">
              {{ convertDate(item.date, 3) }}
            </span>
          </td>
          <td class="min-w-20">
            <span
              class="inline-flex items-center whitespace-nowrap rounded-md bg-gray-50 px-2 py-1 text-lg font-medium text-black ring-1 ring-inset ring-green-600/20"
              >{{ item.kg }}</span
            >
          </td>
          <td class="min-w-20">
            <span
              v-if="item.paid"
              class="rounded-md bg-green-50 px-2 py-1 text-md font-medium text-green-600 ring-1 ring-inset ring-green-600/20"
              >Berilgan</span
            >
            <span
              v-else
              class="rounded-md bg-red-50 px-2 py-1 text-md font-medium text-red-600 ring-1 ring-inset ring-yellow-600/20"
              >Yo'q</span
            >
          </td>
          <td class="min-w-20 text-center">
            <div
              class="flex justify-center items-center gap-4"
              v-if="!item.paid"
            >
              <i
                @click="editKg(item)"
                class="bx bxs-pencil hover:text-blue-400"
              ></i>
              <i class="bx bxs-trash-alt hover:text-red-400"></i>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-else></div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useRoute } from "vue-router";
import { convertDate } from "@/func/date";
import { useWorkersStore } from "@/stores/data/workers/workers";
import { useWorkerHistory } from "@/stores/data/workers/workerHistory";
const { get_worker } = useWorkersStore();
const { oneWorker, payArray } = storeToRefs(useWorkerHistory());
const { setOneWorker, update_workerHistory } = useWorkerHistory();



const { id } = useRoute().params;
const onCheck = async (val) => {
  if (val) {
    oneWorker.value.workHistory = oneWorker.value.workHistory.map((item) => {
      if (val._id == item._id) return { ...item, status: item.status === 0 ? 1 : 0 };
      else return item;
    });
    payArray.value = oneWorker.value.workHistory.filter(item => item.status === 1 && item.paid === false);
  }
};

const updateKg = ref({});
const updateToggle = ref(false);
const setUpdateToggle = (val) => (updateToggle.value = val);

const editKg = (val) => {
  setUpdateToggle(true);
  updateKg.value = { ...val };
};
const submitKg = () => {
  if (updateKg.value.kg > 0) {
    update_workerHistory(id, { ...updateKg.value });
    setUpdateToggle(false);
    
  }
};

onMounted(async () => {
  get_worker(id).then((res) => {
    setOneWorker(res.data);
  });

  // async/await yoki promise then/catch
 const resp = await get_worker(id);
 setOneWorker(resp.data);
});
</script>

<style lang="scss" scoped>
.wrapper {
  overflow-x: scroll;
}
td {
  padding: 12px 0px;
}
tr:last-child {
  border: unset;
}
.square {
  .box {
    width: 25px;
    height: 25px;
    i {
      font-size: 20px;
    }
  }
}
.table-avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  overflow: hidden;
}
.name {
  text-transform: capitalize;
}
tr,
.bx {
  transition: 0.25s;
  cursor: pointer;
}
.bxs-pencil {
  font-size: 18px;
}
.bxs-trash-alt {
  font-size: 16px;
}
</style>
