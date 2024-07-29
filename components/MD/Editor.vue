<template>
  <textarea
    ref="textarea"
    spellcheck="false"
    class="w-full h-full resize-none pr-4 pt-2 outline-none rounded-xl border border-primary"
    @input="setCursorPosition"
    @click="setCursorPosition"
    @change="setCursorPosition"
    v-model="mdStore.MDTEXT">
  </textarea>
</template>

<script lang="ts" setup>
import { useMyMDStore } from "~/store/MD";
const mdStore = useMyMDStore();
// const emit = defineEmits<(e:"cursor-change",position:number)=>void>()
let textarea = ref<HTMLTextAreaElement>();
const setCursorPosition = () => {
  if (textarea.value) {
    let position = textarea.value.selectionStart;
    mdStore.set_cursor_position(position);
  }
};
</script>

<style></style>
