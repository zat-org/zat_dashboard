<template>
  <div class="flex flex-col grow gap-5">
<h1 class="text-2xl font-semibold text-primary ">
  <span class="text-2xl font-bold hover:text-gray-600 duration-300 cursor-pointer" @click="navigateTo('/news')">
    الاخبار
  </span>
  / تعديل الخبر
</h1>
    <NewsAdd :id="(route.params.id as string)"  />
  </div>
  
</template>

<script setup lang='ts'>
const route = useRoute();

</script>

<style></style>
