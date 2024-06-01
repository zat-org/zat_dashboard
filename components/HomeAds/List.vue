<template>
  <UCard>
    <UTable :rows="ads" :columns="columns">
      <template #title-data="{ row }">
        <div class="flex items-center gap-5 ">
          <UAvatar :src="row.imageUrl" alt="Avatar" size="xl" />
          <ULink :to="row.url" target="_blank" class="hover:text-primary">{{ row.title }}</ULink>
        </div>
      </template>
      <template #actions-data="{row}">
      <div  class="flex gap-5">
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
const modal =useModal()
import ConfirmationDialog from '../ConfirmationDialog.vue';
const AdsREQ = await homeAdsApi.getAllHomeAds();
const ads = computed(() => {
  return AdsREQ.data.value?.data;
});
const columns = [
  { key: "title", label: " العنوان" },
  { key: "buttonLabel", label: "الزر" },
  { key: "actions", label: "" },

];
const onDelete=(id:string )=>{
modal.open(ConfirmationDialog,{
  message:"you want to delete  this home Ads",
  onSuccess (){

  }
})
}
const onUpdate=(row:any)=>{}
</script>

<style></style>
