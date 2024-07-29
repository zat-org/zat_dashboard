<template>
  <div
    class="prose prose-stone dark:prose-invert rounded-xl border border-primary p-2">
    <MDC :value="mdStore.MDTEXT" />
  </div>
</template>

<script lang="ts" setup>
import { useMyMDStore } from "~/store/MD";
// const { $mdRenderer } = useNuxtApp()
const mdStore = useMyMDStore();

// let { data } = await useAsyncData("markdown", () =>
//   parseMarkdown(mdStore.MDTEXT)
// );

// watch(mdStore, async (new_value, old_value) => {
//   let { data: ast } = await useAsyncData("markdown", () =>
//     parseMarkdown(new_value.MDTEXT)
//   );
//   data = ast;
// });
</script>

<style></style>
