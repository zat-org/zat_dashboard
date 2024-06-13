<template>
  <UCard>
    <UTable :rows="partner" :columns="columns">
      <template #name-data="{ row }">
        <div class="flex items-center gap-5">
          <UAvatar :src="row.logoUrl" alt="Avatar" size="2xl" />
          <ULink
            target="_blank"
            :to="row.siteUrl"
            class="text-semibold hover:text-primary">
            {{ row.name }}</ULink
          >
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
            @click="deleteP(row.id)"></UButton>
        </div>
      </template>
    </UTable>
    <template #footer>
      <div>
        <UButton @click="navigateTo('partner/add')">اضافة</UButton>
      </div>
    </template>
  </UCard>
</template>

<script lang="ts" setup>
import type { Partner } from "~/models/partner";
import ConfirmationDialog from "../ConfirmationDialog.vue";
import { useMyPartnerStore } from "~/store/partner";

const partnerStore = useMyPartnerStore();
const modal = useModal();
const toast = useToast();
const partnerApi = usePartner();
const getAllPartner = await partnerApi.getAllPartner();
const partner = computed(() => {
  return getAllPartner.data.value?.data!;
});
const columns = [
  { key: "name", label: "الاسم" },
  { key: "actions", label: "" },
];
const deletePREQ = await partnerApi.deleteSinglePartner();
const deleteP = async (id: string) => {
  modal.open(ConfirmationDialog, {
    message: " هل تريد مسح هذا الشريك ",
    async onSuccess() {
      await deletePREQ.fetchRequest(id);
      if (deletePREQ.status.value == "success") {
        toast.add({ title: " del is doen " });
      } else if (deletePREQ.status.value == "error") {
        toast.add({ title: " del is has error" });
      }
      modal.close();
    },
  });

 
};
const onUpdate = (row: Partner) => {
  // console.log(row);
  partnerStore.S_P = row;
  navigateTo("/partner/add");
};
</script>

<style></style>
