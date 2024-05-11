<template>
  <NewsDetail :id="route.params.id as string " />
</template>

<script lang="ts" setup>
const route = useRoute();
</script>

<style></style>
