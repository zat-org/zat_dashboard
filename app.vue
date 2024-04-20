<template>
  <div dir="rtl" class="h-[100dvh] w-full flex flex-col page">
    <Nav />
    <div class="flex h-full w-full ">
      <SideBar v-if="authStore.isauth" />
      
        <NuxtPage class="grow" />
      
      </div>
      <UNotifications />
      <UModals/>
    </div>
</template>
<script setup lang="ts">
import { useAuthStore } from "./store/auth";

const authStore = useAuthStore();
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
