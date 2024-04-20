<template>
  <UModal prevent-close dir="rtl">
    <UForm
      ref="form"
      :schema="schema"
      :state="state"
      class="space-y-4"
      @submit="onSubmit">
      <UCard>
        <template #header>
          <div class="flex justify-between">
            <p>اضافة ادمن جديد</p>
            <UButton
              color="gray"
              variant="ghost"
              icon="i-heroicons-x-mark-20-solid"
              class="-my-1"
              @click="modal.close()" />
          </div>
        </template>

        <UFormGroup label="اسم الادمن" name="userName" class="pb-2">
          <UInput v-model="state.userName" />
        </UFormGroup>

        <UFormGroup label="كلمة السر" name="password" class="pb-2">
          <UInput v-model="state.password" type="password" />
        </UFormGroup>

        <UFormGroup label="الفئة" name="role" class="pb-2">
          <USelect
            v-model.number="state.role"
            :options="AdminRoles.Roles"
            option-attribute="name"
            value-attribute="id" />
        </UFormGroup>
        <div class="text-red-500 text-lg font-semibold">
          {{ add_error }}
        </div>
        <template #footer>
          <div class="flex justify-start">
            <UButton type="submit" :loading="status =='pending'"> اضافة </UButton>
          </div>
        </template>
      </UCard>
    </UForm>
  </UModal>
</template>

<script lang="ts" setup>
import { object, string, number } from "yup";
const modal = useModal();
const toast = useToast();
const adminApi = useAdminUser();
const AdminRoles = useRoletransform();
const schema = object({
  userName: string().required(),
  password: string().min(8).required(),
  role: number().required(),
});

const add_error = ref();

const state = reactive<{ userName: string; password: string; role: number }>({
  userName: "",
  password: "",
  role: 0,
});

const { data, pending, error, refresh, execute ,status} = await adminApi.addAdmin(
  state
);
const onSubmit = async () => {
  await execute();
  await refreshNuxtData("getAlladmins");

  if (error.value) {
    switch (error.value.statusCode) {
      case 400:
        const errors = error.value.data?.errors;
        if (errors) {
          Object.entries(errors).forEach(([key, value]) => {
            form.value.setErrors([
              { message: value[0], path: key.toLowerCase() },
            ]);
          });
        }
        // hass eror in some field validation

        break;
      case 401:
      case 403:
        // logout user
        break;
      case 409:
        // conflict like user is already exist with this name
        form.value.setErrors([
          { message: "هذا الاسم مستخدم بالفعل", path: "userName" },
        ]);
        break;
      case 500:
        add_error.value = error.value;
        break;
    }
  }
  if (data.value) {
    // make toast user added
    toast.add({ title: "تم الاضافه بنجاح" });
    // close modal
    modal.close();
    // refresh list of user
  }
};
const form = ref();
</script>

<style></style>
