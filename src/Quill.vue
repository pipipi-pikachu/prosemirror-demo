<template>
  <div class="btns">
    <button class="btn" @click="alignLeft()">对齐左</button>
    <button class="btn" @click="alignCenter()">对齐中</button>
    <button class="btn" @click="alignRight()">对齐右</button>
    <button class="btn" @click="bold()">加粗</button>
    <button class="btn" @click="color()">颜色</button>
  </div>
  <div class="quill" ref="quillRef">7777777777777</div>
</template>

<script>
import Quill from 'quill'
import { defineComponent, onMounted, ref } from 'vue'

export default defineComponent({
  setup() {
    const editor = ref(null)
    const quillRef = ref(null)

    onMounted(() => {
      editor.value = new Quill(quillRef.value, {
        theme: 'snow',
        toolbar: null,
      })
    })

    const alignLeft = () => {
      editor.value.format('align', '')
    }

    const alignCenter = () => {
      editor.value.format('align', 'center')
    }

    const alignRight = () => {
      editor.value.format('align', 'right')
    }

    const bold = () => {
      editor.value.format('bold', true)
    }

    const color = () => {
      editor.value.format('color', 'red')
    }

    return {
      editor,
      quillRef,
      alignLeft,
      alignCenter,
      alignRight,
      bold,
      color,
    }
  },
})
</script>

<style>
.ql-editor {
  border: 1px solid #777;
  padding: 10px;
  outline: 0;
}
</style>