import { mergeAttributes, Node } from '@tiptap/core'
import { VueNodeViewRenderer } from '@tiptap/vue-3'

import Component from '../components/global/test.vue'

export default Node.create({
  name: 'test',

  group: 'block',

  atom: false, // Set to false since it contains nested content

  addAttributes() {
    return {
      header: {
        default: 'Hello', // Default header value
      },
      content: {
        default: 'Hello', // Default content value
      },
    }
  },

  parseHTML() {
    return [
      {
        tag: 'vue-component',
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ['vue-component', mergeAttributes(HTMLAttributes)]
  },

  addNodeView() {
    return VueNodeViewRenderer(Component)
  },
})
