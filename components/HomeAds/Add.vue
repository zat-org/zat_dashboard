<template>
  <UForm :state="state" :schema="schema" @submit="onSubmit">
    <UCard>
      <UFormGroup label="العنوان" name="title">
        <UInput v-model="state.title" />
      </UFormGroup>
      <UFormGroup label="الزر " name="buttonLabel">
        <UInput v-model="state.buttonLabel" />
      </UFormGroup>
      <UFormGroup label="الرابط" name="url">
        <UInput v-model="state.url" />
      </UFormGroup>
      <UFormGroup label="الصوره" name="imageUrl">
        <UInput ref="image" type="file" v-model="state.imageUrl" />
      </UFormGroup>
      <template #footer>
        <div class="flex justify-around">
          <UButton color="gray" @click="navigateTo('/homeAds')"> عوده </UButton>

          <UButton
            type="submit"
            :loading="createHomeAds.status.value == 'pending'"
            >اضافة</UButton
          >
        </div>
      </template>
    </UCard>
  </UForm>
</template>

<script lang="ts" setup>
import { object, string } from "yup";
import type { IHomeAds } from "~/models/homeAds";
import type { Partner } from "~/models/partner";
const HomeAdsApi = useHomeAds();
const image = ref();
const toast = useToast();
const schema = object({
  title: string().required(),
  buttonLabel: string().required(),
  imageUrl: string().required(),
  url: string()
    .required()
    .matches(
      /^(https?:\/\/)?((([a-zA-Z\d]([a-zA-Z\d-]*[a-zA-Z\d])*)\.)+[a-zA-Z]{2,}|\d{1,3}(\.\d{1,3}){3}|(\[(?:[a-fA-F\d]{1,4}:){7}[a-fA-F\d]{1,4}\]))(:\d+)?(\/[-a-zA-Z\d%_.~+]*)*(\?[;&a-zA-Z\d%_.~+=-]*)?(#[a-zA-Z\d_-]*)?$/i,
      "this not valid link"
    ),
});
const state = reactive<Omit<IHomeAds, "id">>({
  title: "",
  buttonLabel: "",
  imageUrl: "",
  url: "",
});

const createHomeAds = await HomeAdsApi.createHomeAds();
const onSubmit = async () => {
  console.log(image.value);
  const logoimage = image.value.input as HTMLInputElement;
  if (logoimage.files && logoimage.files.length > 0) {
    const logoFile = logoimage.files[0];
    await createHomeAds.fetchRequest(state, logoFile);
    if (createHomeAds.status.value == "error") {
      toast.add({ title: "some error happend" });
    } else if (createHomeAds.status.value == "success") {
      toast.add({ title: "add is doen" });
      navigateTo("/HomeAds");
    }
  }
};
// onMounted(()=>{
  // const image_url = computed(()=>{
  //   const logoimage = image.value?.input as HTMLInputElement;
  //   let url:any =null
  //   if (logoimage.files && logoimage.files.length > 0) {
  //     const logoFile = logoimage.files[0];
  //     const reader = new FileReader();
  //         reader.onload = (e) => {
  //           url=e.target?.result;
  //         };
  //         reader.readAsDataURL(logoFile);
  //   }
  //   console.log(url)
  //   return url
  // })
// })
</script>

<style></style>
