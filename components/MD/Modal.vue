<template>
  <UModal dir="rtl" fullscreen>
    <div class="flex flex-col h-full">
      <MDControls />
      <div class="grid grid-cols-2 p-3 gap-3 grow">
        <MDEditor />
        <MDPreview />
      </div>
    </div>
  </UModal>
</template>

<script lang="ts" setup></script>

<style></style>
