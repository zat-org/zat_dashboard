<template>
  <UModal prevent-close dir="rtl">
    <UForm :state="state" :schema="schema" @submit="onSubmit">
      <UCard>
        <template #header>
          <h1 class="text-2xl text-primary font-semibold">
            اضافة قناة يوتيوب جديده
          </h1>
        </template>
        <UFormGroup label="id">
          <UInput v-model="state.id" placeholder="قم بادخال id الخاص بالقناه" />
        </UFormGroup>
        <template #footer>
          <div class="flex justify-between gap-5">
            <UButton
              type="submit"
              :loading="AddYoutubeChannelREQ.status.value == 'pending'"
              >اضافه</UButton
            >
            <UButton color="red" @click="modal.close()">الغاء</UButton>
          </div>
        </template>
      </UCard>
    </UForm>
  </UModal>
</template>

<script lang="ts" setup>
import { object, string, type InferType } from "yup";
const youtubeApi = useYoutube();
const modal = useModal();
const toast = useToast();
const AddYoutubeChannelREQ = await youtubeApi.addYoutubeChannels();
const state = reactive<{ id: string }>({ id: "" });
const schema = object({
  id: string().required(),
});
const onSubmit = async () => {
  console.log(state.id);
  await AddYoutubeChannelREQ.fetchREQ(state.id);
  if (AddYoutubeChannelREQ.status.value == "success") {
    toast.add({ title: "done" });
  } else if (AddYoutubeChannelREQ.status.value == "error") {
    toast.add({ title: "errro" });
  }
  modal.close();
};
</script>

<style></style>
