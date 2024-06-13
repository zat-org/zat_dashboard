<template>
  <UCard>
    <UTable :rows="ads" :columns="columns">
      <template #title-data="{ row }">
        <div class="flex items-center gap-5">
          <UAvatar :src="row.imageUrl" alt="Avatar" size="xl" />
          <ULink :to="row.url" target="_blank" class="hover:text-primary">{{
            row.title
          }}</ULink>
        </div>
      </template>
      <template #actions-data="{ row }">
        <div class="flex gap-5">
          <UButton
            color="yellow"
            icon="i-mdi-edit-outline"
            @click="onUpdate(row)"></UButton>
          <UButton
            icon="i-mdi-delete"
            color="red"
            @click="onDelete(row.id)"></UButton>
        </div>
      </template>
    </UTable>

    <template #footer>
      <UButton @click="navigateTo('/homeAds/Add')">Add </UButton>
    </template>
  </UCard>
</template>

<script lang="ts" setup>
const homeAdsApi = useHomeAds();
const modal = useModal();
const toast = useToast();
import { toDisplayString } from "vue";
import ConfirmationDialog from "../ConfirmationDialog.vue";
import { useMyHomeAddStore } from "~/store/homeAd";
const AdsREQ = await homeAdsApi.getAllHomeAds();
const ads = computed(() => {
  return AdsREQ.data.value?.data;
});
const columns = [
  { key: "title", label: " العنوان" },
  { key: "buttonLabel", label: "الزر" },
  { key: "actions", label: "" },
];

const deleteREQ = await homeAdsApi.deleteSingleHomeAds();
const onDelete = async (id: string) => {
  modal.open(ConfirmationDialog, {
    message: "you want to delete  this home Ads",
    async onSuccess() {
      await deleteREQ.fetchRequest(id);
      if (deleteREQ.status.value == "success") {
        toast.add({ title: "delete is ok" });
      } else if (deleteREQ.status.value == "error") {
        toast.add({ title: "delete is has error " });
      }
    },
  });
};
const homeAddStore = useMyHomeAddStore();
const onUpdate = (row: any) => {
  homeAddStore.S_HA = row;
  console.log(homeAddStore.S_HA)
  navigateTo('/homeAds/Add')
};
</script>

<style></style>
