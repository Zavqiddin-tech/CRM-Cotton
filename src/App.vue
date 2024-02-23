<template>
  <div class="main">
    <router-view />
    <alertVue />
  </div>
</template>

<script setup>
import alertVue from "@/components/alert/alert.vue";
</script>

<style lang="scss">
@import "@/assets/styles/main.scss";
.main {
  position: relative;
  overflow: hidden;
}
</style>
