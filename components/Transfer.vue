<template>
  <UModal dir="rtl">
    <UCard>
      <UTabs :items="items" class="w-full">
        <template #transfer="item">
          <TeamTransfer :player="player" />
        </template>

        <template #role="item">
        <RoleTransfer :player="player" />
        </template>
      </UTabs>

    </UCard>
  </UModal>
</template>

<script lang="ts" setup>
const props = defineProps<{ player: ITPlayer }>();
import { object, number, string, type InferType, date } from "yup";
import type { IMove } from "~/models/move";
import type { ITPlayer } from "~/models/player";

const masks = ref({
  modelValue: "YYYY-MM-DD",
});
const toast = useToast();
const modal = useModal();
const items = [
  {
    slot: "transfer",
    label: "انتقال",
  },
  {
    slot: "role",
    label: "الفئة",
  },
];


</script>

<style></style>
