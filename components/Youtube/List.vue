<template>
  <UCard>
    <UTable
      :rows="channelsREQ.data.value?.data"
      :columns="columns"
      :loading="channelsREQ.pending.value">
      <template #title-data="{ row }">
        <div class="flex gap-2 items-center">
          <UAvatar
            :src="row.thumbnailUrl"
            alt="Image Youtube channel "
            size="xl" />
          <ULink
            target="_blank"
            :to="row.url"
            active-class="text-primary"
            inactive-class="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
            >{{ row.title }}
          </ULink>
        </div>
      </template>

      <template #actions-data="{ row }">
        <UButton
          icon="i-heroicons-archive-box-x-mark"
          color="red"
          @click="deleteYC(row.id)"></UButton>
      </template>
      <template #viewCount-data="{ row }">
        <p>
          {{ row.viewCount.toLocaleString() }}
        </p>
      </template>
      <template #subscriberCount-data="{ row }">
        <p>
          {{ row.subscriberCount.toLocaleString() }}
        </p>
      </template>
    </UTable>
    <template #footer>
      <UButton @click="onAdd">أضافة</UButton>
    </template>
  </UCard>
</template>

<script lang="ts" setup>
import YoutubeAdd from "../Youtube/Add.vue";
import ConfirmationDialog from "../ConfirmationDialog.vue";

const youtubeApi = useYoutube();
const channelsREQ = await youtubeApi.getAllYoutubeChannels();
const channels = computed(() => {
  return channelsREQ.data.value?.data;
});
const columns = [
  { key: "title", label: "الاسم" },
  { key: "viewCount", label: "  المشاهدات " },
  { key: "subscriberCount", label: " الاشتركات" },
  { key: "videoCount", label: "  الفيديوهات" },
  { key: "actions" },
];
const modal = useModal();
const toast = useToast()
const onAdd = () => {
  modal.open(YoutubeAdd);
};
const deleteYC_REQ = await youtubeApi.removeYoutubeChannel();
const deleteYC = (id: string) => {
  console.log(id);
  modal.open(ConfirmationDialog, {
    message: "هل تريد مسح هذه القناه",
    async onSuccess() {
      await deleteYC_REQ.fetchREQ(id);
      if (deleteYC_REQ.status.value == "success") {
        toast.add({title:' del is doen '})
      } else if (deleteYC_REQ.status.value == "error") {
        toast.add({title:' del is has error'})
     
      }
      modal.close();
    },
  });

  // open confirmation dialog
};
</script>

<style></style>
