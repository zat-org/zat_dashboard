<template>
  <div class="flex flex-col gap-5">
    <h1 class="text-2xl text-primary font-semibold">الاخبار</h1>
    <UCard
      :ui="{
        base: 'flex flex-col h-full  border border-primary ',
        background: 'bg-transparent dark:bg-transparent',
        body: { base: 'grow ' },
      }">
      <UTable
        @select="onSelect"
        :rows="all_news.data.value?.data"
        :columns="columns"
        :ui="{ tbody: 'overflow-y-scroll', thead: 'sticky' }"
        class="h-[60vh]">
        <template #publishDateUtc-data="{ row }">
          <span>
            {{ new Date(row.publishDateUtc).toLocaleString("ar") }}
          </span>
        </template>

        <template #isPublished-data="{ row }">
          <UBadge :color="row.isPublished ? 'green' : 'red'">
            <UIcon
              :name="
                row.isPublished
                  ? 'i-heroicons-check-16-solid'
                  : 'i-heroicons-x-mark-16-solid'
              " />
          </UBadge>
        </template>
      </UTable>

      <template #footer>
        <div>
          <UButton
            label="اضافة خبر"
            icon="i-heroicons-plus-16-solid"
            trailing
            @click="navigateTo('/news/add')" />
        </div>
      </template>
    </UCard>
  </div>
</template>

<script lang="ts" setup>
import type { INews } from "~/models/News";

const newApi = useNews();
const all_news = await newApi.get_all_news();

const columns = [
  { key: "title", label: "العنوان" },
  { key: "description", label: "الشرح" },
  { key: "publishDateUtc", label: "التاريخ" },
  { key: "isPublished", label: "الظهور" },
];
const onSelect = (row: INews) => {
  navigateTo(`/news/${row.id}`);
};
</script>

<style></style>
