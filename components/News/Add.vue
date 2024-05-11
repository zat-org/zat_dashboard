<template>
  <UForm :state="state" :schema="schema" @submit="onSubmit" class="grow">
    <UCard :ui="{ base: 'flex flex-col h-full grow ', body: { base: 'grow' } }">
      <div class="flex flex-col gap-2 justify-evenly h-[90%]">
        <div class="flex gap-2">
          <UFormGroup label="العنوان" class="grow" name="title">
            <UInput v-model="state.title" />
          </UFormGroup>
          <UFormGroup label="نشر " name="isPublished">
            <UToggle v-model="state.isPublished" />
          </UFormGroup>
        </div>
        <div class="grid grid-cols-2 gap-2">
          <UFormGroup label="الوصف" name="description">
            <UTextarea v-model="state.description" />
          </UFormGroup>
          <UFormGroup label="المحتوي" name="content">
            <UTextarea v-model="state.content" />
          </UFormGroup>
        </div>
        <div class="grid grid-cols-2 gap-2">
          <UFormGroup label="تاريخ النشر" name="publishDateUtc">
            <VDatePicker
              expanded
              title-position="right"
              v-model="state.publishDateUtc"
              :attributes="attrs"
              locale="ar"
              dir="rtl"
              :is-dark="true" />
          </UFormGroup>
          <div class="flex flex-col gap-2">
            <UFormGroup label="الخلفية" name="image">
              <UInput
                @change="display_image"
                ref="image_input"
                type="file"
                size="xl"
                v-model="state.image" />
            </UFormGroup>
            <img v-if="image_url" :src="image_url" alt="" class="h-[200px]" />
          </div>
        </div>
      </div>

      <template #footer>
        <UButton type="submit" label="اضافه" />
      </template>
    </UCard>
  </UForm>
</template>

<script lang="ts" setup>
import { object, string, boolean } from "yup";
const attrs = ref([
  {
    highlight: {
      color: "cyan",
      fillMode: "solid",
    },
    dates: new Date(),
  },
]);
const image_input = ref();
const image_url = ref();

const display_image = (event: any) => {
  const input = image_input.value.input as HTMLInputElement;

  if (input.files && input.files.length > 0) {
    const fr = new FileReader();
    fr.readAsDataURL(input.files[0]);
    fr.addEventListener("load", () => {
      image_url.value = fr.result;
    });
  }
};
const newsApi = useNews();
const schema = object({
  title: string().required(),
  description: string(),
  content: string().required(),
  publishDateUtc: string().required(),
  image: string(),
  isPublished: boolean().required(),
});
const state = reactive<{
  title: string;
  description: string;
  content: string;
  publishDateUtc: Date | string;
  image: any;
  isPublished: boolean;
}>({
  title: "",
  description: "",
  content: "",
  publishDateUtc: new Date(),
  image: null,
  isPublished: true,
});

const add_news = await newsApi.addNews();
const onSubmit = async (event: any) => {
  const image = image_input.value.input as HTMLInputElement;
  if (image.files && image.files.length > 0) {
    state.publishDateUtc = new Date(state.publishDateUtc).toISOString();
    await add_news.sendRequest(state, image.files[0]);
    console.log(add_news);
  }
};
</script>

<style></style>
