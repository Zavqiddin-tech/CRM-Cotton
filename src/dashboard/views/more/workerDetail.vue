<template>
  <div class="worker-detail">
    <div class="worker-detail__hero">
      <div
        class="worker-detail__poster min-h-56 flex rounded-3xl overflow-hidden"
      >
        <div class="worker-detail__left pl-6 flex items-center">
          <div class="worker-detail__avatar">
            <img
              class="w-full h-full object-cover avatar-img"
              :src="`${url}/uploads/${worker.img}`"
              alt="avatar"
            />
            <img
              v-if="worker.verify"
              class="verify-img"
              src="@/assets/image/t-verify.png"
              alt=""
            />
          </div>
          <div class="worker-detail__name pl-5">
            <div class="fname text-xl">{{ worker.firstName }}</div>
            <div class="lname text-xl">{{ worker.lastName }}</div>
          </div>
          <div class="worker-verify">
            <button
              @click="verify(worker._id, worker.verify)"
              class="btn py-1 font-medium px-2 rounded-xl bg-white shadow-lg hover:bg-black hover:text-white text-black"
            >
              <i class="fa-solid fa-fingerprint text-2xl"></i>
            </button>
          </div>
        </div>
        <div
          v-if="payArray.length > 0"
          class="worker-detail__right ml-5 w-full flex"
        >
          <div class="w-60">
            <table class="table-auto w-full">
              <thead>
                <tr>
                  <th class="text-left text-white">#</th>
                  <th class="text-left">Sana</th>
                  <th class="text-left">Kg</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) of payArray" class="border-b">
                  <td>{{ index + 1 }}</td>
                  <td>
                    {{ new Date(item.date).getDate() }} -
                    {{ month[new Date(item.date).getMonth()] }}
                  </td>
                  <td>{{ item.kg }}</td>
                </tr>
                <tr></tr>
              </tbody>
            </table>
          </div>
          <div class="flex items-end gap-5 ml-5">
            <div class="text-3xl font-bold">{{ totalWeight() }}</div>
            <button
              class="btn py-2 font-medium px-5 rounded bg-green-500 shadow-lg hover:bg-green-400 text-white"
              @click="paid()"
            >
              Yuborish
            </button>
          </div>
        </div>
      </div>
      <div class="work-detail__addcotton mt-10">
        <form
          @submit.prevent=""
          @keypress.enter="add()"
          class="flex justify-between items-center"
        >
          <div class="w-6/12">
            <label for="kg" class="block font-medium text-lg"
              >Paxtani kilogrami:
              <span v-if="residArray[0]" v-for="item of residArray"
                >{{ item }} -
              </span>
              <i
                v-if="residArray[0]"
                @click="removeKg()"
                class="bx bx-x text-white rounded bg-gray-500"
              ></i>
            </label>
            <input
              type="number"
              id="kg"
              v-model="cotton.kg"
              placeholder="kg"
              :class="`${
                validFirst
                  ? 'font-semibold border-2 w-full border-red-700 px-3 py-2 mt-2 rounded-lg shadow-lg'
                  : 'font-semibold border w-full border-gray-300 px-3 py-2 mt-2 rounded-lg shadow-lg focus:border-indigo-500'
              }`"
            />
            <div
              :class="`${
                warningFirst ? 'warning pt-2 text-white' : 'pt-2 opacity-0'
              }`"
            >
              <span>{{ warningFirst ? warningFirst : "P" }}</span>
            </div>
          </div>
          <div :class="`${residAll > 0 ? '' : 'opacity-0'}`">
            <span class="text-3xl">{{ residAll }}</span>
          </div>
          <div class="shadow-lg">
            <button
              @click="addResid()"
              class="btn py-1 font-medium px-5 rounded bg bg-rose-500 shadow-lg hover:bg-rose-400 text-white"
            >
              <i class="bx bx-plus text-3xl"></i>
            </button>
          </div>
          <div></div>
          <div class="shadow-lg">
            <button
              @click="add()"
              class="btn py-2 font-medium px-5 rounded bg-violet-500 shadow-lg hover:bg-violet-400 text-white"
            >
              Kiritish
            </button>
          </div>
        </form>
      </div>
    </div>
    <div class="worker-detail__main rounded bg-white bg-opacity-10">
      <workerDetailTable />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useRoute } from "vue-router";
import workerDetailTable from "@/dashboard/components/table/worker-detailTable.vue";

const { id } = useRoute().params;
const worker = ref({});

import { useUrlStore } from "@/stores/admin/api/url";
import { useMonthStore } from "@/stores/month";
import { useWorkersStore } from "@/stores/data/workers/workers";
import { useWorkerHistory } from "@/stores/data/workers/workerHistory";
const { url } = storeToRefs(useUrlStore());
const { month } = storeToRefs(useMonthStore());
const { get_worker } = useWorkersStore();
const { payArray } = storeToRefs(useWorkerHistory());
const { new_workerHistory, paidHistory, changeVerify } = useWorkerHistory();

const cotton = ref({});
const validFirst = ref(false);
const warningFirst = ref("");

const handleClose = () => {
  cotton.value = {};
  validFirst.value = false;
  warningFirst.value = "";
};

const residArray = ref([]);
const residAll = ref(0);
const addResid = () => {
  if (cotton.value.kg) {
    if (cotton.value.kg > 0) {
      validFirst.value = false;
    } else
      (validFirst.value = true),
        (warningFirst.value = "Yozgan soningiz 0 dan katta bo'lsin");
  } else
    (validFirst.value = true),
      (warningFirst.value = "Paxtani kilogramini kiriting");

  if (!validFirst.value) {
    residArray.value = [...residArray.value, cotton.value.kg];
    residAll.value += cotton.value.kg;
    handleClose();
  }
};
const removeKg = () => {
  let endKg = residArray.value.length - 1;
  residAll.value -= residArray.value[endKg];
  residArray.value.pop();
};

const totalWeight = () => {
  let activekg = 0;
  if (payArray.value) {
    payArray.value.forEach((item) => {
      if (item.paid == false) {
        activekg += item.kg;
      }
    });
  }
  return activekg;
};

const paid = () => {
  paidHistory(id, payArray.value);
};
const verify = (id, verify) => {
  changeVerify(id, { verify });
};
const add = () => {
  if (residAll.value > 0) {
    new_workerHistory(id, {
      kg: residAll.value,
      paid: false,
      status: 0,
      date: new Date(),
    });
    (residArray.value = []), (residAll.value = 0);
    handleClose();
  } else {
    warningFirst.value = "Kg larni qo'shing";
  }
};

onMounted(async () => {
  payArray.value = [];
  await get_worker(id).then((res) => {
    worker.value = { ...res.data };
    console.log(res.data);
  });
});
</script>

<style lang="scss" scoped>
.worker-detail {
  &__poster {
    position: relative;
    background: linear-gradient(to right, rgb(0, 0, 0), rgba(255, 255, 255, 0)),
      url("@/assets/image/cotton-poster.jpg");
    background-size: cover;
    background-position: center;
    color: #fff;
  }
  .worker-verify {
    position: absolute;
    right: 50px;
    bottom: 10px;
  }
  &__avatar {
    width: 150px;
    height: 150px;
    position: relative;
    border-radius: 50%;
    box-shadow: 0px 2px 15px #fff;
    .avatar-img {
      border-radius: 50%;
    }
    .verify-img {
      width: 25px;
      position: absolute;
      bottom: 0px;
      right: 15px;
    }
  }
  &__name {
    text-transform: capitalize;
  }
  input {
    color: #333;
  }
}
</style>
