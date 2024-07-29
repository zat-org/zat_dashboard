<template>
  <UCard>
    <div class="flex flex-col gap-3 grow">
      <div class="flex gap-5 items-center">
        <img :src="player.imageUrl" class="w-[200px] rounded-2xl" alt="" />
        <h1 class="text-primary text-2xl font-semibold">
          {{ player.fullName }}
        </h1>
      </div>
      <!-- studiio section  -->
      <div class="flex flex-col items-center grow">
        <h2>Studio section</h2>
        <div class="bg-blue-500 h-[200px] w-full overflow-auto grow"></div>
      </div>
    </div>
    <template #footer>
      <div class="flex justify-between items-center">
        <UButton label="عودة" @click="navigateTo('/analyst')" color="gray" />
        <div class="flex items-center gap-3">
          <UButton
            label="حذف"
            color="red"
            icon="i-mdi-delete"
            @click="onDelete" />

          <UButton
            label="تعديل"
            color="yellow"
            icon="i-mdi-edit-outline"
            @click="onUpdate" />
        </div>
      </div>
    </template>
  </UCard>
</template>

<script lang="ts" setup>
import ConfirmationDialog from "../ConfirmationDialog.vue";

const props = defineProps<{ id: string }>();
const analystApi = useAnalyst();
const modal = useModal();
const toast = useToast();
const getREQ = await analystApi.getAnalysByID();
await getREQ.fetchREQ(props.id);
// if (getREQ.status.value == "success"){}
if (getREQ.status.value == "error") {
  toast.add({ title: "error in retrive analyst " });
  navigateTo("/analyst");
}
const player = computed(() => {
  return getREQ.data.value?.data!;
});
const deleteREQ = await analystApi.deleteAnalystByID();
const onDelete = () => {
  modal.open(ConfirmationDialog, {
    message: "do you want to delete that analyst",
    async onSuccess() {
      await deleteREQ.fetchREQ(props.id);
      if (deleteREQ.status.value == "success") {
        toast.add({ title: " delete analyst success" });
        return navigateTo("/analyst");
      } else if (deleteREQ.status.value == "error") {
        toast.add({ title: "  delete analyst error " });
      }
      modal.close();
    },
  });
};
const onUpdate = ()=>{
  return navigateTo(`/analyst/update/${props.id}`)
}
</script>

<style></style>
