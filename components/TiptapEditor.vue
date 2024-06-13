<template>
  <div>
    <div v-if="editor" class="flex gap-3">
      <button
        type="button"
        @click="editor.chain().focus().toggleBold().run()"
        :disabled="!editor.can().chain().focus().toggleBold().run()"
        :class="{ 'is-active': editor.isActive('bold') }">
        bold
      </button>
      <button
        type="button"
        @click="editor.chain().focus().toggleItalic().run()"
        :disabled="!editor.can().chain().focus().toggleItalic().run()"
        :class="{ 'is-active': editor.isActive('italic') }">
        italic
      </button>
      <button
        type="button"
        @click="editor.chain().focus().toggleStrike().run()"
        :disabled="!editor.can().chain().focus().toggleStrike().run()"
        :class="{ 'is-active': editor.isActive('strike') }">
        strike
      </button>
      <button
        type="button"
        @click="editor.chain().focus().toggleCode().run()"
        :disabled="!editor.can().chain().focus().toggleCode().run()"
        :class="{ 'is-active': editor.isActive('code') }">
        code
      </button>
      <button
        type="button"
        @click="editor.chain().focus().unsetAllMarks().run()">
        clear marks
      </button>
      <button type="button" @click="editor.chain().focus().clearNodes().run()">
        clear nodes
      </button>
      <button
        type="button"
        @click="editor.chain().focus().setParagraph().run()"
        :class="{ 'is-active': editor.isActive('paragraph') }">
        paragraph
      </button>
      <button
        type="button"
        @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
        :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }">
        h1
      </button>
      <button
        type="button"
        @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
        :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }">
        h2
      </button>
      <button
        type="button"
        @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
        :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }">
        h3
      </button>
      <button
        type="button"
        @click="editor.chain().focus().toggleHeading({ level: 4 }).run()"
        :class="{ 'is-active': editor.isActive('heading', { level: 4 }) }">
        h4
      </button>
      <button
        type="button"
        @click="editor.chain().focus().toggleHeading({ level: 5 }).run()"
        :class="{ 'is-active': editor.isActive('heading', { level: 5 }) }">
        h5
      </button>
      <button
        type="button"
        @click="editor.chain().focus().toggleHeading({ level: 6 }).run()"
        :class="{ 'is-active': editor.isActive('heading', { level: 6 }) }">
        h6
      </button>
      <button
        type="button"
        @click="editor.chain().focus().toggleBulletList().run()"
        :class="{ 'is-active': editor.isActive('bulletList') }">
        bullet list
      </button>
      <button
        type="button"
        @click="editor.chain().focus().toggleOrderedList().run()"
        :class="{ 'is-active': editor.isActive('orderedList') }">
        ordered list
      </button>
      <button
        type="button"
        @click="editor.chain().focus().toggleCodeBlock().run()"
        :class="{ 'is-active': editor.isActive('codeBlock') }">
        code block
      </button>
      <button
        type="button"
        @click="editor.chain().focus().toggleBlockquote().run()"
        :class="{ 'is-active': editor.isActive('blockquote') }">
        blockquote
      </button>
      <button
        type="button"
        @click=" editor.chain().focus().insertContent({
        type: 'test',
      }).run()">
        horizontal rule
      </button>
      <button
        type="button"
        @click="editor.chain().focus().setHardBreak().run()">
        hard break
      </button>
      <button
        type="button"
        @click="editor.chain().focus().undo().run()"
        :disabled="!editor.can().chain().focus().undo().run()">
        undo
      </button>
      <button
        type="button"
        @click="editor.chain().focus().redo().run()"
        :disabled="!editor.can().chain().focus().redo().run()">
        redo
      </button>
    </div>

    <editor-content :editor="editor" />
  </div>
</template>

<script setup>
import StarterKit from "@tiptap/starter-kit";
import test from'../extensions/test.ts'
import { Editor, EditorContent } from "@tiptap/vue-3";
const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
});
const emit = defineEmits(["update:modelValue"]);

// Watch: modelValue prop
// watch(
//   () => props.modelValue,
//   (newValue) => {
//     // Compare HTML content
//     const isSame = editor.value.getHTML() === newValue;

//     // Compare JSON content
//     // const isSame = JSON.stringify(editor.value.getJSON()) === JSON.stringify(newValue)

//     if (!isSame) {
//       editor.value.commands.setContent(newValue, false);
//     }
//   }
// );
// const editor = new Editor({
//   extensions: [
//     StarterKit,
//   ],
//   editorProps: {
//     attributes: {
//       class: 'prose dark:prose-invert prose-sm sm:prose-base lg:prose-lg xl:prose-2xl m-5 focus:outline-none',
//     },
//   },

// })
const editor = useEditor({
  editorProps: {
    attributes: {
      class:
        "prose dark:prose-invert prose-sm sm:prose-base lg:prose-lg xl:prose-2xl m-5 focus:outline-none",
    },
  },
  content: ` 
        <vue-component ></vue-component>
        `,
  extensions: [TiptapStarterKit, test ,],
  onUpdate: () => {
    // Emit HTML content
    emit("update:modelValue", editor.value.getHTML());
  },
});
// const onChange = () => {
//   console.log(editor.getHTML());
//   // emit('update:modelValue', editor.getHTML())
//   model.value = editor.getHTML();
// };
</script>
