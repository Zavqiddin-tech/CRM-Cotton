<template>
  <div v-if="messageBox.toggle" :class="messageBox.toggle ? 'alert anim' : 'anim'">    
    <div 
      :class="messageBox.type == 'success' ? 'py-3 gap-3 flex shadow-lg rounded-lg bg-gradient-to-l from-green-200 from-10% via-green-100 via-30% to-white to-90%' :
      messageBox.type == 'warning' ? 'py-3 gap-3 flex shadow-lg rounded-lg bg-gradient-to-l from-yellow-200 from-10% via-yellow-100 via-30% to-white to-90%' : 
      messageBox.type == 'error' ? 'py-3 gap-3 flex shadow-lg rounded-lg bg-gradient-to-l from-red-200 from-10% via-red-100 via-30% to-white to-90%' : ''">
      <div
        :class="messageBox.type == 'success' ? 'w-2/12 flex justify-center items-center text-3xl text-green-500' :
        messageBox.type == 'warning' ? 'w-2/12 flex justify-center items-center text-3xl text-yellow-400' : 
        messageBox.type == 'error' ? 'w-2/12 flex justify-center items-center text-3xl text-red-500' : ''"
      >
        <i v-if="messageBox.type == 'success'" class="bx bx-check-circle"></i>
        <i v-if="messageBox.type == 'warning'" class='bx bx-error'></i>
        <i v-if="messageBox.type == 'error'" class='bx bx-error-circle' ></i>
      </div>
      <div class="w-10/12">
        <div class="text-lg text-black font-semibold">{{ messageBox.title }}</div>
        <div class="font-md text-black">{{ messageBox.text }}</div>
      </div>
    </div>

    

  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import {useAnimStore} from '@/stores/animation/anim'
const {messageBox} = storeToRefs(useAnimStore())




</script>




<style lang="scss" scoped>
.alert {
  width: 320px;
  position: absolute;
  top: 50px;
  right: 0px;
  z-index: 100;
  transform: translateX(400px);
  &.anim {
    animation: message 4s cubic-bezier(.52,-0.46,.46,1.52) forwards;
  }
}
@keyframes message {
  0% {
    transform: translateX(400px);
  }
  15% {
    transform: translateX(-50px);
  }
  50% {
    transform: translateX(-50px);
  }
  75% {
    transform: translateX(-50px);
  }
  100% {
    transform: translateX(400px);
  }
}
</style>
