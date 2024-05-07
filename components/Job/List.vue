<template>
  <div>
    
    <UTable
      :rows="allJobs.data.value?.data"
      :loading="allJobs.pending.value"
      :columns="columns"
      @select="select"
      :ui="{th:{color:'text-primary'}}"
      >
      <template #createdSince-data="{ row }">
        {{ timeStampConverter.calcDate(row.createdSince) }}
      </template>
    </UTable>
  </div>
</template>

<script setup lang="ts">
import { useTimeStampToDate } from "~/composables/TimeStampToDate";
import type { IJobBrief } from "~/models/jobs";

const jobApi = useJobAd();
const allJobs = await jobApi.getAllJobAd();
const columns = [
  {
    key: "position",
    label: "الوظيفه",
  },
  {
    key: "brief",
    label: "الملخص",
  },
  {
    key: "createdSince",
    label: "منذ",
  },
];

const select = (row: IJobBrief) => {
  return navigateTo(`/jobs/${row.id}`);
};
const timeStampConverter = useTimeStampToDate();
</script>

<style scoped></style>
