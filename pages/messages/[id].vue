<template>
   
<MessageData :id="String(id)"/>
   
</template>

<script setup lang="ts">
const route  =useRoute()
const id = route.params.id

</script>

<style scoped>

</style>