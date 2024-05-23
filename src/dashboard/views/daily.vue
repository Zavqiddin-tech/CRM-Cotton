<template>
  <div>
    <h1 class="font-3xl">Daily</h1>
    <div>
      <!-- <canvas id="myChart" ref="myChartRef"></canvas> -->
    </div>
    <div class="flex gap-10 mt-7">
      <div>
        <Calendar
          v-model="date"
          @click="showCalen()"
          class="rounded-xl border border-gray-300"
        />
      </div>
      <div
        class="result relative overflow-hidden w-4/12 p-4 rounded-xl border border-gray-300"
      >
        <div v-if="date">
          <div class="date text-lg">
            {{ date.day > 9 ? date.day : `0${date.day}` }}
            {{ date.month > 9 ? date.month : `0${date.month}` }} {{ date.year }}
          </div>
          <div class="text-2xl mt-4 font-medium">Paxta kilogrami</div>
          <div class="mt-4 flex items-center text-6xl font-semibold">
            <div class="result-kg">
              {{ calendarKg() }}<span class="text-xl"> kg</span>
            </div>
          </div>
        </div>
        <div v-else>
          <Button
            ><img class="w-6" src="@/assets/image/zapicon.gif" alt="" />
            <span class="text-sm">Kunni tanlang</span></Button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { storeToRefs } from "pinia";
// Chart
import Chart from "chart.js/auto";
const myChartRef = ref();
// Chart
// Shadcn ui
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
// Shadcn ui
import { useWorkersStore } from "@/stores/data/workers/workers";
const { calendarData, chartData } = storeToRefs(useWorkersStore());
const { calendarWork, getAllWorks } = useWorkersStore();
const date = ref();
const showCalen = () => {
  let day = date.value?.day;
  let month = date.value?.month;
  let year = date.value?.year;
  if (day && month && year) {
    calendarWork({ day, month, year });
  }
};
const calendarKg = () => {
  let max = 0;
  calendarData.value.forEach((item) => {
    max += item.kg;
  });
  return max;
};

onMounted(async () => {
  const numbers = [];
  await getAllWorks();
  chartData.value.forEach((item, index) => {
    numbers.push(index + 1);
  });
  console.log(chartData.value);
  const ctx = myChartRef.value;
  new Chart(ctx, {
    type: "bar",
    data: {
      labels: [...numbers],
      datasets: [
        {
          label: "salom",
          data: [40, 19, 1, 4, 5, 90, 87, 65, 1, 2, 3, 7, 80],
          borderWidth: 2,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
});
</script>

<style lang="scss">
.result {
  &-kg {
    background: -webkit-linear-gradient(right, #9e9e9e, #333);
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }
}
</style>
