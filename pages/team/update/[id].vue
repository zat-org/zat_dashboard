<template>
  <div class="flex flex-col gap-`5">
    <h1></h1>
    <TeamAdd :id="id" />
  </div>
</template>

<script lang="ts" setup>
const route = useRoute();
const id = route.params.id as string;
</script>

<style></style>
