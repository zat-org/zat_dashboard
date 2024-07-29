<template>
  <UCard>
    <div class="flex gap-10">
      <img :src="officiant?.imageUrl" class="w-[30vw] h-[30vh] rounded-xl" />
      <div class="flex flex-col gap-5 items-center">
        <p class="text-2xl font-semibold text-primary">{{ officiant?.name }}</p>
        <p class="text-xl">
          ابتداء التدريب منذ
          {{ getDuration(officiant?.startOfficiantingOn!) }}
        </p>
      </div>
    </div>
    <template #footer>
      <div class="flex justify-between">
        <UButton color="gray" @click="navigateTo('/officiant')">عودة</UButton>
        <div class="flex gap-5">
          <UButton icon="i-heroicons-cog-8-tooth" color="yellow" @click="onUpdate">تعديل</UButton>
          <UButton
            icon="i-heroicons-archive-box-x-mark"
            color="red"
            @click="onDelete"
            >مسح</UButton
          >
        </div>
      </div>
    </template>
  </UCard>
</template>

<script lang="ts" setup>
import ConfirmationDialog from "../ConfirmationDialog.vue";

const props = defineProps<{ id: string }>();
const officiantApi = useOfficiant();
const toast = useToast();
const modal = useModal();
const getREQ = await officiantApi.getOfficiantbyid(props.id);
if (getREQ.status.value == "success") {
} else if (getREQ.status.value == "error") {
  toast.add({ title: "can retrive this officiant " });
  navigateTo("/officaint");
}
const officiant = computed(() => {
  return getREQ.data.value?.data;
});
const getDuration = useDuration().getAllDurations;
const deleteREQ = await officiantApi.deleteOfficiantbyid();
const onDelete = () => {
  modal.open(ConfirmationDialog, {
    message: "هل تريد مسح هذا الحكم",
    async onSuccess() {
      await deleteREQ.fetchREQ(props.id);
      if (deleteREQ.status.value == "success") {
        toast.add({ title: "تم مسح هذ الحكم بنجاح" });
        return navigateTo("/officiant");
      } else if (deleteREQ.status.value == "error") {
        toast.add({ title: "حدث خطاء ما في عملية المسح" });
      }
      modal.close();
    },
  });
};
const onUpdate=()=>{
  return navigateTo(`/officiant/update/${props.id}`)
}
</script>

<style></style>
