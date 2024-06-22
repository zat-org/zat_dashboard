<template>
  <div>
    
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{ id?: string }>();
const editmode = computed(()=>{return !(props.id === undefined)}) 
</script>

<style>

</style>