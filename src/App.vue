<template>
  <div class="prosemirror-editor"></div>
  <div class="content"></div>

  <div>需要的功能：
    <div>字体</div>
    <div>字号</div>
    <div>颜色</div>
    <div>高亮</div>
    <div>斜体</div>
    <div>加粗</div>
    <div>下划线</div>
    <div>删除线</div>
    <div>有序列表</div>
    <div>无序列表</div>
    <div>上角标</div>
    <div>下角标</div>
    <div>行高</div>
    <div>字间距</div>
    <div>清除格式</div>
  </div>
</template>

<script>
import { defineComponent, onMounted, reactive } from 'vue'

import { EditorState } from 'prosemirror-state'
import { EditorView } from 'prosemirror-view'
import { Schema, DOMParser } from 'prosemirror-model'
import { schema } from 'prosemirror-schema-basic'

import { buildPlugins } from './plugins/index'
import { schemaNodes, schemaMarks } from './schema/index'

export default defineComponent({
  name: 'App',
  setup() {
    const initEditor = () => {
      const mySchema = new Schema({
        nodes: schemaNodes,
        marks: schemaMarks,
      })

      new EditorView(document.querySelector('.prosemirror-editor'), {
        state: EditorState.create({
          doc: DOMParser.fromSchema(mySchema).parse(document.querySelector('.content')),
          plugins: buildPlugins(mySchema),
        }),
      })
    }

    onMounted(() => {
      initEditor()
    })
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