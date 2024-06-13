<template>
  <div class="flex flex-col gap-5">
    <h1 class="text-primary text-2xl font-semibold">
      تعديل بيانات لاعب  
    </h1>
    <PlayerAdd :id="id" />
  </div>
</template>

<script lang="ts" setup>
const route = useRoute();
const id = route.params.id as string;
</script>

<style></style>
