<template>
  <UCard>
    <UTable :rows="officiants" :columns="columns" @select="onSelect">
      <template #name-data="{ row }">
        <div class="flex items-center gap-5">
          <UAvatar size="lg" :src="row.imageUrl" alt="Avatar" />
          <p calss="text-2xl font-semibold ">{{ row.name }}</p>
        </div>
      </template>
    </UTable>
    <template #footer>
      <UButton to="/officiant/add" icon="material-symbols:add">اضافة </UButton>
    </template>
  </UCard>
</template>

<script lang="ts" setup>
import type { officiantI } from "~/models/Officaint";

// get data
const officiantApi = useOfficiant();
const getREQ = await officiantApi.getAllOfficiants();
const officiants = computed(() => {
  return getREQ.data.value?.data.officiants;
});

const columns = [{ key: "name", label: "name" }];
const onSelect = (row: officiantI) => {
  return navigateTo(`/officiant/${row.id}`);
};
</script>

<style></style>
