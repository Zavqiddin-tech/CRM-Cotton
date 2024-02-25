<template>
  <div class="wrapper">
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
          <td class="min-w-8">
            <div @click="onCheck(item)" class="square ml-2">
              <div
                class="box flex justify-center items-center border border-2 border-slate-800 rounded"
              >
                <i v-if="item.money" class="bx bx-check font-bold"></i>
              </div>
            </div>
          </td>
          <td class="min-w-5">
            {{ index + 1 }}
          </td>
          <td class="min-w-40">
            <span class="text-md font-medium flex items-center gap-2 whitespace-nowrap">
              {{ new Date(item.date).toDateString() }}
              <i
                v-if="item.money"
                class="bx bxs-check-circle text-xl text-blue-500"
              ></i>
            </span>
          </td>
          <td class="min-w-20">
            <span class="text-sm whitespace-nowrap">
              {{
                new Date(item.date).getHours() <= 9
                  ? `0${new Date(item.date).getHours()}`
                  : `${new Date(item.date).getHours()}`
              }}
              :
              {{
                new Date(item.date).getMinutes() <= 9
                  ? `0${new Date(item.date).getMinutes()}`
                  : `${new Date(item.date).getMinutes()}`
              }}
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
              v-if="item.money"
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
            <div class="flex justify-center items-center gap-4">
              <i class="bx bxs-pencil hover:text-blue-400"></i>
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
import { onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useRoute } from "vue-router";
import { useWorkersStore } from "@/stores/data/workers/workers";
import { useWorkerHistory } from "@/stores/data/workers/workerHistory";
const { get_worker } = useWorkersStore();
const { setOneWorker, update_workerHistory } = useWorkerHistory();
const { oneWorker } = storeToRefs(useWorkerHistory());

const { id } = useRoute().params;

const onCheck = (val) => {
  update_workerHistory(id, { ...val, money: !val.money });
};

onMounted(async () => {
  await get_worker(id).then((res) => {
    console.log(res.data);
    setOneWorker(res.data);
  });
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
