<template>
  <div
    v-if="player?.role == null || player.team == null"
    class="flex flex-col items-ccenter gap-5">
    <p>this player should join to team first to make role transfer</p>
    <UFormGroup label="في تاريخ" name="on">
      <VDatePicker
        dir="rtl"
        v-model="role_state.on"
        :masks="masks"
        mode="date"
        locale="ar"
        :is-dark="true">
      </VDatePicker>
    </UFormGroup>
  </div>
  <UForm :state="role_state" :schema="role_schema" @submit="onSubmit" v-else>
    <div>team : {{ player?.team ? player?.team.name : "free player" }}</div>
    <!-- from disabled -->
    <div class="flex gap-3">
      <UFormGroup class="w-1/2">
        <USelectMenu
          v-model="fromSelectedRole"
          by="id"
          :options="from_role"
          value-attribute="id"
          option-attribute="name"
          disabled></USelectMenu>
      </UFormGroup>
      <UFormGroup class="w-1/2">
        <USelectMenu
          v-model="role_state.playerRole"
          :options="to_role"
          value-attribute="id"
          option-attribute="name"></USelectMenu>
      </UFormGroup>
    </div>
    <!-- to  -->
    <UFormGroup label="في تاريخ" name="on">
      <VDatePicker
        dir="rtl"
        v-model="role_state.on"
        :masks="masks"
        mode="date"
        locale="ar"
        :is-dark="true">
      </VDatePicker>
    </UFormGroup>
    <UButton type="submit">add</UButton>
  </UForm>
</template>

<script lang="ts" setup>
import { object, number, string, type InferType, date } from "yup";
import { roleTransation, type IMove } from "~/models/move";
import type { IPlayer } from "~/models/player";
const props = defineProps<{ player: IPlayer }>();
const toast = useToast();
const modal = useModal();
const fromSelectedRole = ref<number | null>(props.player?.role);
const roles = roleTransation;
const rolesOptions = Object.keys(roles)
  .filter((key) => isNaN(Number(key)))
  .map((key) => {
    return { name: key, id: roles[key as keyof typeof roles] };
  });

const from_role = computed(() => {
  return rolesOptions;
});
const to_role = computed(() => {
  return from_role.value.filter((r) => {
    return r.id !== fromSelectedRole.value;
  });
});
const masks = ref({
  modelValue: "YYYY-MM-DD",
});

const role_schema = object({
  playerId: string().required(),
  on: date().required(),
  playerRole: number(),
});
const role_state = reactive<IMove>({
  playerId: props.player.id,
  playerRole: null,
  on: new Date(),
  fromTeamId: props.player.team ? props.player.team.id : null,
  toTeamId: props.player.team ? props.player.team.id : null,
});
// const playerApi = usePlayer();
const gamePersonApi = useGameperson();

const getREQ = await gamePersonApi.getGamePersonByID();
await getREQ.fetchREQ(props.player.id, (role_state.on as Date)!);
const player = computed(() => {
  return getREQ.status.value == "success" ? getREQ.data.value?.data : null;
});
watch(role_state, async (new_state, old_state) => {
  if (new_state.on) {
    await getREQ.fetchREQ(props.player.id, (new_state.on as Date)!);
    if (getREQ.status.value == "success") {
      fromSelectedRole.value = getREQ.data.value?.data.role!;
    }
  }
});
const moveApi = useMove();
const moveREQ = await moveApi.makeMove();
const onSubmit = async () => {
  await moveREQ.fetchREQ(role_state);
  if (moveREQ.status.value == "success") {
    toast.add({ title: "movemnt done " });
    modal.close();
  } else if (moveREQ.status.value == "error") {
    toast.add({ title: "movemt error" });
  }
};
</script>

<style></style>
