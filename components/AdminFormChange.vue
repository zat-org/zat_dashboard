<template>
  <UModal dir="rtl" prevent-close>
    <UCard>
      <div class="flex justify-between">
        <h2 class="text-2xl text-primary " >تحديث البيانات   </h2>
        <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1" @click="modal.close()" />
      </div>
      <UForm :schema="schema" :state="state" @submit="onSubmit" ref="form">
        <UFormGroup label="اسم المستخدم" name="userName" class="pb-2">
          <UInput v-model="state.userName" />
        </UFormGroup>
        <UFormGroup label="الفئه" name="role" class="pb-2">
          <USelect
            v-model.number="state.role"
            :options="roleComp.Roles"
            option-attribute="name"
            value-attribute="id" />
        </UFormGroup>
        <div v-if="form_error" class="p-2 text-red-600 font-semibold text-lg flex justify-center">
         <p> {{ form_error }}</p> 
        </div>
        <div class="flex justify-start" >
          <UButton type="submit" :loading="response.status.value == 'pending' " > حفظ </UButton>
        </div>
      </UForm>
    </UCard>
  </UModal>
</template>

<script lang="ts" setup>
import type { AdminUser } from "~/models/adminUser";
import { object, string, number } from "yup";
import { useAdminUsersStore } from "~/store/AdminUsers";
const roleComp = useRoletransform();
const adminApi = useAdminUser();
const adminStore= useAdminUsersStore()
const modal = useModal()
const toast = useToast()
const props = defineProps<{ s_user: AdminUser }>();

const state = reactive({
  userName: props.s_user.userName,
  role: props.s_user.role,
});
const schema = object({
  userName: string().required(),
  role: number().required(),
});

const form = ref();

const form_error = ref ()
const response = await adminApi.updateAdmin(
  props.s_user.id,
  state);
const onSubmit = async () => {
  await  response.execute()
  form_error.value=null
  if (response.error.value) {
    switch (response.error.value.statusCode) {
      case 400:
        const errors = response.error.value.data?.errors;
        if (errors) {
          Object.entries(errors).forEach(([key, value]) => {
            form.value.setErrors([
              { message: value[0], path: key.toLowerCase() },
            ]);
          });
        }
        break;
      case 401:
        // logout
        form_error.value=" logout "

        break;
      case 403:
        // error you dont have permission
        form_error.value=" youy dont have permission to do that"

        break;
      case 409:
        form.value.setErrors([
          { message: "هذا الاسم مستخدم بالفعل", path: "userName" },
        ]);
        break;
      case 500:
        // server error
        form_error.value=" this server erorr"
        break;
    }
  }
  if (response.data.value){
    // add toaster

    adminStore.clear_user()
    modal.close()
  }
};
</script>

<style></style>
