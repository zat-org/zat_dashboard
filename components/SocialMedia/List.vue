<template>
  <UCard>
    <!-- table layout -->
    <UTable :rows="SocialMedia" :columns="columns">
      <template #name-data="{ row }">
        <div class="flex items-center gap-3 ">
          <UIcon :name="row.icon" class="text-2xl" ></UIcon>
          <ULink class="hover:text-primary" target="_blank" :to="row.accountUrl">
            {{ row.name }}</ULink
          >

        </div>
      </template>
      <template #actions-data="{ row }">
        <div class="flex gap-5">
          <!-- usign state send row object make store   -->
          <UButton color="yellow" icon="i-mdi-edit-outline"@click="onUpdate(row)"></UButton>
          <!-- confiemation dialog and delete  -->
          <UButton color="red" icon="i-mdi-delete" @click="onDelete(row.id)"
            ></UButton
          >
        </div>
      </template>
    </UTable>
    <!-- grid layout -->
    <!-- <div>
    </div> -->
    <template #footer>
      <UButton @click="navigateTo('/socialMedia/add')">اضافة</UButton>
    </template>
  </UCard>
</template>

<script lang="ts" setup>
import ConfirmationDialog from "../ConfirmationDialog.vue";
import { useMySocialmediaStore } from "../../store/socialmedia";
import type { ISocialMedia } from "~/models/SocialMedia";
const socialMedialApi = useSocialMedia();
const modal = useModal();
const toast = useToast();

const socialMediaREQ = await socialMedialApi.getAllSocialMedia();
const SocialMedia = computed(() => {
  return socialMediaREQ.data.value?.data;
});
const columns = [
  { key: "name", label: "الاسم" },
  { key: "actions", label: "" },
];

const deleteREQ = await socialMedialApi.deleteSocialMedia();
const onDelete = (id: string) => {
  modal.open(ConfirmationDialog, {
    message: " do you what delete this social media",
    async onSuccess() {
      await deleteREQ.fetchREQ(id);
      if (deleteREQ.status.value == "success") {
        refreshNuxtData("getAllSocialMedia");
        toast.add({ title: "add is done" });
      } else if (deleteREQ.status.value == "error") {
        toast.add({ title: "error in delete" });
      }
    },
  });
};
const SMStore = useMySocialmediaStore()

const onUpdate =(row:ISocialMedia)=>{
  SMStore.S_SM =row
  navigateTo("/socialMedia/add")
}
</script>

<style></style>
