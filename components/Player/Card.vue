<template>
  <div
    class="flex flex-col justify-center items-center gap-2 border border-primary p-4 rounded-xl">
    <!-- <UAvatar  size="xl" :src="player.imageUrl" /> -->
    <img :src="player.imageUrl as string" class="w-[100px] h-[100px] rounded-xl" />
    <div class="flex flex-col gap-2 items-center">
      <h2 class="text-primary font-semibold text-xl">{{ player.name }}</h2>
      <UBadge :label="player_role" size="lg" />
    </div>
    <div class="flex gap-3 wrap">
      <UButton
        v-for="socialL in player.socialMedia"
        target="_blank"
        :to="socialL.url"
        :icon="socialL.icon"
        class="text-2xl">
      </UButton>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { type Player, playerRole } from "~/models/player";
const rolesOptions = playerRole;
const props = defineProps<{ player: Player }>();
const player_role = computed(() => {
  return rolesOptions[props.player.role];
});
</script>

<style></style>
