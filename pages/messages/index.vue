<template>
    <div class="flex flex-col gap-5 mx-5">
      <h1 class="text-3xl font-bold text-cyan-500 mx-5">🏤 البريد</h1>
  
      <div
        class="flex flex-grow gap-5 transition-all duration-1000 border border-cyan-500 rounded-xl p-2 shadow-xl">
        <MessagesList class="flex-grow duration-1000 transition-all p-2 w-2/3" />
  
        <!-- <UDivider class="w-5" orientation="vertical" type="dashed" /> -->
      </div>
    </div>
  </template>
  
  <script lang="ts" setup></script>
  
  <style></style>
  