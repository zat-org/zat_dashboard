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
                v-model="state.imageUrl" />
            </UFormGroup>
            
            <img v-if="image_url  " :src="image_url " alt="" class="h-[200px]" />
          </div>
        </div>
      </div>

      <template #footer>
        <UButton
          type="submit"
          label="اضافه"
          :loading="add_news.status.value == 'pending'" />
      </template>
    </UCard>
  </UForm>
</template>

<script lang="ts" setup>
import { object, string, boolean } from "yup";
const newsApi = useNews();
const toast = useToast();
// add edit mode
const props = defineProps<{ id?: string }>();
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
const schema = object({
  title: string().required(),
  description: string(),
  content: string().required(),
  publishDateUtc: string().required(),
  image: string(),
  isPublished: boolean().required(),
});
let state = reactive<{
  title: string;
  description: string;
  content: string;
  publishDateUtc: Date | string;
  imageUrl: any;
  isPublished: boolean;
}>({
  title: "",
  description: "",
  content: "",
  publishDateUtc: new Date(),
  imageUrl: null,
  isPublished: true,
});
if (props.id) {
  const SNews = await newsApi.getSingleNews(props.id);
  if (SNews.status.value == "error") {
    toast.add({ title: "cant get this News" });
    if (SNews.error.value?.statusCode == 404) {
      navigateTo("/news");
    }
  } else if (SNews.status.value == "success") {

    if (SNews.data.value?.data) {
      state.title = SNews.data.value?.data.title;
      state.content = SNews.data.value?.data.content;
      state.description = SNews.data.value?.data.description;
      state.isPublished = SNews.data.value?.data.isPublished;
      state.publishDateUtc = new Date(SNews.data.value?.data.publishDateUtc);
      image_url.value=SNews.data.value?.data.imageUrl;
    }
  }
}

const add_news = await newsApi.addNews();
const onSubmit = async (event: any) => {
  if(props.id){
    

  }else{
    

    const image = image_input.value.input as HTMLInputElement;
    if (image.files && image.files.length > 0) {
      state.publishDateUtc = new Date(state.publishDateUtc).toISOString();
      await add_news.sendRequest(state, image.files[0]);
    }
    if (add_news.error.value) {
    }
    if (add_news.data.value) {
      toast.add({ title: "تم اضافة الخبر بنجاح" });
    }
  }
};
</script>

<style></style>
