<template>
  <div class="sidebar">
    <div class="sidebar-hero flex items-center gap-3">
      <div class="logo">
        <i class="bx bxl-xing text-violet-500"></i>
      </div>
      <div class="logo-title">Cotton<span class="text-violet-500 font-bold">Farm</span></div>
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
  .logo {
    i {
      font-size: 35px;
    }
    &-title {
      font-size: 25px;
      color: #333;
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
</style>
