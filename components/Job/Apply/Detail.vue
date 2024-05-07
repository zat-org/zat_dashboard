<template>
  <UCard
    :ui="{ base: 'flex flex-col ', body: { base: 'grow flex items-stretch' } }">
    <template #header>
      <div class="flex justify-between gap-5">
        <h1
          class="text-primary text-2xl font-semibold hover:text-gray-700 hover:cursor-pointer duration-300"
          @click="
            navigateTo(`/jobs/${apply.data.value?.data.jobAdvertisement.id}`)
          ">
          {{ apply.data.value?.data.jobAdvertisement.position }}
        </h1>
        <UBadge>
          {{
            TTS.calcDate(apply.data.value?.data.jobAdvertisement.createdSince)
          }}
        </UBadge>
      </div>
    </template>
    <div class="flex flex-col items-stretch gap-5">
      <h3>
        <span class="text-primary text-xl">الاسم : </span>
        {{ apply.data.value?.data.jobApply.fullName }}
      </h3>
      <h3>
        <span class="text-primary text-xl">الايميل : </span>
        {{ apply.data.value?.data.jobApply.email }}
      </h3>
      <h3>
        <span class="text-primary text-xl">رقم الجلوال : </span>
        {{ apply.data.value?.data.jobApply.phoneNumber }}
      </h3>
      <h3>
        <span class="text-primary text-xl">المدينه : </span>
        {{ apply.data.value?.data.jobApply.city }}
      </h3>
      <h3 class="text-primary text-xl">ملخص :</h3>
      <p>{{ apply.data.value?.data.jobApply.brief }}</p>
      <div>
        <UButton
          icon="i-heroicons-document-arrow-down-16-solid"
          :to="apply.data.value?.data.jobApply.cvUrl"
          target="_blank">
          تنزيل السيرة الذاتية
        </UButton>
      </div>
    </div>
    <template #footer>
      <div class="flex justify-between gap-5">
        <UButton
          label="عوده"
          color="gray"
          @click="navigateTo(`/jobs/${route.params.id}`)" />

        <UButton
          label="مسح"
          icon="i-heroicons-x-mark-16-solid"
          color="red"
          :loading="deleteApply.status.value == 'pending'"
          @click="delete_apply" />
      </div>
    </template>
  </UCard>
</template>

<script lang="ts" setup>
import ConfirmationDialog from "../../ConfirmationDialog.vue";
const modal = useModal();

const applyApi = useJobAd();
const route = useRoute();
const apply = await applyApi.getJobApply(
  route.params.id as string,
  route.params.apply_id as string
);
if (apply.status.value == "error") {
  if (apply.error.value?.statusCode == 404) {
    navigateTo(`/jobs/${route.params.id}`);
  }
}
const TTS = useTimeStampToDate();

const deleteApply = await applyApi.deletJobApply(
  route.params.id as string,
  route.params.apply_id as string
);
const delete_apply = async () => {
  modal.open(ConfirmationDialog, {
    message: "هل تريد مسح هذا الطلب",
    async onSuccess() {
      await deleteApply.execute();
      if (deleteApply.status.value == "success") {
        navigateTo(`/jobs/${route.params.id}`);
      }
    },
  });
};
</script>

<style></style>
