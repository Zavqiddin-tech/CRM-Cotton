import { ref } from "vue";
import { defineStore } from "pinia";

export const useDialogToggle = defineStore("toggle", () => {
  const formToggle = ref(false);
  const editFormToggle = ref(false);
  const editId = ref("");
  const setFormToggle = (val) => (formToggle.value = val);
  const setEditFormToggle = (val) => (editFormToggle.value = val);
  const setEditId = (val) => (editId.value = val);

  return {
    formToggle,
    editFormToggle,
    editId,
    setFormToggle,
    setEditFormToggle,
    setEditId
  };
});
