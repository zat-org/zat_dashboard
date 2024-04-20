<template>
  <div class="flex flex-col">
    <div class="flex gap-2">
      <UInput v-model="q" placeholder="بحث بالاسم " class="flex-grow" />
      <USelectMenu
        v-if="roletransform.Roles && roletransform"
        multiple
        placeholder="اختر الفئة "
        v-model="role"
        :options="roletransform.Roles"
        option-attribute="name"
        value-attribute="id" /> 
    </div>
<div class="flex-grow overflow-auto h-1">

  <UTable
  :loading ="  pending"
  :rows="filtrdRow"
  :columns="columns"
  @select="select"
  >

  <template #role-data="{ row }">
    <UBadge size="lg" :color="roletransform.transform(row.role)?.color" v-if="roletransform">{{ roletransform.transform(row.role)?.name }}</UBadge>
  </template>

</UTable> 
</div>
    <div class="flex justify-start">
      <UButton
        icon="i-heroicons-plus"
        size="sm"
        color="primary"
        variant="solid"
        label="اضافة ادمن"
        :trailing="true"
        @click="testmodal" />
    </div> 
  </div>
</template>

<script lang="ts" setup>
import type { AdminUser } from "~/models/adminUser";
import { useAdminUsersStore } from "~/store/AdminUsers";
import AdminFormAdd from "./AdminFormAdd.vue";
const adminApi = useAdminUser();
const adminStore =  useAdminUsersStore();
const { data, error, pending, refresh } = await adminApi.getAllAdmins();
const roletransform = useRoletransform();
// console.log(roletransform.Roles);


// role filter
const role = ref<{id:number,name:string,color:string}[]>([]);
// to handel filter
const q = ref("");
const searchFilter = computed(() => {
  // console.log(adminStore.users);
  if (!q.value) {
    return data.value?.data;
  }
  return data.value?.data.filter((admin) => {
    return admin.userName.toLocaleLowerCase().includes(q.value.toLocaleLowerCase())
    // return Object.values(admin).some((value) => {
    //   return String(value)
    //     .toLocaleLowerCase()
    //     .includes(q.value.toLocaleLowerCase());
    // });
  });
});
const roleFilter = computed(() => {
  if (role.value.length == 0) {
    return searchFilter.value;
  }
  return searchFilter.value?.filter((admin) => {
    console.log(role.value);
    return role.value.forEach(role=>{
     return role.id ==admin.role
    });
  });
});
const filtrdRow = computed(() => {
  return roleFilter.value;
});

// handel table colums
const columns = [
  { key: "userName", label: "الاسم" },
  { key: "role", label: "الفئة" },
];

// handel select
const select = (row: AdminUser) => {
  adminStore.select_user(row);
};


const modal = useModal();
const testmodal = () => {
  modal.open(AdminFormAdd);
};
</script>

<style></style>
