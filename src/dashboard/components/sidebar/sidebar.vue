<template>
  <div class="sidebar">
    <div class="sidebar-hero flex items-center gap-3">
      <div class="logo">
        <i class="bx bxl-xing text-violet-400"></i>
      </div>
      <div class="logo-title text-black">
        Cotton<span class="text-violet-400 font-bold">Farm</span>
        <img class="logo-line" src="@/assets/image/illustration/line-1.svg" alt="">
      </div>
    </div>
    <div class="menu flex flex-col gap-4">
      <router-link
        :to="item.path"
        class="menu-item flex items-center gap-2"
        v-for="item of dashboardMenu"
      >
        <div class="menu-icon"><i :class="item.icon"></i></div>
        <div class="menu-text">{{ item.title }}</div>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { dashboardMenu } from "@/router/menu";
// #38BDF8
// #b2f35f
</script>

<style lang="scss" scoped>
.sidebar-hero {
  padding-left: 15px;
  padding-bottom: 30px;
  position: relative;
  .logo {
    i {
      font-size: 35px;
    }
    &-title {
      font-size: 25px;
    }
    &-line {
      position: absolute;
      width: 100px;
    }
  }
}
.menu {
  &-icon {
    font-size: 25px;
  }
  &-text {
    font-weight: 400;
    font-size: 16px;
  }
  &-item {
    padding: 2px;
    padding-left: 15px;
    border-radius: 30px;
    transition: 0.25s;
    cursor: pointer;
    &:hover,
    &:focus {
      background-color: rgba(0, 0, 0, 0.171);
    }
  }
}

@media (max-width: 940px) {
  .sidebar-hero {
    .logo {
      &-title {
        display: none;
      }
    }
  }
  .menu {
    &-text {
      display: none;
    }
  }
}
</style>
