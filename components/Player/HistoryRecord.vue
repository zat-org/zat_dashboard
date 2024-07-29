<template>
  <div class="flex gap-5 items-center text-sm">
    <div
      class="flex flex-col items-center justify-center gap-3 px-4 py-2 border border-primary rounded-lg duration-300 hover:bg-primary/55 font-bold w-1/3 text-center">
      <UAvatar size="lg" v-if="move.from" :src="move.from.logoUrl" />
      <p>
        {{ move.from ? move.from.name : "free player" }}
      </p>
    </div>
    <div class="flex flex-col items-center gap-3 w-1/3">
      <div class="flex gap-3">
        <p>{{ new Date(move.on).toLocaleDateString() }}</p>
        <p>{{ roles[move.role] }}</p>
      </div>
      <UDivider />
      <UButton
        icon="i-heroicons-x-mark-16-solid"
        size="2xs"
        color="red"
        @click="deleteMove" />
    </div>
    <div
      class="flex flex-col items-center justify-center gap-3 px-4 py-2 border border-primary rounded-lg duration-300 hover:bg-primary/55 font-bold w-1/3 text-center">
      <UAvatar size="lg" v-if="move.to" :src="move.to.logoUrl" />

      <p class="">
        {{ move.to ? move.to.name : "free player" }}
      </p>
    </div>
``
    <!-- to  -->

    <!-- date  -->
  </div>
</template>

<script lang="ts" setup>
import { roleTransation } from "~/models/move";
import type { PlayerMoves } from "~/models/player";
import ConfirmationDialog from "../ConfirmationDialog.vue";
const props = defineProps<{ move: PlayerMoves }>();
const roles = roleTransation;
const modal = useModal();
const deleteMoveREQ = await useMove().deleteMove();
const deleteMove = () => {
  modal.open(ConfirmationDialog, {
    message: "you sure delete this move ",
    async onSuccess() {
      await deleteMoveREQ.fetchREQ(props.move.player.id, props.move.id);
    },
  });
};
</script>

<style></style>
