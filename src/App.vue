<template>
  <div class="toolbar">
    <button class="btn" @click="deleteSelection()">删除选区</button>
    <button class="btn" @click="clear()">清除样式</button>
    <button class="btn" @click="setColor()">设置颜色</button>
  </div>

  <div class="prosemirror-editor"></div>
  <div class="content"></div>
</template>

<script>
import { defineComponent, onMounted } from 'vue'

import { EditorState } from 'prosemirror-state'
import { EditorView } from 'prosemirror-view'
import { Schema, DOMParser } from 'prosemirror-model'
import { wrapIn } from 'prosemirror-commands'

import { buildPlugins } from './plugins/index'
import { schemaNodes, schemaMarks } from './schema/index'

export default defineComponent({
  name: 'App',
  setup() {
    let view = null

    const initEditor = () => {
      const mySchema = new Schema({
        nodes: schemaNodes,
        marks: schemaMarks,
      })
      view = new EditorView(document.querySelector('.prosemirror-editor'), {
        state: EditorState.create({
          doc: DOMParser.fromSchema(mySchema).parse(document.querySelector('.content')),
          plugins: buildPlugins(mySchema),
        }),
      })
    }

    const deleteSelection = () => {
      if(view.state.selection.empty) return false
      if(view.dispatch) view.dispatchs(view.state.tr.deleteSelection())
      view.focus()
      return true
    }

    const clear = () => {
      if(view.state.selection.empty) return false
      const { $from, $to } = view.state.selection
      if(view.dispatch) view.dispatch(view.state.tr.removeMark($from.pos, $to.pos, null))
      view.focus()
      return true
    }

    const setColor = () => {
      return true
    }

    onMounted(initEditor)

    return {
      deleteSelection,
      clear,
      setColor,
    }
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