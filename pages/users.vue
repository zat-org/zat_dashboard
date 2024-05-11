<template>
  <div class="flex flex-col gap-5 mx-5">
    <h1 class="text-3xl font-bold text-primary mx-5">المستخدمين</h1>
  
       <div
       class="flex flex-grow gap-5 transition-all duration-1000 border border-cyan-500 rounded-xl p-2 shadow-xl ">
       <UsersList class="flex-grow duration-1000 transition-all p-2 w-2/3" />

        <UDivider
          class="w-5"
          orientation="vertical"
          type="dashed"
          v-if="adminStore.isUserSelected" />

        <UserData
          class="flex-grow duration-1000 transition-all"
          v-if="adminStore.isUserSelected" />
      </div>

  </div>
</template>

<script lang="ts" setup>
import { useAdminUsersStore } from "~/store/AdminUsers";
import { onUnmounted } from "vue";
const adminStore = useAdminUsersStore();
onUnmounted(() => {
  adminStore.selected_user = null;
});
</script>

<style scoped></style>
