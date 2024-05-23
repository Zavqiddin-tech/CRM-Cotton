<template>
  <div class="flex items-center justify-between">
    <div class="fo text-xl font-semibold">Farmers</div>
    <div class="shadow-lg">
      <button
        @click="setFormToggle(true)"
        class="btn py-2 font-medium px-5 rounded bg-violet-400 hover:bg-violet-300 text-white"
      >
        Registration
      </button>
    </div>
  </div>
  <regisDialog />
  <farmersTable />
</template>

<script setup>
import { onMounted } from "vue";


import regisDialog from "@/components/dialog/regisDialog.vue";
import farmersTable from "@/dashboard/components/table/farmersTable.vue";
import { useDialogToggle } from "@/stores/dialog/dialogToggle";
import { useFarmerStore } from "@/stores/data/farmer/farmer";
const { setFormToggle } = useDialogToggle();
const { getAllFarmers } = useFarmerStore();


onMounted(() => {
  getAllFarmers();
});
</script>

<style lang="scss" scoped></style>
