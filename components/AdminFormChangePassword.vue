<template>
  <UModal dir="rtl" prevent-close>
    <UForm ref="form" @submit="onSubmit" :state="state" :schema="schema">
      <UCard>
        <div class="flex justify-between mb-2">
          <h2 class="text-2xl text-primary">تحديث كلمة المرور</h2>
          <UButton
            color="gray"
            variant="ghost"
            icon="i-heroicons-x-mark-20-solid"
            class="-my-1"
            @click="modal.close()" />
        </div>
        <UFormGroup label=" كلمة المرور الجديدة" name="password" class="pb-5">
          <UInput v-model="state.password" type="password" />
        </UFormGroup>

        <UButton type="submit" :loading="CPResponse.status.value == 'pending'">
          حفظ
        </UButton>
      </UCard>
    </UForm>
  </UModal>
</template>

<script lang="ts" setup>
// define props user object
import { object, string } from "yup";
import type { AdminUser } from "~/models/adminUser";
const props = defineProps<{ s_user: AdminUser }>();
const adminApi = useAdminUser();
const modal = useModal();
const toast = useToast();
const form = ref();
const form_error = ref();
const state = reactive({ password: "" });
const schema = object({
  password: string().min(8).required(),
});

const CPResponse = await adminApi.changePassword(props.s_user.id, state);
const onSubmit = async () => {
  await CPResponse.execute();
  if (CPResponse.error.value) {
    switch (CPResponse.error.value.statusCode) {
      case 400:
        const errors = CPResponse.error.value.data?.errors;
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
        form_error.value = " logout ";

        break;
      case 403:
        // error you dont have permission
        form_error.value = " youy dont have permission to do that";

        break;
      case 409:
        form.value.setErrors([
          { message: "هذا الاسم مستخدم بالفعل", path: "userName" },
        ]);
        break;
      case 500:
        // server error
        form_error.value = " this server erorr";
        break;
    }
  }
  if (CPResponse.data.value) {
    modal.close();
    toast.add({ title: "تم التعديل بنجاح" });
  }
};
</script>

<style></style>
