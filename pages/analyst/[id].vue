<template>
  <div class="flex flex-col gap-5">
    <AnalystDetail :id="route.params.id as string" />
  </div>
</template>

<script lang="ts" setup>
const route = useRoute();
</script>

<style></style>
