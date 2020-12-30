import { marks } from 'prosemirror-schema-basic'

const subscript = {
  excludes: 'subscript',
  parseDOM: [
    { tag: 'sub' },
    {
      style: 'vertical-align',
      getAttrs: value => value === 'sub' && null
    },
  ],
  toDOM: () => ['sub', 0],
}

const superscript = {
  excludes: 'superscript',
  parseDOM: [
    { tag: 'sup' },
    {
      style: 'vertical-align',
      getAttrs: value => value === 'super' && null
    },
  ],
  toDOM: () => ['sup', 0],
}

const strikethrough = {
  parseDOM: [
    { tag: 'strike' },
    {
      style: 'text-decoration',
      getAttrs: value => value === 'line-through' && null
    },
    {
      style: 'text-decoration-line',
      getAttrs: value => value === 'line-through' && null
    },
  ],
  toDOM: () => ['span', { style: 'text-decoration-line: line-through' }, 0],
}

const underline = {
  parseDOM: [
    { tag: 'u' },
    {
      style: 'text-decoration',
      getAttrs: value => value === 'underline' && null
    },
    {
      style: 'text-decoration-line',
      getAttrs: value => value === 'underline' && null
    },
  ],
  toDOM: () => ['span', { style: 'text-decoration: underline' }, 0],
}

const forecolor = {
  attrs: {
    color: {},
  },
  parseDOM: [
    {
      style: 'color',
      getAttrs: color => color ? { color } : {}
    },
  ],
  toDOM: node => {
    const { color } = node.attrs
    let style = ''
    if(color) style += `color: ${color};`
    return ['span', { style }, 0]
  },
}

const backcolor = {
  attrs: {
    backcolor: {},
  },
  inline: true,
  group: 'inline',
  parseDOM: [
    {
      tag: 'span[style*=background-color]',
      getAttrs: backcolor => backcolor ? { backcolor } : {}
    },
  ],
  toDOM: node => {
    const { backcolor } = node.attrs
    let style = ''
    if(backcolor) style += `background-color: ${backcolor};`
    return ['span', { style }, 0]
  },
}

const fontsize = {
  attrs: {
    fontsize: {},
  },
  inline: true,
  group: 'inline',
  parseDOM: [
    {
      style: 'font-size',
      getAttrs: fontsize => fontsize ? { fontsize } : {}
    },
  ],
  toDOM: node => {
    const { fontsize } = node.attrs
    const attrs = {}
    if(fontsize) attrs.style = `font-size: ${fontsize}`
    return ['span', attrs, 0]
  },
}

const fontname = {
  attrs: {
    fontname: '',
  },
  inline: true,
  group: 'inline',
  parseDOM: [
    {
      style: 'font-family',
      getAttrs: fontname => ({ fontname: fontname ? fontname.replace(/[\"\']/g, '') : '' })
    },
  ],
  toDOM: node => {
    const { fontname } = node.attrs
    const attrs = {}
    if(fontname) attrs.style = `font-family: ${fontname}`
    return ['span', attrs, 0]
  },
}

export default {
  ...marks,
  subscript,
  superscript,
  strikethrough,
  underline,
  forecolor,
  backcolor,
  fontsize,
  fontname,
}