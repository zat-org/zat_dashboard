<template>
  <!-- card -->
  <UCard
    :ui="{
  
    }">
    <UFormGroup class="">
      <UInput
        placeholder="الاسم .. الايميل  .. رقم الهاتف"
        icon="i-heroicons-magnifying-glass"
        v-model="q" />
    </UFormGroup>
    <UTable
      :ui="{ th: { base: 'sticky' } }"
      :rows="rows"
      :columns="columns"
      @select="onSelect"
      :sort="sort"
      class="basis-[200px] grow">
      <template #experienceYears-data="{ row }">
        <span class="flex gap-2 items-center">
          <span>
            {{ row.experienceYears }}
          </span>
          <div
            v-if="row.anyPreviousExperience"
            class="h-[2rem] w-[2rem] flex justify-center items-center  text-primary hover:text-gray-500 hover:bg-primary duration-300 rounded-full">
            <UIcon class="text-2xl" name="i-heroicons-check-badge" />
          </div>
        </span>
      </template>
      <template #actions-data="{ row }">
        <div
          @click.stop="delete_row(row.id)"
          class="flex justify-center h-[2rem] w-[2rem] items-center rounded-full text-red-400 hover:text-gray-500 hover:bg-red-400 duration-300">
          <UIcon name="i-heroicons-archive-box-x-mark" class="text-2xl" />
        </div>
      </template>
    </UTable>
    <div class="flex justify-center px-3">
      <UPagination
        v-model="page"
        :page-count="pageCount"
        :total="filterdData.length" />
    </div>

    <!-- <template #footer> </template> -->
  </UCard>
</template>

<script lang="ts" setup>
import type { OfficiantApply } from "~/models/Officiant";
import ConfirmationDialog from "../ConfirmationDialog.vue";

const officiantApi = useOfficiant();
const Officiants = await officiantApi.getAllOfficiant();
const modal = useModal();
const toast = useToast();
const columns = [
  { key: "fullName", label: "الاسم" },
  { key: "residenceCity", label: "المدينة" },
  { key: "experienceYears", label: "سنوات الخبره", sortable: true },
  { key: "actions" },
];
const onSelect = (row: OfficiantApply) => {
  navigateTo(`officiant/${row.id}`);
};
const sort = ref({
  column: "experienceYears",
  direction: "desc",
});
const q = ref("");
const filterdData = computed((): OfficiantApply[] => {
  page.value = 1;
  const data = Officiants.data.value?.data;
  if (!q.value) {
    return data!;
  }
  return data?.filter((officiant) => {
    // console.log((officiant.fullName ==q.value.toLowerCase() ||  officiant.email ==q.value.toLowerCase() ||  officiant.phoneNumber ==q.value.toLowerCase()))
    return (
      officiant.fullName.includes(q.value.toLowerCase()) ||
      officiant.email.includes(q.value.toLowerCase()) ||
      officiant.phoneNumber.includes(q.value.toLowerCase())
    );
  })!;
});
const page = ref(1);
const pageCount = 10;
const deleteOfficiant = await officiantApi.deleteSingleOfficiant();
const delete_row = (id: string) => {
  modal.open(ConfirmationDialog, {
    message: "هل تريد مسح هذا الطلب",
    async onSuccess() {
      deleteOfficiant.fetchRequest(id);
      console.log();
      if ((deleteOfficiant.status.value = "success")) {
        toast.add({ title: "تم حذف الطلب بنجاح" });
      } else if ((deleteOfficiant.status.value = "error")) {
        toast.add({ title: "حدث خطاء ما" });
      }
      modal.close();
    },
  });
};

const rows = computed(() => {
  return filterdData.value.slice(
    (page.value - 1) * pageCount,
    page.value * pageCount
  );
});
</script>

<style></style>
