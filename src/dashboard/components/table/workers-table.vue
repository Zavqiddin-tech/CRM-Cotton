<template>
  <div class="wrapper">
    <table
      v-if="Array.isArray(openWorkers) && openWorkers.length > 0"
      class="table w-full"
    >
      <thead class="border-b border-zinc-300 text-left">
        <tr>
          <th>#</th>
          <th class="py-4 font-medium">F.I.O</th>
          <th class="py-4 font-medium">Kelgan vaqti</th>
          <th class="py-4 font-medium">Hisobi</th>
          <th class="py-4 font-medium">To'langan</th>
          <th class="py-4 font-medium text-center">Batafsil</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(item, index) of openWorkers"
          class="border-b border-zinc-300 hover:bg-black hover:bg-opacity-20"
        >
          <td @click="nextPage(item._id)" class="min-w-5">
            {{ index + 1 }}
          </td>
          <td @click="nextPage(item._id)" class="min-w-60 flex items-center">
            <div class="table-avatar mr-5 shadow-xl flex justify-center items-center">
              <img
                v-if="item.img"
                class="w-full h-full object-cover"
                :src="`${url}/uploads/${item.img}`"
                alt="image"
              />
              <i v-else class="bx bx-user text-2xl"></i>
            </div>
            <span class="name font-semibold mr-2"
              >{{ item.firstName }} {{ item.lastName }}</span
            >
            <img
              v-if="item.verify"
              class="verify"
              src="@/assets/image/w-verify.png"
              alt=""
            />
          </td>
          <td @click="nextPage(item._id)" class="min-w-40">
            <span class="whitespace-nowrap">
              {{ convertDate(item.date, 1) }}
            </span>
          </td>
          <td @click="nextPage(item._id)" class="min-w-20">
            <span
            class="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-md font-medium whitespace-nowrap text-green-700 ring-1 ring-inset ring-green-600/20"
              
              >{{ totalWeight(item.workHistory) }} kg</span
            >
          </td>
          <td @click="nextPage(item._id)" class="min-w-20">
            <span
            class="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-md font-medium whitespace-nowrap text-red-700 ring-1 ring-inset ring-red-600/20"
              >{{ totalPaid(item.workHistory) }} kg</span
            >
          </td>
          <td class="text-center">
            <div class="flex justify-center items-center gap-4">
              <i
                @click="edit(item._id)"
                class="bx bxs-pencil hover:text-blue-400"
              ></i>
              <i
                @click="del(item._id)"
                class="bx bxs-trash-alt hover:text-red-400"
              ></i>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-else class="mt-20 flex justify-center">
      <img class="w-96 object-cover" src="@/assets/image/no-data.svg" alt="">
    </div>
  </div>
</template>

<script setup>
import router from "@/router";
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useUrlStore } from "@/stores/admin/api/url";
import { useDialogToggle } from "@/stores/dialog/dialogToggle.js";
import { useWorkersStore } from "@/stores/data/workers/workers";
import { convertDate } from "@/func/date";
const {url} = storeToRefs(useUrlStore())
const { setFormToggle, setEditFormToggle, setEditId } = useDialogToggle();
const { openWorkers } = storeToRefs(useWorkersStore());
const { delete_worker } = useWorkersStore();


const nextPage = (_id) => {
  router.push(`workers/${_id}`);
};

const edit = (id) => {
  setFormToggle(true);
  setEditFormToggle(true);
  setEditId(id);
};
const del = (id) => {
  if (confirm("Delete")) {
    delete_worker(id);
  }
};
const totalWeight = (val) => {
  let activekg = 0
  if (val) {
    val.forEach(item => {
      if(item.paid == false) {
        activekg += item.kg
      }
    })
  }
  return activekg
}
const totalPaid = (val) => {
  let activekg = 0
  if (val) {
    val.forEach(item => {
      if(item.paid == true) {
        activekg += item.kg
      }
    })
  }
  return activekg
}
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
.table-avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  overflow: hidden;
}
.name {
  text-transform: capitalize;
}
.verify {
  width: 20px;
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
