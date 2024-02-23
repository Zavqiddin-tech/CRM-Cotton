<template>
  <table v-if="Array.isArray(openWorkers) && openWorkers.length > 0" class="table-auto w-full">
    <thead class="border-b border-zinc-400 text-left">
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
      <tr @click="nextPage(item._id)" v-for="(item, index) of openWorkers" class="border-b border-zinc-300 hover:bg-black hover:bg-opacity-20">
        <td>
          {{ index + 1 }}
        </td>
        <td class=" flex items-center gap-9">
          <div class="table-avatar shadow-xl"><img class="w-full h-full object-cover" src="@/assets/image/avatar.jpg" alt=""> </div>
          <span class="name font-semibold">{{ item.firstName }} {{ item.lastName }}</span>
        </td>
        <td>
          <span class="text-sm">
            {{ new Date(item.createdAt).toDateString() }}
          </span>
        </td>
        <td>
          <span class="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-sm font-medium text-green-700 ring-1 ring-inset ring-green-600/20">45 900</span>
        </td>
        <td>
          <span class="inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-sm font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20">145 700</span>
        </td>
        <td class="text-center">
          <div class="flex justify-center items-center gap-4">
            <i class='bx bxs-pencil hover:text-blue-400'></i>
            <i class='bx bxs-trash-alt hover:text-red-400' ></i>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
  <div v-else>
    salom
  </div>
</template>

<script setup>
import router from "@/router";
import { storeToRefs } from "pinia";
import { useWorkersStore } from "@/stores/data/workers/workers";
const { openWorkers } = storeToRefs(useWorkersStore());

const nextPage = (_id) => {
  router.push(`workers/${_id}`)
}
</script>

<style lang="scss" scoped>
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
tr, .bx {
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
