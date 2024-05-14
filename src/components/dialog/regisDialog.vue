<template>
  <div
    v-if="formToggle"
    class="relative z-10"
    aria-labelledby="modal-title"
    role="dialog"
    aria-modal="true"
  >
    <div
      class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
    ></div>

    <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
      <div
        class="flex min-h-full items-center justify-center p-4 text-center sm:p-0"
      >
        <div
          class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all w-full sm:my-8 sm:w-full sm:max-w-lg"
        >
          <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
            <div>
              <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                <h3
                  class="text-base font-semibold leading-6 text-gray-900"
                  id="modal-title"
                >
                  Registration
                </h3>
                <div class="mt-2">
                  <form
                    @submit.prevent="add()"
                    @keypress.enter="add()"
                    enctype="multipart/form-data"
                  >
                    <label
                      for="firstName"
                      class="block mt-5 text-lg font-medium text-gray-700"
                      >firstname</label
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
                      <div v-if="validFirst" class="valid-text text-red-500">
                        {{ warningFirst }}
                      </div>
                    </div>
                    <label
                      for="lastName"
                      class="block mt-4 text-lg font-medium text-gray-700"
                      >lastname</label
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
                    <!-- Phone -->
                    <label
                      for="number"
                      class="block mt-4 text-lg font-medium text-gray-700"
                      >phone number</label
                    >
                    <div class="mt-1">
                      <input
                        type="text"
                        id="number"
                        :class="`${
                          validPhone
                            ? 'border-2 w-full border-red-700 px-3 py-2 rounded-lg shadow-lg'
                            : 'border w-full border-gray-300 px-3 py-2 rounded-lg shadow-lg focus:border-indigo-500 focus:ring'
                        }`"
                        v-model="person.phone"
                      />
                      <div v-if="validPhone" class="valid-text text-red-500">
                        {{ warningPhone }}
                      </div>
                    </div>
                    <!-- Email -->
                    <label
                      for="email"
                      class="block mt-4 text-lg font-medium text-gray-700"
                      >email</label
                    >
                    <div class="mt-1">
                      <input
                        type="email"
                        id="email"
                        :class="`${
                          validEmail
                            ? 'border-2 w-full border-red-700 px-3 py-2 rounded-lg shadow-lg'
                            : 'border w-full border-gray-300 px-3 py-2 rounded-lg shadow-lg focus:border-indigo-500 focus:ring'
                        }`"
                        v-model="person.email"
                      />
                      <div v-if="validEmail" class="valid-text text-red-500">
                        {{ warningEmail }}
                      </div>
                    </div>
                    <!-- Password -->
                    <label
                      v-if="editFormToggle !== true"
                      for="password"
                      class="block mt-4 text-lg font-medium text-gray-700"
                      >password</label
                    >
                    <div class="mt-1" v-if="editFormToggle !== true">
                      <input
                        type="text"
                        id="password"
                        :class="`${
                          validPass
                            ? 'border-2 w-full border-red-700 px-3 py-2 rounded-lg shadow-lg'
                            : 'border w-full border-gray-300 px-3 py-2 rounded-lg shadow-lg focus:border-indigo-500 focus:ring'
                        }`"
                        v-model="person.password"
                      />
                      <div v-if="validPass" class="valid-text text-red-500">
                        {{ warningPass }}
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
            <button
              @click="add()"
              type="button"
              class="inline-flex w-full justify-center rounded-md bg-slate-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-slate-500 sm:ml-3 sm:w-auto"
            >
              Submit
            </button>
            <button
              @click="handleClose()"
              type="button"
              class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { storeToRefs } from "pinia";
import { useDialogToggle } from "@/stores/dialog/dialogToggle";
import { useFarmerStore } from "@/stores/data/farmer/farmer";

const { formToggle, editFormToggle, editId } = storeToRefs(useDialogToggle());
const { setFormToggle, setEditFormToggle, setEditId } = useDialogToggle();
const { newFarmer, getOneFarmer, updateFarmer } = useFarmerStore();

const person = ref({});

const validFirst = ref(false);
const warningFirst = ref("");
const validLast = ref(false);
const warningLast = ref("");
const validEmail = ref(false);
const warningEmail = ref("");
const validPhone = ref(false);
const warningPhone = ref("");
const validPass = ref(false);
const warningPass = ref("");

const handleClose = () => {
  setFormToggle(false);
  setEditFormToggle(false);
  setEditId("");
  person.value = {};
};

watch(editFormToggle, async () => {
  if (editFormToggle.value) {
    await getOneFarmer(editId.value).then((res) => {
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
        (warningFirst.value = "kamida 4 ta harf bo'sin");
  } else (validFirst.value = true), (warningFirst.value = "ism kiriting");

  if (person.value.lastName) {
    if (person.value.lastName.length >= 4) {
      validLast.value = false;
    } else
      (validLast.value = true), (warningLast.value = "kamida 4 ta harf bo'sin");
  } else (validLast.value = true), (warningLast.value = "familiya kiriting");
  if (person.value.phone) {
    if (person.value.phone.length == 9) {
      validPhone.value = false;
    } else
      (validPhone.value = true),
        (warningPhone.value = "raqamni to'g'ri kiriting");
  } else (validPhone.value = true), (warningPhone.value = "raqam kiriting");
  if (person.value.email) {
    let pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if (person.value.email.match(pattern)) {
      validEmail.value = false;
    } else
      (validEmail.value = true),
        (warningEmail.value = "email ni to'g'ri kiriting");
  } else (validEmail.value = true), (warningEmail.value = "email kiriting");
  if (person.value.password) {
    if (person.value.password.length >= 8) {
      validPass.value = false;
    } else (validPass.value = true), (warningPass.value = "kamida 8 ta belgi");
  } else (validPass.value = true), (warningPass.value = "parol kiriting");

  if (
    !validFirst.value &&
    !validLast.value &&
    !validPhone.value &&
    !validEmail.value &&
    !validPass.value
  ) {
    if (editFormToggle.value) {
      updateFarmer(person.value);
      handleClose()
    } else {
      newFarmer({
        ...person.value,
        session: "farmer",
        status: 0,
        date: new Date(),
      });
      handleClose();
    }
  }
};
</script>

<style lang="scss" scoped></style>
