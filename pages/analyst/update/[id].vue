<template>
  <div class="flex flex-col gap-5">
    <h1>edit Analyst</h1>
    <AnalystAdd :id="route.params.id as string  " />
  </div>
</template>

<script lang="ts" setup>
const route = useRoute();
</script>

<style></style>
