<template>
  <div
    dir="rtl"
    class="h-dvh w-full flex flex-col page dark:bg-[#121212] dark">
    <Nav />
    <UContainer class="w-[90%] h-full grow pb-5">
      <!-- <div > -->
      <div class="flex grow h-full w-full">
        <SideBar v-if="authStore.isauth" />
        <NuxtPage class="h-full w-full" />
      </div>
      <UNotifications />
      <UModals />
      <!-- </div> -->
    </UContainer>
  </div>
</template>
<script setup lang="ts">
import { useAuthStore } from "./store/auth";

const authStore = useAuthStore();
const colorMode = useColorMode();
colorMode.preference = "dark";
</script>
<style>
.page::before {
  z-index: -1;
  content: "";
  background: url("https://yt3.ggpht.com/qfGFza3MgzGnQmjMXBS23izLnXOM7J3k_I32JUtA52_dfgqTDlBtlYKZ8FB2BEAH4Llzm-soCQ=s176-c-k-c0x00ffffff-no-rj-mo")
    no-repeat center;
  opacity: 0.2;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
</style>
