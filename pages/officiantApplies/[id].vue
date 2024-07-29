<template>
  <div class="grow flex flex-col gap-5">
    <h1 class="text-3xl text-primary font-semibold hover:text-gray-500  duration-300  "@click="navigateTo('/officiant')">  طلبات الحكام</h1>
    <OfficiantAppliesDetail :id='(route.params.id) as string' />
  </div>
</template>

<script lang="ts" setup>
const route = useRoute();
</script>

<style></style>
