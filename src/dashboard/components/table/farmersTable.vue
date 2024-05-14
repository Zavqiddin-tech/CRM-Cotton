<template>
  <div class="wrapper">
    <table
      v-if="Array.isArray(farmers) && farmers.length > 0"
      class="table-auto w-full"
    >
      <thead class="border-b border-zinc-400 text-left">
        <tr>
          <th>#</th>
          <th class="py-4 font-medium">name</th>
          <th class="py-4 font-medium">date</th>
          <th class="py-4 font-medium">phone</th>
          <th class="py-4 font-medium">gmail</th>
          <th class="py-4 font-medium">status</th>
          <th class="py-4 font-medium text-center">edit</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(item, index) of farmers"
          class="border-b border-zinc-300 hover:bg-black hover:bg-opacity-20"
        >
          <td class="min-w-8">
            {{ index + 1 }}
          </td>
          <td class="min-w-40 name">
            {{ item.firstName }} {{ item.lastName }}
          </td>
          <td class="min-w-28">{{ convertDate(item.date, 1) }}</td>
          <td class="min-w-28">
            {{ item.phone }}
          </td>
          <td class="min-w-28">
            <span
              class="inline-flex items-center rounded-md bg-indigo-50 px-2 py-1 text-sm font-medium text-indigo-700 ring-1 ring-inset ring-indigo-700/10"
              >{{ item.email }}</span
            >
          </td>
          <td class="min-w-24">
            <span
              @click="changeStatus(item._id)"
              v-if="item.status == 1"
              class="inline-flex items-center rounded-md px-2 py-1 text-sm font-medium text-black ring-1 ring-inset ring-slate-600"
            >
              <span class="w-2 h-2 mr-1 rounded-full bg-green-500"></span>
              Active</span
            >
            <span
              @click="changeStatus(item._id)"
              v-if="item.status == 0"
              class="inline-flex items-center rounded-md px-2 py-1 text-sm font-medium text-black ring-1 ring-inset ring-slate-600"
            >
              <span class="w-2 h-2 mr-1 rounded-full bg-red-500"></span>
              Inactive</span
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
    <div v-else></div>
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useFarmerStore } from "@/stores/data/farmer/farmer";
import { useDialogToggle } from "@/stores/dialog/dialogToggle";
import { convertDate } from "@/func/date";
const { farmers } = storeToRefs(useFarmerStore());
const { changeStatusFarmer, updateFarmer, deleteFarmer } = useFarmerStore();
const { setFormToggle, setEditFormToggle, setEditId } = useDialogToggle();



const changeStatus = (id) => {
  changeStatusFarmer(id)
}
const edit = (id) => {
  setFormToggle(true)
  setEditFormToggle(true)
  setEditId(id)
}
const del = (id) => {
  deleteFarmer(id);
};
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
