import { ref } from "vue";
import { defineStore } from "pinia";

export const useAnimStore = defineStore("anim", () => {


  const messageBox = ref({
    toggle: false,
    type: "",
    title: "",
    text: "",
  });
  const setMessageBox = (val) => {
    messageBox.value = {...val}
    setTimeout(() => {
      messageBox.value.toggle = false
    }, 4000);
  };

  return {
    messageBox,
    setMessageBox,
  };
});
