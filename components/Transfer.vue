<template>
  <UModal dir="rtl">
    <UCard>
      <UTabs :items="items" class="w-full">
        <template #transfer="item">
          <UForm
            ref="transferForm"
            @submit="onTransferSubmit"
            :state="transfer_state"
            :schema="transfer_schema"
            class="flex flex-col gap-3">
            <div class="flex gap-3">
              <UFormGroup label="from" name="fromTeamId" class="grow">
                <USelectMenu
                  v-model="transfer_state.fromTeamId"
                  :options="from_teams"
                  value-attribute="id"
                  option-attribute="name"
                  searchable
                  searchable-placeholder="Search a team..."
                  :loading="allTeamREQ.pending.value" />
              </UFormGroup>
              <UFormGroup label="to" name="toTeamId" class="grow">
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
            <UFormGroup label="on" name="on">
              <!-- <UInput type="date" v-model.string="transfer_state.on" /> -->
              
                <DatePicker v-model.string="transfer_state.on" />
            </UFormGroup>
            <div>
              <UButton type="submit">save transfer</UButton>
            </div>
          </UForm>
        </template>

        <template #role="{ item }">
          <UForm :state="role_state" :schema="role_schema">
            <UFormGroup label="playerRole" name="playerRole">
              <USelectMenu v-model="role_state.playerRole" />
            </UFormGroup>
          </UForm>
          <UFormGroup label="on" name="on">
            <!-- <VDatePicker
              :attributes="attrs"
              :is-dark="true"
              v-model.string="role_state.on"
              mode="date" /> -->
            <UInput type="date" v-model.string="transfer_state.on" />
          </UFormGroup>
        </template>
      </UTabs>

      <!-- <UInput    type="date" v-model.string="state.on"/> -->
    </UCard>
  </UModal>
</template>

<script lang="ts" setup>
const props = defineProps<{ player: ITPlayer }>();
import { object, number, string, type InferType } from "yup";
import type { IMove } from "~/models/move";
import type { ITPlayer } from "~/models/player";
import { useMyTeamStore } from "~/store/team";
const items = [
  {
    slot: "transfer",
    label: "transfer",
  },
  {
    slot: "role",
    label: "role",
  },
];
const transfer_schema = object({
  playerId: string().required(),
  fromTeamId: string().notRequired(),
  toTeamId: string().notRequired(),
  on: string().notRequired(),
});

const transfer_state = reactive<IMove>({
  playerId: props.player.id,
  fromTeamId: props.player.team,
  toTeamId: null,
  on: null,
});
const transferForm = ref();
const onTransferSubmit = () => {
  if (transfer_state.fromTeamId || transfer_state.toTeamId) {
    console.log(transfer_state);
  } else {
    transferForm.value.setErrors([
      { path: "fromTeamId", message: "select any team in from or to" },
      { path: "toTeamId", message: "select any team in from or to" },
    ]);
  }
};

const role_schema = object({
  playerId: string().required(),
  on: string(),
  playerRole: number(),
});

const role_state = reactive<IMove>({
  playerId: props.player.id,
  playerRole: null,
});

const teamApi = useTeam();
const allTeamREQ = await teamApi.getAllTeams();
// const teamStore = useMyTeamStore()
const from_teams = computed(() => {
  return allTeamREQ.data.value?.data;
});

const to_teams = computed(() => {
  // console.log(transfer_state.fromTeamId)
  if (!transfer_state.fromTeamId) {
    return allTeamREQ.data.value?.data;
  } else {
    // console.log("hello")
    return allTeamREQ.data.value?.data.filter((t) => {
      return t?.id !== transfer_state.fromTeamId;
    });
  }
});
// console.log(teams.value);
</script>

<style></style>
