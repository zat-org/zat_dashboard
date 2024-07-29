<template>
  <div class="flex flex-col gap-5 grow ">
    <!-- <h1 class="text-3xl text-primary font-bold"> officiant </h1> -->
    <OfficiantDetail :id="route.params.id as string" />
  </div>
</template>

<script lang="ts" setup>
const route = useRoute();
</script>

<style>

</style>