<template>
  <div class="flex flex-col">
    <UButton
      color="gray"
      variant="ghost"
      icon="i-heroicons-x-mark-20-solid"
      class="-my-1 self-end"
      @click="adminStore.selected_user = null" />
    <div class="flex flex-col gap-5 h-1/2 justify-around">
      <div class="flex justify-around" v-if="user">
        <p class="text-primary-500 text-2xl">
          {{ user.userName }}
        </p>
        <UBadge
          size="lg"
          :color="transformComposbal.transform(user.role)?.color">
          {{ transformComposbal.transform(user?.role)?.name }}
        </UBadge>
      </div>
      <div class="flex justify-start gap-5 flex-wrap">
        <UButton color="yellow" size="lg" @click="updatePassword"
          >تغيير كلمة المرور
        </UButton>

        <UButton color="yellow" size="lg" @click="updateAdmin">تعديل</UButton>
        <UButton color="red" size="lg" @click="deleteAdmin">حذف</UButton>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { AdminFormChangePassword, AdminFormChange } from "#components";
import { useAdminUsersStore } from "~/store/AdminUsers";
import ConfirmationDialog from "./ConfirmationDialog.vue";
const modal = useModal();
const toast = useToast();
const transformComposbal = useRoletransform();
const adminStore = useAdminUsersStore();
const adminApi = useAdminUser();
const user = computed(() => {
  return adminStore.selected_user;
});

const updatePassword = () => {
  if (adminStore.selected_user) {
    modal.open(AdminFormChangePassword, {
      s_user: adminStore.selected_user,
    });
  }
};
const updateAdmin = () => {
  if (adminStore.selected_user) {
    modal.open(AdminFormChange, { s_user: adminStore.selected_user });
  }
};
const deleteAdmin = () => {
  modal.open(ConfirmationDialog, {
    message: "هل تريد مسح هذا الادمن",
    async onSuccess() {
      if (user.value?.id) {
        const deleteResponse = await adminApi.deleteAdmin(user.value?.id);
        if (deleteResponse.data.value) {
          toast.add({title:"تم حذف المستخدم بنجاح"})
        }
        if (deleteResponse.error.value){
          toast.add({title:"حدث خطاء ما"})
        }
        adminStore.selected_user =null
        modal.close();
      }
    },
  });
};
</script>

<style></style>
