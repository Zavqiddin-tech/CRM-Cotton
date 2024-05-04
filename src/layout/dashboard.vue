<template>
  <div class="dashboard mx-auto flex">
    <div class="dashboard__sidebar flex flex-col justify-between">
      <sidebarVue />
      <div class="menu-bottom flex flex-col gap-3">
        <div class="menu-bottom__item flex items-center gap-2">
          <i class="bx bx-info-square"></i>
          <div class="menu-bottom__text">Contact support</div>
        </div>
        <div class="menu-bottom__item flex items-center gap-2">
          <i class="bx bx-cog"></i>
          <div class="menu-bottom__text">Settings</div>
        </div>
        <div
          @click="logout()"
          class="menu-bottom__item flex items-center gap-2"
        >
          <i class="bx bx-log-in"></i>
          <div class="menu-bottom__text">Log out</div>
        </div>
      </div>
    </div>
    <div class="dashboard__content">
      <div
        class="dashboard__nav max max-w-full pb-5 flex justify-end items-center gap-10"
      >
        <input
          type="text"
          class="dashboard__input w-80 rounded-3xl px-3 py-2"
          placeholder="Qidiriv"
        />
        <div
          class="akkaunt flex justify-center items-center text-xl text-white font-bold bg-blue-400"
        >
          {{ cookies.get("cotton-user")[0].toUpperCase() }}
        </div>
      </div>
      <router-view />
    </div>
  </div>
  <div class="square">
    <div class="box box-1">
      <img class="w-full object-cover" src="@/assets/image/illustration/gr-2.png" alt="" />
    </div>
    <div class="box box-2">
      <img class="w-full object-cover" src="@/assets/image/illustration/gr-1.png" alt="" />
    </div>
  </div>
</template>

<script setup>
import sidebarVue from "@/dashboard/components/sidebar/sidebar.vue";
import cookies from "vue-cookies";

import { useAuthStore } from "@/stores/admin/auth/auth";
const { checkUser } = useAuthStore();

const logout = () => {
  if (confirm("Tizimdan chiqish ❗")) {
    cookies.remove("cotton-token");
    checkUser();
    location.reload();
  }
};
</script>

<style lang="scss" scoped>
.dashboard {
  max-width: 1600px;
  position: relative;
  color: #333;
  z-index: 1;
  &__nav {
    .akkaunt {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      cursor: pointer;
    }
  }
  &__sidebar {
    width: 230px;
    height: 100vh;
    padding: 20px;
    position: sticky;
    top: 0;
    .menu-bottom {
      &__item {
        padding: 10px;
        padding-left: 15px;
        border-radius: 20px;
        transition: 0.25s;
        cursor: pointer;
        &:hover,
        &:focus {
          background-color: rgba(0, 0, 0, 0.171);
        }
      }
      &__text {
        font-size: 15px;
        font-weight: 300;
      }
    }
  }
  &__content {
    width: calc(100% - 230px);
    padding: 20px;
  }
  &__input {
    color: #fff;
    background-color: rgba(255, 255, 255, 0.212);
    &::placeholder {
      color: #fff;
    }
  }
}
.square {
  width: 100%;
  max-width: 1600px;
  height: 100vh;
  position: fixed;
  margin: auto;
  top: 0;
  left: 50%;
  z-index: 1;
  transform: translate(-50%);
  z-index: -1;
  .box {
    width: 450px;
    position: absolute;
  }
  .box-1 {
    top: 500px;
    left: 30px;
  }
  .box-2 {
    top: 200px;
    right: 30px;
  }
}

@media (max-width: 940px) {
  .dashboard {
    &__sidebar {
      width: 100px;
      .menu-bottom {
        &__text {
          display: none;
        }
      }
    }
    &__content {
      width: calc(100% - 100px);
    }
  }
}
</style>
