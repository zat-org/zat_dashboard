<template>
  <div class="flex flex-col gap-5">
    <h1
      class="text-primary text-3xl font-semibold cursor-pointer hover:text-gray-600 duration-300"
      @click="navigateTo('/news')">
      الاخبار
    </h1>
    <UCard
      class="grow"
      :ui="{
        base: 'flex flex-col h-fit ',
        background: 'bg-transparent',
        body: { base: 'grow' },
      }"
      v-if="selected_news.data.value">
      <template #header>
        <div class="flex justify-between gap-5">
          <h1 class="text-3xl text-primary">
            {{ selected_news.data.value.data.title }}
          </h1>
          <UBadge
            :color="
              selected_news.data.value.data.isPublished ? 'green' : 'red'
            ">
            <UIcon
              :name="
                selected_news.data.value.data.isPublished
                  ? 'i-heroicons-check-16-solid'
                  : 'i-heroicons-x-mark-16-solid'
              " />
          </UBadge>
        </div>
      </template>
      <div class="flex flex-col gap-5 justify-stretch">
        <UPopover>
          <UButton
            color="white"
            label="الصورة"
            trailing-icon="i-heroicons-photo" />
          <template #panel>
            <div class="p-4 w-[500px] h-[500px]">
              <img :src="selected_news.data.value.data.imageUrl" alt="" />
            </div>
          </template>
        </UPopover>

        <!-- <div class=" w-[100%] h-[200px] self-center" :style="{background:'url(' +selected_news.data.value.data.imageUrl+') no-repeat center '}"></div> -->

        <p>
          <span class="text-primary text-2xl"> الوصف</span><br />
          {{ selected_news.data.value.data.description }}
        </p>
        <p>
          <span class="text-primary text-2xl">المحتوي</span> <br />
          {{ selected_news.data.value.data.content }}
        </p>
        <p>
          <span class="text-primary text-2xl">بتاريخ</span><br />
          {{
            new Date(
              selected_news.data.value.data.publishDateUtc
            ).toLocaleDateString("ar")
          }}
        </p>
      </div>

      <template #footer>
        <div class="flex justify-between gap-5">
          <UButton icon="i-heroicons-cog-8-tooth" color="yellow" @click="editNews" >تعديل</UButton>
          <UButton icon="i-heroicons-archive-box-x-mark" color="red" :loading="DNews.status.value=='pending'" @click="deleteNews" >مسح</UButton>
        </div>
      </template>
    </UCard>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{ id: string }>();
const newsApi = useNews();
const toast = useToast()

const selected_news = await newsApi.getSingleNews(props.id);
if (selected_news.status.value == "error") {
  if (selected_news.error.value?.statusCode == 404) {
    navigateTo("/news");
  }
}

const DNews =await newsApi.deleteNews(props.id)
const deleteNews=async()=>{
  await DNews.execute()
  if(DNews.status.value =='error'){
    toast.add({title:'error happend'})
  }else if(DNews.status.value=='success'){
    toast.add({title:'good no error delete done '})
    navigateTo('/news')
  }
}
const editNews = ()=>{
  navigateTo(`/news/update/${selected_news.data.value?.data.id}`)
}
</script>

<style></style>
