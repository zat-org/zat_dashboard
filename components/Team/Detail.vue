<template>
  <UCard>
    <div class="flex flex-col gap-5 grow justify-start">
      <div class="flex gap-10">
        <img :src="team?.logoUrl" class="w-[200px] h-[200px] rounded-3xl" />
        <div class="flex flex-col gap-5">
          <h2 class="text-2xl text-primary font-semibold">{{ team?.name }}</h2>
          <div>
            <UBadge size="lg" :color="team?.isZatTeam ? 'primary' : 'red'">
              {{ team?.isZatTeam ? "ذات" : "فريق حر" }}</UBadge
            >
          </div>
        </div>
      </div>
      <!-- <UDivider label="بيانات الفريق" /> -->
      <UDivider label="الاعبيين" />

      <div class="flex justify-center items-center grow">
        <div class="flex flex-col gap-5 items-center justify-center">
          <VDatePicker v-model="date" :is-dark="true" mode="date">
            <template #default="{ togglePopover }">
              <button
                class="px-3 py-2 bg-cyan-500 text-sm text-black font-semibold rounded-md self-place-center"
                @click="togglePopover">
                {{ (date as Date).toLocaleDateString() }}
              </button>
            </template>
          </VDatePicker>

          <div v-if="team?.lineup" class="flex gap-5">
            <PlayerCard v-for="player in team?.lineup" :player="player" />
          </div>
          <div v-else>no players in team yet</div>
        </div>
      </div>
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
// console.log(props.id)

const toast = useToast();
const modal = useModal();

const date = ref(new Date());
const teamApi = useTeam();
const getREQ = await teamApi.getSingleTeam();
await getREQ.fetchREQ(props.id, date.value);
if (getREQ.status.value == "error") {
  toast.add({ title: "no team with this id " });
  navigateTo("/team");
}
const team = computed(() => {
  return getREQ.data.value?.data.team;
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
watch(date, async (newValue, oldValue) => {
  await getREQ.fetchREQ(props.id, newValue);
  if (getREQ.status.value == "error") {
    toast.add({ title: "no team with this id " });
    navigateTo("/team");
  }
});
</script>

<style></style>
