<template>
  <div class="prosemirror-editor"></div>
  <div class="content"></div>

  <!-- <div class="quill-editor">
    <div>111111111111111111111111111</div>
  </div>

  <div class="menu">
    <button @click="editor.format('font', '宋体')">字体</button>
    <button @click="editor.format('size', 'large')">字号</button>
    <button @click="editor.format('color', 'red')">颜色</button>
    <button @click="editor.format('background', '#eee')">高亮</button>
    <button @click="editor.format('italic', !editor.getFormat().italic)">斜体</button>
    <button @click="editor.format('bold', !editor.getFormat().bold)">加粗</button>
    <button @click="editor.format('underline', !editor.getFormat().underline)">下划线</button>
    <button @click="editor.format('strike', !editor.getFormat().strike)">删除线</button>
    <button @click="editor.format('color', 'red')">有序列表</button>
    <button @click="editor.format('color', 'red')">无序列表</button>
    <button @click="editor.format('script', 'red')">上角标</button>
    <button @click="editor.format('script', 'red')">下角标</button>
    <button @click="editor.format('color', 'red')">行高</button>
    <button @click="editor.format('color', 'red')">字间距</button>
    <button @click="editor.removeFormat(editor.getSelection().index, editor.getSelection().length)">清除格式</button>
  </div> -->
</template>

<script>
import { defineComponent, onMounted, reactive, ref } from 'vue'
// import Quill from 'quill'
// import 'quill/dist/quill.core.css'

import { EditorState } from 'prosemirror-state'
import { EditorView } from 'prosemirror-view'
import { Schema, DOMParser } from 'prosemirror-model'
import { schema } from 'prosemirror-schema-basic'

import { buildPlugins } from './plugins/index'
import { schemaNodes, schemaMarks } from './schema/index'

export default defineComponent({
  name: 'App',
  setup() {
    // const editor = ref(null)

    // onMounted(() => {
    //   editor.value = new Quill('.quill-editor', {
    //     modules: {
    //       toolbar: null,
    //     },
    //   })
    // })

    // return {
    //   editor,
    // }

    const mySchema = ref(null)

    const initEditor = () => {
      mySchema.value = new Schema({
        nodes: schemaNodes,
        marks: schemaMarks,
      })

      new EditorView(document.querySelector('.prosemirror-editor'), {
        state: EditorState.create({
          doc: DOMParser.fromSchema(mySchema.value).parse(document.querySelector('.content')),
          plugins: buildPlugins(mySchema.value),
        }),
      })
    }

    onMounted(initEditor)
  },
})
</script>

<style>
* {
  padding: 0;
  margin: 0;
}
.ProseMirror {
  outline: 0;
  border: 1px solid #888;
  padding: 10px;
}
</style>