<template>
  <UForm :state="state" :schema="schema" @submit="onSubmit">
    
      <UCard :ui="{ base: 'flex flex-col h-full ', body: { base: 'grow' } }">
        <template #header> </template>
        <div>
          <UFormGroup label="العنوان" name="title">
            <UInput v-model="state.title" />
          </UFormGroup>
          <UFormGroup label="الوصف" name="description">
            <UTextarea v-model="state.description" />
          </UFormGroup>
          <UFormGroup label="المحتوي" name="content">
            <UTextarea v-model="state.content" />
          </UFormGroup>
          <UFormGroup label="المحتوي" name="publishDateUtc">
            <VDatePicker
              v-model="state.publishDateUtc"
              :attributes="attrs"
              locale="ar"
              dir="rtl"
              :is-dark="true" />
          </UFormGroup>
          <UFormGroup label="المحتوي" name="imageUrl">
         
            <UInput
             @input="handleFileInput"
              ref="image_input"
              type="file"
              size="xl"
              v-model="state.imageUrl" />
          </UFormGroup>
          <UFormGroup label="نشر " name="isPublished">
            <UToggle v-model="state.isPublished" />
          </UFormGroup>
        </div>

        <template #footer>
          <UButton type="submit" label="add" />
        </template>
      </UCard>

  </UForm>
  <!-- {{ data }} -->
</template>

<script lang="ts" setup>
import { object, string, boolean } from "yup";
const attrs = ref([
  {
    highlight: {
      color: "cyan",
      fillMode: "solid",
    },
  },
]);
const { handleFileInput, files } = useFileStorage()
const image_input = ref();


const newsApi = useNews();
const schema = object({
  title: string().required(),
  description: string(),
  content: string().required(),
  publishDateUtc: string().required(),
  imageUrl: string(),
  isPublished: boolean().required(),
});
const state = reactive<{
  title: string;
  description: string;
  content: string;
  publishDateUtc: string;
  imageUrl: any;
  isPublished: boolean;
}>({
  title: "",
  description: "",
  content: "",
  publishDateUtc: "",
  imageUrl: null,
  isPublished: true,
});

const add_news = await newsApi.addNews();
const onSubmit = async () => {
  //take state and image
  const image =image_input.value.input as HTMLInputElement  
  if (image.files && image.files.length>0){
    // var reader =new FileReader()
    // const image_bin =reader.readAsDataURL(image.files[0])
    // console.log(image.files[0])
    // console.log(image_bin)
    state.publishDateUtc="2013-10-21T13:28:06.419Z"
    await add_news.sendRequest(state,image.files[0]);
    console.log(add_news)
  } 
};
</script>

<style></style>
