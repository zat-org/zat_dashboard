<template>
  <UForm :state="state" :schema="schema" @submit="onSubmit" class="flex">
    <UCard>
      <UFormGroup label="name" name="name">
        <UInput v-model="state.name" />
      </UFormGroup>
      <UFormGroup label="account url" name="accountUrl">
        <UInput v-model="state.accountUrl" />
      </UFormGroup>
      <template #footer>
        <div class="flex justify-between">
          <UButton color="gray" @click="SMStore.reset();navigateTo('/socialMedia')"
            >عوده</UButton
          >

          <UButton type="submit" :loading="Add.status.value == 'pending'"
            >اضافه
          </UButton>
        </div>
      </template>
    </UCard>
  </UForm>
</template>

<script lang="ts" setup>
const props= defineProps<{editMode:boolean}>()
import { object, string } from "yup";
import type { ISocialMedia } from "~/models/SocialMedia";
import { useMySocialmediaStore } from "~/store/socialmedia";
const schema = object({
  name: string().required(),
  accountUrl: string()
    .required()
    .matches(
      /^(https?:\/\/)?((([a-zA-Z\d]([a-zA-Z\d-]*[a-zA-Z\d])*)\.)+[a-zA-Z]{2,}|\d{1,3}(\.\d{1,3}){3}|(\[(?:[a-fA-F\d]{1,4}:){7}[a-fA-F\d]{1,4}\]))(:\d+)?(\/[-a-zA-Z\d%_.~+]*)*(\?[;&a-zA-Z\d%_.~+=-]*)?(#[a-zA-Z\d_-]*)?$/i,
      "this not valid link"
    ),
});
const SMStore = useMySocialmediaStore();

const toast = useToast();
let state = reactive<Omit<ISocialMedia, "id">>({ name: "", accountUrl: "" });
if (props.editMode) {
  state.name = SMStore.S_SM.name;
  state.accountUrl = SMStore.S_SM.accountUrl;
}
const SMApi = useSocialMedia();
const Add = await SMApi.AddSocialMedia();
const Update = await SMApi.UpdateSocialMedia(SMStore.S_SM.id);
const onSubmit = async () => {
  if (props.editMode) {
    await Update.FetchREQ(state);
    if (Update.status.value == "success") {
      toast.add({ title: "update is done" });
      SMStore.reset()
      navigateTo("/socialMedia");
    }
    if (Update.status.value == "error") {
      toast.add({ title: "error in update social media " });
    }
  } else {
    await Add.FetcREQ(state);
    if (Add.status.value == "success") {
      toast.add({ title: "Add is done" });
      navigateTo("/socialMedia");
    }
    if (Add.status.value == "error") {
      toast.add({ title: "error in add social media " });
    }
  }
};
</script>

<style></style>
