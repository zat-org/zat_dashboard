<template>
  <div>
    <header class="card-header">
      <slot name="header">Default Header</slot>
    </header>
    Hello   {{ name }}

    <UIcon v-if="icon" :name="icon" />
    <footer class="card-footer">
      <slot name="footer">Default Footer</slot>
    </footer>
  </div>
</template>

<script setup lang="ts">
defineProps<{name?:string,icon?:string}>()

</script>

<style scoped>

</style>
