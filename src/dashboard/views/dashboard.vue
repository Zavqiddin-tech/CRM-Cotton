<template>
  <div>
    <h1 class="font-3xl">Dashboard</h1>
    <div class="cards flex flex-wrap gap-10 sm:justify-between lg:flex-nowrap">
      <div class="card p-5 w-full sm:w-6/12 lg:w-1/3">
        <div class="card-top">
          <i class="text-2xl fa-solid fa-user-group"></i>
          <div class="card-title text-xl font-medium">Jami ishchi</div>
        </div>
        <div class="card-number">
          <span class="text-3xl font-semibold">{{ workers.length }}</span> ta
        </div>
        <img src="@/assets/image/illustration/1.svg" alt="" />
      </div>
      <div class="card p-5 w-full sm:w-5/12 lg:w-1/3">
        <div class="card-top">
          <i class="text-2xl fa-solid fa-cloud"></i>
          <div class="card-title text-xl font-medium">Umumiy paxta</div>
        </div>
        <div class="card-number">
          <span class="text-3xl font-semibold">{{ allKg() }}</span> kg
        </div>
        <img src="@/assets/image/illustration/2.svg" alt="" />
      </div>
      <div class="card p-5 w-full sm:w-full lg:w-1/3">
        <div class="card-top">
          <i class="text-2xl fa-solid fa-square-poll-vertical"></i>
          <div class="card-title text-xl font-medium">Bugungi natija</div>
        </div>
        <div class="card-number">
          <span class="text-3xl font-semibold">{{ todayKg() }}</span> kg
        </div>
        <img src="@/assets/image/illustration/3.svg" alt="" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { storeToRefs } from "pinia";
// Store
import { useWorkersStore } from "@/stores/data/workers/workers";
const { workers } = storeToRefs(useWorkersStore());
const { get_all_workers } = useWorkersStore();

const allKg = () => {
  let max = 0;
  workers.value.forEach((item) => {
    if (item.workHistory.length > 0) {
      item.workHistory.forEach((elem) => {
        max += elem.kg;
      });
    }
  });
  return max;
};

const todayKg = () => {
  let max = 0;
  let date = new Date();
  let year = date.getFullYear();
  let month = date.getMonth();
  let day = date.getDate();
  workers.value.forEach((item) => {
    if (item.workHistory.length > 0) {
      item.workHistory.forEach((elem) => {
        if (
          new Date(elem.date).getFullYear() == year &&
          new Date(elem.date).getMonth() == month &&
          new Date(elem.date).getDate() == day
        ) {
          max += elem.kg;
        }
      });
    }
  });

  return max;
};

onMounted(() => {
  get_all_workers();
});
</script>

<style lang="scss">
.card {
  min-height: 200px;
  position: relative;
  border-radius: 10px;
  transition: 0.25s;
  box-shadow: -5px -5px 10px #f1f1f1, 5px 5px 10px #d6d6d6;
  &:hover {
    transform: translateY(-15px);
    box-shadow: 0px 10px 30px #7a7a7a;
  }
  &-title {
    padding-top: 10px;
    padding-bottom: 10px;
  }
  &-number {
    position: relative;
    z-index: 1;
  }
  img {
    position: absolute;
    width: 120px;
    right: 20px;
    bottom: 20px;
  }
}
</style>
