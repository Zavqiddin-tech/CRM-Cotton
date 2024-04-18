<template>
  <TransitionRoot as="template" :show="formToggle">
    <Dialog as="div" class="relative z-10" @close="handleClose()">
      <TransitionChild
        as="template"
        enter="ease-out duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in duration-200"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div
          class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        />
      </TransitionChild>

      <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div
          class="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0"
        >
          <TransitionChild
            as="template"
            enter="ease-out duration-300"
            enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leave-from="opacity-100 translate-y-0 sm:scale-100"
            leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <DialogPanel
              class="relative p-2 transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg"
            >
              <div class="bg-white px-4 pb-4 pt-5 sm:p-2 sm:pb-2">
                <div class="sm:flex sm:items-start">
                  <div class="mt-3 w-full sm:text-left">
                    <DialogTitle as="h3" class="text-xl text-gray-900"
                      >Ishchi qo'shish</DialogTitle
                    >
                    <div class="mt-2">
                      <form
                        @submit.prevent="add()"
                        @keypress.enter="add()"
                        enctype="multipart/form-data"
                      >
                        <label
                          for="firstName"
                          class="block mt-5 text-lg font-medium text-gray-700"
                          >ism</label
                        >
                        <div class="mt-1">
                          <input
                            type="text"
                            id="firstName"
                            :class="`${
                              validFirst
                                ? 'border-2 w-full border-red-700 px-3 py-2 rounded-lg shadow-lg'
                                : 'border w-full border-gray-300 px-3 py-2 rounded-lg shadow-lg focus:border-indigo-500 focus:ring'
                            }`"
                            v-model="person.firstName"
                          />
                          <div
                            v-if="validFirst"
                            class="valid-text text-red-500"
                          >
                            {{ warningFirst }}
                          </div>
                        </div>
                        <label
                          for="lastName"
                          class="block mt-4 text-lg font-medium text-gray-700"
                          >familiya</label
                        >
                        <div class="mt-1">
                          <input
                            type="text"
                            id="lastName"
                            :class="`${
                              validLast
                                ? 'border-2 w-full border-red-700 px-3 py-2 rounded-lg shadow-lg'
                                : 'border w-full border-gray-300 px-3 py-2 rounded-lg shadow-lg focus:border-indigo-500 focus:ring'
                            }`"
                            v-model="person.lastName"
                          />
                          <div v-if="validLast" class="valid-text text-red-500">
                            {{ warningLast }}
                          </div>
                        </div>
                        <div
                          class="mt-5 p-5 pb-1 rounded-md border border-indigo-500"
                        >
                          <label for="file" class="cursor-pointer"
                            >Rasm
                            <span class="font-bold text-violet-500"
                              >yuklang...</span
                            ></label
                          >
                          <input
                            type="file"
                            @change="handleChange"
                            class="opacity-0 absolute"
                            name="file"
                            id="file"
                          />
                          <div class="avatar-img flex justify-end">
                            <img
                              class="w-20 h-20 object-cover rounded-full"
                              :src="`${url}/uploads/${person.img}`"
                              alt=""
                            />
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
              <div class="px-4 py-3 flex justify-end gap-20">
                <button
                  class="btn py-2 px-5 rounded bg-rose-500 shadow-lg hover:bg-rose-400 text-white"
                  @click="handleClose()"
                >
                  cancel
                </button>
                <button
                  @click="add()"
                  class="btn py-2 px-5 rounded bg-violet-500 shadow-lg hover:bg-violet-400 text-white"
                >
                  add
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup>
import { ref, watch } from "vue";
import { storeToRefs } from "pinia";

import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import { ExclamationTriangleIcon } from "@heroicons/vue/24/outline";

// Store
import { useUrlStore } from "@/stores/admin/api/url";
import { useDialogToggle } from "@/stores/dialog/dialogToggle.js";
import { useWorkersStore } from "@/stores/data/workers/workers";
const { url } = storeToRefs(useUrlStore());
const { formToggle, editFormToggle, editId } = storeToRefs(useDialogToggle());
const { setFormToggle, setEditFormToggle, setEditId } = useDialogToggle();
const { new_worker, get_worker, update_worker } = useWorkersStore();

const validFirst = ref(false);
const warningFirst = ref("");
const validLast = ref(false);
const warningLast = ref("");

const person = ref({});
const avatar = ref({});
const handleChange = (val) => {
  console.log(val);
  avatar.value = val.target.files[0];
};
const handleClose = () => {
  setFormToggle(false);
  setEditFormToggle(false);
  setEditId("");
  person.value = {};
  validFirst.value = false;
  validLast.value = false;
};

// Edit
watch(editFormToggle, async () => {
  if (editFormToggle.value) {
    await get_worker(editId.value).then((res) => {
      person.value = { ...res.data };
    });
  }
});

const add = () => {
  if (person.value.firstName) {
    if (person.value.firstName.length >= 4) {
      validFirst.value = false;
    } else
      (validFirst.value = true),
        (warningFirst.value = "Kamida 4 ta harf bo'sin");
  } else
    (validFirst.value = true), (warningFirst.value = "Ism maydonini kiriting");

  if (person.value.lastName) {
    if (person.value.lastName.length >= 4) {
      validLast.value = false;
    } else
      (validLast.value = true), (warningLast.value = "Kamida 4 ta harf bo'sin");
  } else
    (validLast.value = true),
      (warningLast.value = "Familiya maydonini kiriting");

  if (!validFirst.value && !validLast.value) {
    if (editFormToggle.value) {
      if (avatar.value.name) {
        update_worker({ ...person.value, file: avatar.value });
        handleClose();
        return false;
      }
      update_worker({ ...person.value });
      handleClose();
    } else {
      new_worker({
        ...person.value,
        file: avatar.value,
        img: "",
        user: "",
        verify: false,
        date: new Date(),
      });
      handleClose();
    }
  }
};
</script>

<style lang="scss" scoped></style>
