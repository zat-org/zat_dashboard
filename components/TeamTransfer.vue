<template>
  <UForm
    ref="transferForm"
    @submit="onTransferSubmit"
    :state="transfer_state"
    :schema="transfer_schema"
    class="flex flex-col gap-3">
    <div class="flex gap-3">
      <UFormGroup label="من" name="fromTeamId" class="w-1/2">
        <USelectMenu
          v-model="transfer_state.fromTeamId"
          :options="from_teams"
          value-attribute="id"
          option-attribute="name"
          searchable
          searchable-placeholder="Search a team..."
          disabled />
        <!-- :loading="allTeamREQ.pending.value || getREQ.status.value == 'pending'"  -->
      </UFormGroup>

      <UFormGroup label="الي" name="toTeamId" class="w-1/2">
        <USelectMenu
          v-model="transfer_state.toTeamId"
          :options="to_teams"
          value-attribute="id"
          option-attribute="name"
          searchable
          searchable-placeholder="Search a team..."
          :loading="allTeamREQ.pending.value" />
      </UFormGroup>
    </div>
    <UFormGroup label="في تاريخ" name="on">
      <VDatePicker
        dir="rtl"
        v-model="transfer_state.on"
        :masks="masks"
        mode="date"
        locale="ar"
        :disabled-dates="disabled_dates"
        :is-dark="true">
      </VDatePicker>
    </UFormGroup>
    <div>
      <UButton type="submit" :loading="moveReq.status.value == 'pending'"
        >save transfer</UButton
      >
    </div>
  </UForm>
</template>

<script lang="ts" setup>
import { object, number, string, type InferType, date } from "yup";
import type { IMove } from "~/models/move";
import type { IPlayer } from "~/models/player";
const props = defineProps<{ player: IPlayer }>();
const toast = useToast();
const modal = useModal();
const masks = ref({
  modelValue: "YYYY-MM-DD",
});

const playerHistory = await usePlayer().getPlayerHistory(props.player.id);
const disabled_dates = playerHistory.getmovesdate();

const transfer_schema = object({
  playerId: string().required(),
  fromTeamId: string().notRequired(),
  toTeamId: string().notRequired(),
  on: string().required(),
});

const transfer_state = reactive<IMove>({
  playerId: props.player.id,
  fromTeamId: props.player.team?.id || "",
  toTeamId: "",
  on: new Date(),
});
// const playerApi = usePlayer();
const gamePersonApi = useGameperson();
const getREQ = await gamePersonApi.getGamePersonByID();
await getREQ.fetchREQ(props.player.id, (transfer_state.on as Date)!);

watch(transfer_state, async (new_state, old_state) => {
  if (new_state.on) {
    await getREQ.fetchREQ(transfer_state.playerId, (new_state.on as Date)!);
    if (getREQ.status.value == "success") {
      if (getREQ.data.value?.data.team) {
        transfer_state.fromTeamId = getREQ.data.value?.data.team.id;
      } else {
        transfer_state.fromTeamId = "";
      }
    }
  }
});

const transferForm = ref();
const transferApi = useMove();
const moveReq = await transferApi.makeMove();
const onTransferSubmit = async () => {
  if (transfer_state.fromTeamId || transfer_state.toTeamId) {
    await moveReq.fetchREQ(transfer_state);
    if (moveReq.status.value == "success") {
      toast.add({ title: "تم عملية الانتقال بنجاح" });
      modal.close();
    } else if (moveReq.status.value == "error") {
      toast.add({ title: "فشلة عملية النتقال" });
    }
    // console.log(transfer_state);
  } else {
    transferForm.value.setErrors([
      { path: "fromTeamId", message: "select any team in from or to" },
      { path: "toTeamId", message: "select any team in from or to" },
    ]);
  }
};

const teamApi = useTeam();
const allTeamREQ = await teamApi.getAllTeamsTransfer();

const from_teams = computed(() => {
  allTeamREQ.data.value?.data.push({ id: "", name: "free player" });
  return allTeamREQ.data.value?.data;
});
const to_teams = computed(() => {
  if (transfer_state.fromTeamId == transfer_state.toTeamId) {
    transfer_state.toTeamId = "";
  }
  return allTeamREQ.data.value?.data.filter((t) => {
    return t?.id !== transfer_state.fromTeamId;
  });
});
</script>

<style></style>
