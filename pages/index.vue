<template>
  <div class="h-full">
    <Main_unauth  />
   
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/store/auth';

const authStore = useAuthStore()


</script>

<style scoped></style>
