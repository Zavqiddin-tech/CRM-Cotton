<template>
  <div class="auth">
    <form @submit.prevent="" class="auth-form px-4 py-2 rounded-md">
      <div class="title text-center text-2xl font-semibold">Log in</div>
      <Alert v-if="alertToggle">
        <div class="flex gap-3">
          <i class="fa-solid fa-chevron-right">_</i>
          <div>
            <AlertTitle>Please!</AlertTitle>
            <AlertDescription> Enter login and password </AlertDescription>
          </div>
        </div>
      </Alert>
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
        <div class="flex relative items-center">
          <input
            v-model="user.password"
            :type="`${toggle ? 'password' : 'text'}`"
            class="block w-full px-1 py-1 border border-1 border-gray-300 rounded-md focus:border-2 focus:border-violet-300"
            id="password"
            autocomplete="off"
          />
          <img
            v-if="toggle"
            class="eye absolute right-1"
            @click="eyeToggle()"
            src="@/assets/image/eye-open.png"
            alt=""
          />
          <img
            v-else
            class="eye absolute right-1"
            @click="eyeToggle()"
            src="@/assets/image/eye-hide.png"
            alt=""
          />
        </div>
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
//shadcn ui
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
//shadcn ui

const alertToggle = ref(false)

import { useAuthStore } from "@/stores/admin/auth/auth";
const { login } = useAuthStore();

const user = ref({});
const toggle = ref(true);
const eyeToggle = () => {
  toggle.value = !toggle.value;
};

const submit = () => {
  if (user.value.email && user.value.password) {
    login(user.value);
    alertToggle.value = false
  } else {
    alertToggle.value = true
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
  position: relative;
  overflow: hidden;
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
.eye {
  width: 22px;
}
</style>
