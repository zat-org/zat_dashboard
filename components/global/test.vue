<template>
  <node-view-wrapper class="accordion-header">
     <div contenteditable="true" @input="updateContent" ref="content">
      <h1 contenteditable="true" @input="updateHeader" ref="header">{{ header }}</h1>
      <p contenteditable="true" @input="updateContent" ref="content">{{ content }}</p>
    </div>
  </node-view-wrapper>
</template>

<script setup lang="ts">
import { NodeViewWrapper, type NodeViewProps } from '@tiptap/vue-3'
import { ref } from 'vue'

const props = defineProps<NodeViewProps>()

const header = ref(props.node.attrs.header || '')
const content = ref(props.node.attrs.content || '')

const updateHeader = () => {
  props.updateAttributes({ header: header.value.innertext })
}

const updateContent = () => {
  props.updateAttributes({ content: content.value.innerHTML })
}
</script>

<style scoped>

</style>
