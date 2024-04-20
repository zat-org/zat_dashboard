<template>
  <div class="flex justify-center my-5">
    <UForm
      :schema="schema"
      :state="state"
      class="w-3/4 flex flex-col gap-3"
      @Submit="onSubmit">
      <UFormGroup label="اسم المستخدم ي حلو" name="userName" size="xl">
        <UInput v-model="state.userName"></UInput>
      </UFormGroup>
      <UFormGroup label="الباسورد ي حلو" name="password" size="xl">
        <UInput v-model="state.password" type="password"></UInput>
      </UFormGroup>
      <div class="self-center w-full flex justify-center mt-3">
        <UButton
          :loading="pendingLogin"
          dir="auto"
          type="submit"
          class="w-3/4 self-center text-center"
          size="lg">
          <span class="w-full text-center text-lg"> سجل يا ولد للجميل </span>
        </UButton>
      </div>
      <div
        class="text-xl text-red-600 flex justify-center font-semibold self-center my-5">
        <p v-if="  errorLogin  &&  (errorLogin as NuxtError).statusCode == 401">
          ما هو يالبسورد غلط يا عماد ياما انت مش عماد
        </p>
      </div>
    </UForm>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { object, string } from "yup";
import { useAuthStore } from "../store/auth";
import type { NuxtError } from "#app";

const state = <{ userName: string | null; password: string | null }>reactive({
  userName: null,
  password: null,
});

const { $api } = useNuxtApp();

// create schema  with yup
const schema = object({
  userName: string().required("اسم المستخدم يا صديق"),
  password: string()
    // .min(8, "الباسود 8 اقل من كده معرفكش")
    .required("الباسود يا صديق"),
});
const router = useRouter();
const authStore = useAuthStore();

const dataLogin = ref();
const errorLogin = ref();
const pendingLogin = ref(false);

const onSubmit = async () => {
  const { data, error, pending } = await useAsyncData<{message:string ,data:string}>(() =>
    $api("/auth/admin-login", {
      method: "POST",
      body: { userName: state.userName, password: state.password },
    })
  );
  pendingLogin.value = pending.value;
  dataLogin.value = data.value;
  errorLogin.value = error.value;

  if (error.value) {
// there is erro
  console.log((error.value as NuxtError).data)
  // console.log((error.value as NuxtError).name)
}
if(data.value){
  // every thing is ok 
// saver user in pinia
  console.log(data.value)
  authStore.login(data.value.data);
  // navigatye to main page
  router.push("/");
}

  // auth is done

};

definePageMeta({
  middleware: ["auth"],
});
</script>

<style scoped></style>
