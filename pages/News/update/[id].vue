<template>
  <div class="flex flex-col grow ">

    <NewsAdd :id="(route.params.id as string)"  />
  </div>
  
</template>

<script setup lang='ts'>
const route = useRoute();
</script>

<style></style>
