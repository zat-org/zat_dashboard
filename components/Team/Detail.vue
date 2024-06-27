<template>
  <UCard>
    <div class="flex flex-col gap-5 items-center justify-center">
      <img :src="team?.logoUrl" class="w-[200px] h-[200px] rounded-xl" />
      <UDivider label="بيانات الفريق" />
      <div class="flex gap-20">
        <h2 class="text-2xl text-primary font-semibold">{{ team?.name }}</h2>
        <UBadge size="lg" :color="team?.isZatTeam ? 'primary' : 'red'">
          {{ team?.isZatTeam ? "ذات" : "فريق حر" }}</UBadge
        >
      </div>
      <UDivider label="الاعبيين" />
    </div>
    <template #footer>
      <div class="flex justify-between items-center gap-5">
        <UButton label="عودة" @click="navigateTo('/team')" color="gray" />
        <div class="flex items-center gap-3">
          <UButton
            label="حذف"
            color="red"
            icon="i-mdi-delete"
            @click="onDelete" />

          <UButton label="تعديل" color="yellow" icon="i-mdi-edit-outline"  @click="onUpdate"/>
        </div>
      </div>
    </template>
  </UCard>
</template>

<script lang="ts" setup>
import ConfirmationDialog from "../ConfirmationDialog.vue";

const props = defineProps<{ id: string }>();
// console.log(props.id)

const toast = useToast();
const modal = useModal();

const teamApi = useTeam();
const getREQ = await teamApi.getSingleTeam();
await getREQ.fetchREQ(props.id);
if (getREQ.status.value == "error") {
  toast.add({ title: "no team with this id " });
  navigateTo("/team");
}
const team = computed(() => {
  return getREQ.data.value?.data;
});

const deleteREQ = await teamApi.deleteTeam();
const onDelete = () => {
  modal.open(ConfirmationDialog, {
    message: "هل تريد مسح هذا الفريق",
    async onSuccess() {
      await deleteREQ.fetchREQ(props.id);
      if (deleteREQ.status.value == "success") {
        toast.add({ title: " تم مسح هذا الفريق بنجاح" });
        return navigateTo("/team");
      } else if (deleteREQ.status.value == "error") {
        toast.add({ title: "  حدث خطاء في عملية المسح " });
      }
      modal.close();
    },
  });
};

const onUpdate = () => {
  return navigateTo(`/team/update/${props.id}`);
};
</script>

<style></style>
