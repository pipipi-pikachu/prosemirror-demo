<template>
  <div class="toolbar">
    <button class="btn" @click="setBold()">加粗</button>
    <button class="btn" @click="setItalics()">斜体</button>
    <button class="btn" @click="setUnderline()">下划线</button>
    <button class="btn" @click="setStrikeThrough()">删除线</button>
    <button class="btn" @click="setSubscript()">下标</button>
    <button class="btn" @click="setSuperscript()">上标</button>
    <button class="btn" @click="setForecolor()">颜色</button>
    <button class="btn" @click="setBackcolor()">高亮</button>
    <button class="btn" @click="setFontsize()">字号</button>
    <button class="btn" @click="setFontname()">字体</button>
    <button class="btn" @click="setLineheight()">行高</button>
    <button class="btn" @click="setLetterspacing()">字间距</button>
    <button class="btn" @click="setBulletList()">无序列表</button>
    <button class="btn" @click="setOrderedList()">有序列表</button>
    <button class="btn" @click="setBlockquote()">引用块</button>
    <button class="btn" @click="setCode()">行内代码</button>
    <button class="btn" @click="setTextAlignRight()">右对齐</button>
    <button class="btn" @click="clear()">清除样式</button>
  </div>

  <div class="prosemirror-editor"></div>
</template>

<script>
import { defineComponent, onMounted } from 'vue'

import { EditorState } from 'prosemirror-state'
import { EditorView } from 'prosemirror-view'
import { Schema, DOMParser } from 'prosemirror-model'
import { wrapIn, toggleMark, setBlockType } from 'prosemirror-commands'
import { wrapInList } from 'prosemirror-schema-list'

import { toggleList } from './commands/toggleList'
import { toggleBlockType } from './commands/toggleBlockType'
import { updateMark } from './commands/updateMark'

import { buildPlugins } from './plugins/index'
import { schemaNodes, schemaMarks } from './schema/index'

const mySchema = new Schema({
  nodes: schemaNodes,
  marks: schemaMarks,
})

const createDocument = content => {
  const htmlString = `<div>${content}</div>`
  const parser = new window.DOMParser()
  const element = parser.parseFromString(htmlString, 'text/html').body.firstElementChild
  return DOMParser.fromSchema(mySchema).parse(element)
}

export default defineComponent({
  name: 'App',
  setup() {
    let view = null

    const initEditor = () => {
      view = new EditorView(document.querySelector('.prosemirror-editor'), {
        state: EditorState.create({
          doc: createDocument('99999999999999999999999999999'),
          plugins: buildPlugins(mySchema),
        }),
      })
    }

    const clear = () => {
      if(view.state.selection.empty) return false
      const { $from, $to } = view.state.selection
      view.dispatch(view.state.tr.removeMark($from.pos, $to.pos, null))
      view.focus()
      return true
    }

    const setForecolor = () => {
      const mark = view.state.schema.marks.forecolor.create({ color: 'red' })
      const { $from, $to } = view.state.selection
      view.dispatch(view.state.tr.addMark($from.pos, $to.pos, mark))
      view.focus()
      return true
    }

    const setBackcolor = () => {
      const mark = view.state.schema.marks.backcolor.create({ backcolor: 'yellow' })
      const { $from, $to } = view.state.selection
      view.dispatch(view.state.tr.addMark($from.pos, $to.pos, mark))
      view.focus()
      return true
    }

    const setFontsize = () => {
      const mark = view.state.schema.marks.fontsize.create({ fontsize: '22px' })
      const { $from, $to } = view.state.selection
      view.dispatch(view.state.tr.addMark($from.pos, $to.pos, mark))
      view.focus()
      return true
    }

    const setFontname = () => {
      const mark = view.state.schema.marks.fontname.create({ fontname: '宋体' })
      const { $from, $to } = view.state.selection
      view.dispatch(view.state.tr.addMark($from.pos, $to.pos, mark))
      view.focus()
      return true
    }

    const setLineheight = () => {
      const mark = view.state.schema.marks.lineheight.create({ lineheight: 1.8 })
      const { $from, $to } = view.state.selection
      view.dispatch(view.state.tr.addMark($from.pos, $to.pos, mark))
      view.focus()
      return true
    }

    const setLetterspacing = () => {
      const mark = view.state.schema.marks.letterspacing.create({ letterspacing: '5px' })
      const { $from, $to } = view.state.selection
      view.dispatch(view.state.tr.addMark($from.pos, $to.pos, mark))
      view.focus()
      return true
    }

    const setBold = () => {
      toggleMark(view.state.schema.marks.strong)(view.state, view.dispatch)
      view.focus()
      return true
    }

    const setItalics = () => {
      toggleMark(view.state.schema.marks.em)(view.state, view.dispatch)
      view.focus()
      return true
    }

    const setUnderline = () => {
      toggleMark(view.state.schema.marks.underline)(view.state, view.dispatch)
      view.focus()
      return true
    }

    const setStrikeThrough = () => {
      toggleMark(view.state.schema.marks.strikethrough)(view.state, view.dispatch)
      view.focus()
      return true
    }

    const setSubscript = () => {
      toggleMark(view.state.schema.marks.subscript)(view.state, view.dispatch)
      view.focus()
      return true
    }

    const setSuperscript = () => {
      toggleMark(view.state.schema.marks.superscript)(view.state, view.dispatch)
      view.focus()
      return true
    }

    const setBulletList = () => {
      const listType = view.state.schema.nodes.bullet_list
      const itemType = view.state.schema.nodes.list_item
      toggleList(listType, itemType)(view.state, view.dispatch, view)
      view.focus()
    }

    const setOrderedList = () => {
      const listType = view.state.schema.nodes.ordered_list
      const itemType = view.state.schema.nodes.list_item
      toggleList(listType, itemType)(view.state, view.dispatch, view)
      view.focus()
    }

    const setBlockquote = () => {
      wrapIn(view.state.schema.nodes.blockquote)(view.state, view.dispatch)
      view.focus()
      return true
    }

    const setCode = () => {
      toggleMark(view.state.schema.marks.code)(view.state, view.dispatch)
      view.focus()
      return true
    }

    const setTextAlignRight = () => {
      const { $from, $to } = view.state.selection
      setBlockType($from.pos, $to.pos, view.state.schema.nodes.alignment, { alignment: 'right' })(view.state, view.dispatch)
      view.focus()
    }

    onMounted(initEditor)

    return {
      setBold,
      setItalics,
      setUnderline,
      setStrikeThrough,
      setSubscript,
      setSuperscript,
      setForecolor,
      setBackcolor,
      setFontsize,
      setFontname,
      setLineheight,
      setLetterspacing,
      setBulletList,
      setOrderedList,
      setBlockquote,
      setCode,
      setTextAlignRight,
      clear,
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