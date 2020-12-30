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
    <button class="btn" @click="setBulletList()">无序列表</button>
    <button class="btn" @click="setOrderedList()">有序列表</button>
    <button class="btn" @click="setBlockquote()">引用块</button>
    <button class="btn" @click="setCode()">行内代码</button>
    <button class="btn" @click="setTextAlign('left')">左对齐</button>
    <button class="btn" @click="setTextAlign('center')">中对齐</button>
    <button class="btn" @click="setTextAlign('right')">右对齐</button>
    <button class="btn" @click="clear()">清除样式</button>
  </div>

  <div class="prosemirror-editor"></div>

  <button @click="getAttrs()">获取光标处焦点信息</button>
</template>

<script>
import { defineComponent, onMounted } from 'vue'

import { EditorState } from 'prosemirror-state'
import { EditorView } from 'prosemirror-view'
import { Schema, DOMParser } from 'prosemirror-model'
import { wrapIn, toggleMark } from 'prosemirror-commands'
import { findParentNodeOfType } from './utils'

import { toggleList } from './commands/toggleList'
import { alignmentCommand } from './commands/setTextAlign'

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
    }

    const setForecolor = () => {
      const mark = view.state.schema.marks.forecolor.create({ color: 'red' })
      const { $from, $to } = view.state.selection
      view.dispatch(view.state.tr.addMark($from.pos, $to.pos, mark))
      view.focus()
    }

    const setBackcolor = () => {
      const mark = view.state.schema.marks.backcolor.create({ backcolor: 'yellow' })
      const { $from, $to } = view.state.selection
      view.dispatch(view.state.tr.addMark($from.pos, $to.pos, mark))
      view.focus()
    }

    const setFontsize = () => {
      const mark = view.state.schema.marks.fontsize.create({ fontsize: '22px' })
      const { $from, $to } = view.state.selection
      view.dispatch(view.state.tr.addMark($from.pos, $to.pos, mark))
      view.focus()
    }

    const setFontname = () => {
      const mark = view.state.schema.marks.fontname.create({ fontname: '宋体' })
      const { $from, $to } = view.state.selection
      view.dispatch(view.state.tr.addMark($from.pos, $to.pos, mark))
      view.focus()
    }

    const setBold = () => {
      toggleMark(view.state.schema.marks.strong)(view.state, view.dispatch)
      view.focus()
    }

    const setItalics = () => {
      toggleMark(view.state.schema.marks.em)(view.state, view.dispatch)
      view.focus()
    }

    const setUnderline = () => {
      toggleMark(view.state.schema.marks.underline)(view.state, view.dispatch)
      view.focus()
    }

    const setStrikeThrough = () => {
      toggleMark(view.state.schema.marks.strikethrough)(view.state, view.dispatch)
      view.focus()
    }

    const setSubscript = () => {
      toggleMark(view.state.schema.marks.subscript)(view.state, view.dispatch)
      view.focus()
    }

    const setSuperscript = () => {
      toggleMark(view.state.schema.marks.superscript)(view.state, view.dispatch)
      view.focus()
    }

    const setBulletList = () => {
      const { bullet_list, list_item } = view.state.schema.nodes
      toggleList(bullet_list, list_item)(view.state, view.dispatch, view)
      view.focus()
    }

    const setOrderedList = () => {
      const { ordered_list, list_item } = view.state.schema.nodes
      toggleList(ordered_list, list_item)(view.state, view.dispatch, view)
      view.focus()
    }

    const setBlockquote = () => {
      wrapIn(view.state.schema.nodes.blockquote)(view.state, view.dispatch)
      view.focus()
    }

    const setCode = () => {
      toggleMark(view.state.schema.marks.code)(view.state, view.dispatch)
      view.focus()
    }

    const setTextAlign = alignment => {
      alignmentCommand(view, alignment)
      view.focus()
    }

    onMounted(initEditor)

    const isActiveOfParentNodeType = (nodeType, state) => {
      const node = state.schema.nodes[nodeType]
      return !!findParentNodeOfType(node)(state.selection)
    }

    const getMarkAttrs = () => {
      const { selection, doc } = view.state
      const { from } = selection
      const node = doc.nodeAt(from)
      return node.marks
    }

    const getAttrValue = (markType, attr) => {
      const marks = getMarkAttrs()
      for(const mark of marks) {
        if(mark.type.name === markType && mark.attrs[attr]) return mark.attrs[attr]
      }
      return null
    }

    const isActiveMark = markType => {
      const marks = getMarkAttrs()
      for(const mark of marks) {
        if(mark.type.name === markType) return true
      }
      return false
    }

    const getAttrValueInSelection = attr => {
      const { selection, doc } = view.state
      const { from, to } = selection

      let keepChecking = true
      let value = ''
      doc.nodesBetween(from, to, node => {
        if(keepChecking && node.attrs[attr]) {
          keepChecking = false
          value = node.attrs[attr]
        }
        return keepChecking
      })
      return value
    }

    const getAttrs = () => {
      const isBold = isActiveMark('strong')
      const isEm = isActiveMark('em')
      const isUnderline = isActiveMark('underline')
      const isStrikethrough = isActiveMark('strikethrough')
      const isSuperscript = isActiveMark('superscript')
      const isSubscript = isActiveMark('subscript')
      const isCode = isActiveMark('code')
      const color = getAttrValue('forecolor', 'color')
      const backcolor = getAttrValue('backcolor', 'backcolor')
      const fontsize = getAttrValue('fontsize', 'fontsize')
      const fontname = getAttrValue('fontname', 'fontname')
      const align = getAttrValueInSelection('align')
      const isBulletList = isActiveOfParentNodeType('bullet_list', view.state)
      const isOrderedList = isActiveOfParentNodeType('ordered_list', view.state)
      const isBlockquote = isActiveOfParentNodeType('blockquote', view.state)

      console.log('isBold: ', isBold)
      console.log('isEm: ', isEm)
      console.log('isUnderline: ', isUnderline)
      console.log('isStrikethrough: ', isStrikethrough)
      console.log('isSuperscript: ', isSuperscript)
      console.log('isSubscript: ', isSubscript)
      console.log('isCode: ', isCode)
      console.log('color: ', color)
      console.log('backcolor: ', backcolor)
      console.log('fontsize: ', fontsize)
      console.log('fontname: ', fontname)
      console.log('align: ', align)
      console.log('isBulletList: ', isBulletList)
      console.log('isOrderedList: ', isOrderedList)
      console.log('isBlockquote: ', isBlockquote)
    }

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
      setBulletList,
      setOrderedList,
      setBlockquote,
      setCode,
      setTextAlign,
      clear,
      getAttrs,
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
  font-size: 16px;
  line-height: 1.5;
}
.ProseMirror p + p {
  margin-top: 5px;
}

ul {
  list-style-type: disc;
  padding-inline-start: 20px;
}
ul li {
  list-style-type: disc;
}

ol {
  list-style-type: decimal;
  padding-inline-start: 20px;
}
ol li {
  list-style-type: decimal;
}

code {
  background-color: #eee;
  padding: 1px 3px;
  margin: 0 1px;
  border-radius: 2px;
  font-family: inherit;
}

blockquote {
  overflow: hidden;
  padding-right: 1.2em;
  padding-left: 1.2em;
  margin-left: 0;
  margin-right: 0;
  font-style: italic;
  border-left: 5px solid #ccc;
}
</style>