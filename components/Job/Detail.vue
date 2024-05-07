<template>
  <UCard
    v-if="job.data.value"
    :ui="{
      base: 'grow flex flex-col overflow-auto',
      body: { base: 'flex gap-5 w-full h-full items-stretch' },
    }">
    <template #header>
      <div class="flex justify-between gap-5">
        <h1 class="text-2xl text-primary">
          <span
            @click="navigateTo('/jobs')"
            class="font-bold text-2xl cursor-pointer hover:text-gray-700 duration-300">
            الوظائف /
          </span>
          {{ job.data.value?.data.position }}
        </h1>
        <UBadge>{{
          transferTimeStamp.calcDate(job.data.value?.data.createdSince)
        }}</UBadge>
      </div>
    </template>
    <template #footer>
      <div class="flex gap-5">
        <UButton
          @click="gotoupdate"
          color="yellow"
          icon="i-heroicons-cog-6-tooth-16-solid"
          label="تعديل" />
        <UButton
          icon="i-heroicons-x-mark-16-solid"
          label="مسح"
          @click="deleteJob"
          color="red"
          :loading="deleteJobAd.status.value == 'pending'" />
      </div>
    </template>

    <UCard :ui="{ base: 'flex flex-col grow', body: { base: 'grow' } }">
      <div class="flex flex-col">
        <h1 class="text-2xl text-primary">ملخص</h1>
        <p class="text-lg px-3">
          {{ job.data.value?.data.brief }}
        </p>
        <MDC :value="data_md" />
      </div>
    </UCard>
    <UCard :ui="{ base: 'grow', body: { base: '' } }">
      <UTable
        v-if="applies.data.value"
        :rows="applies.data.value?.data.briefApplies"
        :columns="columns"
        @select="onSelect" />
    </UCard>
  </UCard>
</template>

<script lang="ts" setup>
import ConfirmationDialog from "../ConfirmationDialog.vue";
import { parseMarkdown } from "@nuxtjs/mdc/runtime";
import type { IApplyBrief } from "~/models/jobs";

const route = useRoute();
const router = useRouter();
const modal = useModal();
const transferTimeStamp = useTimeStampToDate();
const jobApi = useJobAd();
const job = await jobApi.getJob(route.params.id as string);
const onSelect = (row: IApplyBrief) => {
  router.push(`/jobs/${route.params.id}/apply/${row.id}`);
};
let data_md: any = "";
if (job.data.value) {
  const data = [
    "#### [المسؤليات]{ .text-primary .text-2xl } ",
    job.data.value.data.responsibilities,
    " #### [المتطلبات]{ .text-primary .text-2xl }",
    job.data.value.data.requirements,
    " ####  [ساعات العمل]{.text-primary .text-2xl}",
    job.data.value.data.workHoursTypes,
    " #### [مكان العمل]{ .text-primary .text-2xl}",
    job.data.value.data.location,
  ].join("\n");
  data_md = await parseMarkdown(data);
}
const applies = await jobApi.getjoballapply(route.params.id as string);
const columns = [
  { key: "fullName", label: "الاسم كامل" },
  { key: "email", label: "البريد الالكتروني" },
  { key: "brief", label: "الملخص" },
];

const gotoupdate = () => {
  router.push(`/jobs/update/${route.params.id}`);
};
const deleteJobAd = await jobApi.deleteJob(route.params.id as string);
const deleteJob = async () => {
  modal.open(ConfirmationDialog, {
    message: "هل تريد مسح هذا الوظيفه",
    async onSuccess() {
      await deleteJobAd.execute();
      if (deleteJobAd.status.value == "success") {
        navigateTo("/jobs");
        modal.close();
      } else if (deleteJobAd.status.value == "error") {
      }
    },
  });
};
</script>

<style></style>
