<template>
  <div class="flex gap-2 py-2 overflow-auto dark:bg-gray-900">
    <UButton
      icon="i-mdi-format-bold"
      class="rounded dark:hover:bg-green-400"
      @click="onClick(TAGS.BOLD)">
    </UButton>
    <UButton
      icon="i-mdi-format-italic"
      class="rounded dark:hover:bg-green-400"
      @click="onClick(TAGS.ITALIC)">
    </UButton>
    <UButton
      icon="i-mdi-format-header-1"
      class="rounded dark:hover:bg-green-400"
      @click="onClick(TAGS.H1)">
    </UButton>
    <UButton
      icon="i-mdi-format-header-2"
      class="rounded dark:hover:bg-green-400"
      @click="onClick(TAGS.H2)">
    </UButton>
    <UButton
      icon="i-mdi-format-header-3"
      class="rounded dark:hover:bg-green-400"
      @click="onClick(TAGS.H3)">
    </UButton>
    <UButton
      icon="i-mdi-format-header-4"
      class="rounded dark:hover:bg-green-400"
      @click="onClick(TAGS.H4)">
    </UButton>
    <UButton
      icon="i-mdi-format-header-5"
      class="rounded dark:hover:bg-green-400"
      @click="onClick(TAGS.H5)">
    </UButton>
    <UButton
      icon="i-mdi-format-header-6"
      class="rounded dark:hover:bg-green-400"
      @click="onClick(TAGS.H6)">
    </UButton>
    <UButton
      @click="onClick(TAGS.UNDERLINE)"
      icon="i-mdi-format-underline"
      class="rounded dark:hover:bg-green-400">
    </UButton>

    <UButton
      @click="onClick(TAGS.STRIKETHROUGH)"
      icon="i-mdi-format-strikethrough-variant"
      class="rounded dark:hover:bg-green-400">
    </UButton>
    <UButton
      @click="onClick(TAGS.HIGHLIGHT)"
      icon="i-mdi-bookmark"
      class="rounded dark:hover:bg-green-400">
    </UButton>

    <UButton
      icon="i-mdi-format-subscript"
      @click="onClick(TAGS.SUBSCRIPT)"
      class="rounded dark:hover:bg-green-400">
    </UButton>
    <UButton
      @click="onClick(TAGS.SUPERSCRIPT)"
      icon="i-mdi-format-superscript"
      class="rounded dark:hover:bg-green-400">
    </UButton>
    <UButton
      @click="onClick(TAGS.BLOCKQUOTE)"
      icon="i-mdi-format-quote-open"
      class="rounded dark:hover:bg-green-400">
    </UButton>
    <UButton
      @click="onClick(TAGS.LINK)"
      icon="i-mdi-link-variant"
      class="rounded dark:hover:bg-green-400">
    </UButton>
    <UButton
      @click="onClick(TAGS.IMAGE)"
      icon="i-mdi-file-image-outline"
      class="rounded dark:hover:bg-green-400">
    </UButton>
    <UButton
      @click="onClick(TAGS.FENCED_CODE_BLOCK)"
      icon="i-mdi-xml"
      class="rounded dark:hover:bg-green-400">
    </UButton>
    <UButton
      @click="onClick(TAGS.TABLE)"
      icon="i-mdi-table-large"
      class="rounded dark:hover:bg-green-400">
    </UButton>
    <UButton
      @click="onClick(TAGS.TEST)"
      icon="grommet-icons:test"
      class="rounded dark:hover:bg-green-400">
    </UButton>
    <UButton
      @click="onClick(TAGS.ACCORDION)"
      icon="twemoji:accordion"
      class="rounded dark:hover:bg-green-400">
    </UButton>
    <!-- <UButton
      class="  rounded dark:hover:bg-green-400 ml-auto"
      @click="markdown = markdownInfo"
    >
      <i-mdi-information-variant-circle-outline
        class="text-xl text-gray-500 dark:text-white"
      />
    </UButton>

    <UButton
      class="  rounded dark:hover:bg-green-400"
      @click="markdown = ''"
    >
      <i-mdi-delete-outline class="text-xl text-gray-500 dark:text-white" />
    </UButton> -->
  </div>
</template>

<script lang="ts" setup>
import { useTextSelection } from "@vueuse/core";
import { TAGS } from "~/models/MD";
import { useMyMDStore } from "~/store/MD";
let { text } = useTextSelection();
const mdStore = useMyMDStore()
const MDUtility = useMD()

const onClick = (tag: TAGS) => {
  if (text.value && mdStore.MDTEXT.includes(text.value)){
   if (TAGS_MAP[tag].add)return ;   
  mdStore.MDTEXT =MDUtility.replaceHighlightText(tag ,text.value ) 
  }else{
  mdStore.MDTEXT =MDUtility.addTag(tag)
  }
};
</script>

<style></style>
