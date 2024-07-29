<template>
  <UCard>
    <UTable :rows="analysts" :columns="cols" @select="onSelect">
<template #id-data="{row}">
<div class=" flex gap-5 items-center" >
  <UAvatar
    :src="row.imageUrl"
    alt="Avatar"
    size="lg"
  />
  <p> {{ row.fullName }}</p>
</div>

</template>

    </UTable>
    <template #footer>
      <UButton label="اضافة" icon="material-symbols:add"  @click="navigateTo('/analyst/add')"/>
    </template>
  </UCard>
</template>

<script lang="ts" setup>
import type { analystI } from '~/models/Analyst';

const cols = [{key:"id",label:"analyst"}]
const onSelect = (row:analystI)=>{
  return navigateTo(`/analyst/${row.id}`)
}
const getREQ = await useAnalyst().getAllAnalyst();
const analysts = computed(() => {
  return getREQ.data.value?.data;
});
</script>

<style></style>
