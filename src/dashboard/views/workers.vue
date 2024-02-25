<template>
  <div class="workers">
    <addUserForm />
    <div class="workers-nav flex items-center justify-between">
      <div class="text-2xl">Workers</div>
      <div class="shadow-lg">
        <button
          @click="open()"
          class="btn py-2 font-medium px-5 rounded bg-violet-400 hover:bg-violet-300 text-white"
        >
          Qo'shish
        </button>
      </div>
    </div>
      <workersTable />
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { storeToRefs } from "pinia";
import addUserForm from "@/components/dialog/addUserForm.vue";
import workersTable from "@/dashboard/components/table/workers-table.vue";

// Dialog
import { useDialogToggle } from "@/stores/dialog/dialogToggle.js";
const { setFormToggle } = useDialogToggle();

// Store
import { useWorkersStore } from "@/stores/data/workers/workers";
const { get_all_workers } = useWorkersStore();

const open = () => {
  setFormToggle(true);
};

onMounted(() => {
  get_all_workers();
});
</script>

<style lang="scss" scoped>

</style>
