<template>
  <UCard>
    <UTable :rows="partner" />
    <template #footer>
      <div>
        <UButton @click="navigateTo('partner/add')">اضافة</UButton>
      </div>
    </template>
  </UCard>
</template>

<script lang="ts" setup>
const partnerApi = usePartner();
const getAllPartner = await partnerApi.getAllPartner();
const partner = computed(() => {
  return getAllPartner.data.value?.data!;
});
const columns = [{ key: "", label: "" }];
</script>

<style></style>
