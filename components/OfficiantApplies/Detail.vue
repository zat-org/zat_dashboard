<template>
  <UCard
    :ui="{
      base: 'flex flex-col grow  border border-primary ',
      background: 'bg-transparent dark:bg-transparent',
      body: { base: 'grow flex flex-col gap-5 text-2xl justify-evenly ' },
    }">
    <template #header>
      <div class="flex justify-between gap-5 items-center">
        <h1 class="text-3xl text-primary">
          {{ officiant.fullName }}
        </h1>
        <div
          v-if="officiant.anyPreviousExperience"
          class="h-[2rem] w-[2rem] flex justify-center items-center text-primary hover:text-gray-500 hover:bg-primary duration-300 rounded-full">
          <UIcon class="text-3xl" name="i-heroicons-check-badge" />
        </div>
      </div>
    </template>

    <div class="flex items-center gap-2">
      <UIcon class="text-2xl text-primary" name="i-heroicons-phone" />
      <h2 class="text-2xl text-primary font-semibold">رقم الهاتف</h2>
      <p>{{ officiant.phoneNumber }}</p>
    </div>
    <div class="flex items-center gap-2">
      <UIcon class="text-2xl text-primary" name="i-heroicons-envelope" />

      <h2 class="text-2xl text-primary font-semibold">البريد الالكتروني</h2>
      <p>{{ officiant.email }}</p>
    </div>
    <div class="flex items-center gap-2">
      <UIcon class="text-2xl text-primary" name="i-heroicons-map-pin" />
      <h2 class="text-2xl text-primary font-semibold">محل الاقامه</h2>
      <p>{{ officiant.residenceCity }}</p>
    </div>
    <div class="flex items-center gap-2">
      <UIcon class="text-2xl text-primary" name="i-heroicons-calendar" />
      <h2 class="text-2xl text-primary font-semibold">تاريخ الميلاد</h2>
      <p>{{ new Date(officiant.birthDateUtc).toLocaleDateString() }}</p>
    </div>
    <div class="flex items-center gap-2">
      <h2 class="text-2xl text-primary font-semibold">عدد سنوات الخبره</h2>
      <p>{{ officiant.experienceYears }}</p>
    </div>
    <template #footer>
      <div class="flex justify-between gap-5">
        <UButton color="gray" @click="navigateTo('/officiant')">عودة</UButton>
        <UButton
          color="red"
          icon="i-heroicons-trash"
          :loading="deleteSingleOfficiant.status.value == 'pending'"
          @click="onDelete"
          >حذف</UButton
        >
      </div>
    </template>
  </UCard>
</template>

<script lang="ts" setup>
import { useOfficiantApplies } from "~/composables/OfficiantApplies";
import type { OfficiantApply } from "~/models/OfficiantApplies";
const toast = useToast();
const props = defineProps<{ id: string }>();
// get apply and check if exist with this id or not exist

const singleOfficicant = await useOfficiantApplies().getSingleOfficiant(props.id);

if (singleOfficicant.status.value == "error") {
  if (singleOfficicant.error.value?.statusCode == 404) {
    navigateTo("/officiant");
  }
}
if (singleOfficicant.status.value == "success") {
  // dispaly datat every thing is ok
}
const officiant = computed((): OfficiantApply => {
  return singleOfficicant.data.value?.data!;
});
const deleteSingleOfficiant = await useOfficiantApplies().deleteSingleOfficiant();
const onDelete = async () => {
  await deleteSingleOfficiant.fetchRequest(props.id);
  if (deleteSingleOfficiant.status.value == "success") {
    toast.add({ title: "تم حذف الطلب بنجاح" });
    navigateTo("/officiant");
  } else if (deleteSingleOfficiant.status.value == "error") {
    toast.add({ title: "حدث خطا ما" });
  }
};
</script>

<style>
p {
  @apply text-xl;
}
</style>
