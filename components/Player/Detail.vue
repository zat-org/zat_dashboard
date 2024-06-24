<template>
  <UCard>
    <div class="flex flex-col gap-3">
      <!-- avtar and name  -->
      <div class="flex gap-3 items-center justify-center">
        <img class="h-[200px] w-[200px] rounded-xl" :src="player?.imageUrl" />
      </div>
      <UDivider label="معلومات اللاعب" />
      <div class="flex gap-10 justify-center">
        <h2 class="text-primary text-2xl font-semibold">
          {{ player?.name }}
        </h2>
      
        <!-- <UBadge v-for="item in player?.roles">{{item.role}}</UBadge> -->
      </div>
      <UDivider label="روابط التواصل" />
      <!-- social mediam links -->
      <div class="flex gap-5 justify-center">
        <UButton  v-for="socialL in player?.socialMedia"   target="_blank" :to="socialL.url" :icon="socialL.icon">{{ socialL.name }} </UButton >
      </div>
    </div>
    <template #footer>
      <div class="flex justify-between">
        <UButton color="gray" @click="navigateTo('/player')"> عودة</UButton>
        <div class="flex gap-3">
          <UButton icon="i-mdi-account-edit" color="yellow" @click="onUpdate">
            تعديل</UButton
          >
          <UButton icon="i-mdi-delete" color="red" @click="onDelete">
            مسح</UButton
          >
        </div>
      </div>
    </template>
  </UCard>
</template>

<script lang="ts" setup>
import ConfirmationDialog from "../ConfirmationDialog.vue";

const props = defineProps<{ id: string }>();
const playerApi = usePlayer();
const toast = useToast();
const modal = useModal();
const sPlayer = await playerApi.getPlayerByID();
await sPlayer.fetchREQ(props.id)
if (sPlayer.status.value == "error") {
  toast.add({ title: "حدث خطا في عملية استرجاع اللاعب" });
  navigateTo("/player");
}
const player = computed(() => sPlayer.data.value?.data);
const players = playerApi.players;

const onDelete = async () => {
  modal.open(ConfirmationDialog, {
    message: "هل تريد مسح هذا المستخدم",
    async onSuccess() {
      const deleteREQ = await playerApi.deletePlayer();
      if (player.value) {
        await deleteREQ.fetchREQ(player.value.id);
        if (deleteREQ.status.value == "success") {
          toast.add({ title: "تم حذف اللاعب بنجاح" });
          return navigateTo("/player");
        } else if (deleteREQ.status.value == "error") {
          toast.add({ title: " حدث خطاء ما عندعملية احذف" });
        }
        modal.close();
      }
    },
  });
};

const onUpdate = () => {
  navigateTo(`/player/update/${props.id}`);
};
</script>

<style></style>
