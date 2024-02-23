<template>
  <div class="dashboard mx-auto flex">
    <div class="dashboard__sidebar w-80 flex flex-col justify-between">
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
        <div class="menu-bottom__item flex items-center gap-2">
          <i class="bx bx-log-in"></i>
          <div class="menu-bottom__text">Log out</div>
        </div>
      </div>
    </div>
    <div class="dashboard__content">
      <router-view />
    </div>
  </div>
  <div class="square">
    <div class="box box-1"></div>
    <div class="box box-2"></div>
  </div>
</template>

<script setup>
import sidebarVue from "@/dashboard/components/sidebar/sidebar.vue";
</script>

<style lang="scss" scoped>
.dashboard {
  max-width: 1600px;
  position: relative;
  color: #000;
  z-index: 1;
  backdrop-filter: blur(30px);
  &__sidebar {
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
    width: 100%;
    padding: 20px;
  }
}
.square {
  width: 1600px;
  max-width: 100%;
  height: 100vh;
  position: fixed;
  margin: auto;
  top: 0;
  left: 50%;
  z-index: 1;
  transform: translate(-50%);
  z-index: -1;
  .box {
    width: 300px;
    height: 300px;
    border-radius: 50%;
    position: absolute;
  }
  .box-1 {
    top: 500px;
    left: 30px;
    background-color: #67e8f9;
  }
  .box-2 {
    top: 200px;
    right: 30px;
    background-color: #f9a8d4;
  }
}
</style>
