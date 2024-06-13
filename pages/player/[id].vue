<template>
  <div class="flex flex-col grow   ">

    <PlayerDetail  :id="id"  />
  </div>
</template>

<script lang="ts" setup>
const route = useRoute();
const id = route.params.id as string
</script>

<style></style>
