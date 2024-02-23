<template>
  <div class="auth">
    <form @submit.prevent="" class="auth-form px-4 py-2 rounded-md">
      <div class="title text-center text-2xl font-semibold">Kirish</div>
      <div>
        <label for="login" class="text-sm font-light">login</label>
        <input
          v-model="user.email"
          type="text"
          class="block w-full px-1 py-1 border border-1 border-gray-300 rounded-md focus:border-2 focus:border-violet-300"
          id="login"
          autocomplete="off"
        />
      </div>
      <div class="mt-5 mb-7">
        <label for="password" class="text-sm font-light">password</label>
        <input
          v-model="user.password"
          type="text"
          class="block w-full px-1 py-1 border border-1 border-gray-300 rounded-md focus:border-2 focus:border-violet-300"
          id="password"
          autocomplete="off"
        />
      </div>
      <div>
        <button @click="submit()" class="btn w-full py-2 rounded-md text-white">
          Kirish
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useAuthStore } from "@/stores/admin/auth/auth";
import { useAnimStore } from "@/stores/animation/anim";
const { setMessageBox } = useAnimStore();

const { login } = useAuthStore();

const user = ref({});

const submit = () => {
  if (user.value.email && user.value.password) {
    login(user.value);
  } else {
    setMessageBox({
      toggle: true,
      type: "warning",
      title: "Warning",
      text: "Barcha maydonni to'ldiring",
    });
    return false;
  }
};
</script>

<style lang="scss" scoped>
.auth {
  max-width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #183642;
  color: #fff;
  &-form {
    width: 300px;
    background-color: #fff;
    color: #000;
  }
}
.btn {
  background-color: #67c23a;
  transition: 0.2s;
  &:hover {
    opacity: 0.8;
  }
}
</style>
@/stores/admin/auth/auth
