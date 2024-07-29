<template>
  <UCard>
    <div class="flex flex-col gap-3 grow">
      <div class="flex gap-10 justify-center">
        <img
          class="h-[150px] w-[150px] rounded-xl"
          :src="(player?.imageUrl as string )" />
        <div class="flex flex-col gap-3 justify-center">
          <div class="flex gap-5">
            <h2 class="text-primary text-2xl font-semibold">
              {{ player?.name }}
            </h2>
            <UBadge size="lg">{{ playerRole }}</UBadge>
          </div>

          <div class="flex gap-5 justify-center">
            <UButton
              v-for="socialL in player?.socialMedia"
              target="_blank"
              :to="socialL.url"
              :icon="socialL.icon"
              class="text-2xl">
            </UButton>
          </div>
        </div>
      </div>
      <div class="flex gap-5">
        <UDivider class="w-1/2" label="الفريق الحالي" />
        <UDivider class="w-1/2" label=" تاريخ الانتقالات" />
      </div>

      <!-- <div class="flex justify-center flex-col gap-5"> -->
      <div class="flex gap-3 grow">
        <div
          v-if="player?.team"
          class="flex flex-col justify-center items-center w-1/2 gap-3">
          <img
            :src="player.team.logoUrl"
            class="w-[200px] h-[200px] rounded-xl" />
          <UBadge
            size="lg"
            :color="player.team.isZatTeam ? 'primary' : 'red'"
            icon>
            {{ player.team.name }}
            <UIcon
              :name="player.team.isZatTeam ? 'material-symbols:done' : ''" />
          </UBadge>
        </div>
        <div v-else class=" flex flex-col justify-center items-center w-1/2">
          <p>
            لاعب حر
          </p>
          </div>
        <UDivider orientation="vertical" />
        <div class="w-1/2   h-full flex flex-col justify-end ">
          <PlayerHistory :id="id" />
        </div>
      </div>
    </div>
    <!-- </div> -->
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
          <UButton @click="AddMove" icon="material-symbols:add" class="w-1/3">
            انتقال
          </UButton>
        </div>
      </div>
    </template>
  </UCard>
</template>

<script lang="ts" setup>
import { roleTransation } from "~/models/move";
import ConfirmationDialog from "../ConfirmationDialog.vue";
import Transfer from "../Transfer.vue";
const roleName = roleTransation;
const props = defineProps<{ id: string }>();
const playerApi = usePlayer();
const gamePersonApi = useGameperson()
const toast = useToast();
const modal = useModal();
const sPlayer = await gamePersonApi.getGamePersonByID();
await sPlayer.fetchREQ(props.id)

if (sPlayer.status.value == "error") {
  toast.add({ title: "حدث خطا في عملية استرجاع اللاعب" });
  navigateTo("/player");
}
const player = computed(() => sPlayer.data.value?.data);
const playerRole = computed(()=>{return roleName[player.value?.role!]})
// get player history

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

const AddMove = () => {
   modal.open(Transfer, { player: player.value! })
   
};
</script>

<style></style>
