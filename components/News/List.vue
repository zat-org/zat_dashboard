<template>
  <UCard
    :ui="{
      base: 'flex flex-col h-full  border border-primary ',
      background: 'bg-transparent dark:bg-transparent',
      body: { base: 'grow' },
    }">
    <template #header>
      <h1 class="text-2xl text-primary font-semibold">الاخبار</h1>
    </template>

    <UTable :rows="all_news.data.value?.data" :columns="columns" />

    <template #footer>
      <div>
        <UButton label="اضافة خبر"  icon="i-heroicons-plus-16-solid" trailing @click="navigateTo('/news/add')" />
      </div>
    </template>
  </UCard>
</template>

<script lang="ts" setup>
const newApi = useNews();
const all_news = await newApi.get_all_news();

const columns = [
  { key: "title", label: "العنوان" },
  { key: "description", label: "الشرح" },
  { key: "publishDateUtc", label: "التاريخ" },
];
</script>

<style></style>
