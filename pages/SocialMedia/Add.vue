<template>
  <div class="flex flex-col gap-5">
    <h1 class="text-primary text-2xl font-semibold">
    {{ !editMode ? "اضافة رابط سوشيل ميديا" :"تعديل رابط سوشيل ميديا" }}
    </h1>
    <SocialMediaAdd :editMode="editMode" />
  </div>
</template>

<script lang="ts" setup>
import { useMySocialmediaStore } from "~/store/socialmedia";

const SMStore = useMySocialmediaStore();
const editMode = computed(() => {
  console.log(SMStore.S_SM.id ? true : false);
  return SMStore.S_SM.id ? true : false;
});
</script>

<style></style>
