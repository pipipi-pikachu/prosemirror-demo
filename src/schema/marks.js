import { marks } from 'prosemirror-schema-basic'

const subscript = {
  excludes: 'superscript',
  parseDOM: [
    { tag: 'sub' },
    { style: 'vertical-align=sub' },
  ],
  toDOM: () => ['sub'],
}

const superscript = {
  excludes: 'subscript',
  parseDOM: [
    { tag: 'sup' },
    { style: 'vertical-align=super' },
  ],
  toDOM: () => ['sup'],
}

const strikethrough = {
  parseDOM: [
    { tag: 'strike' },
    { style: 'text-decoration:line-through' },
    { style: 'text-decoration-line:line-through' },
  ],
  toDOM: () => ['span', {
    style: 'text-decoration-line:line-through',
  }],
}

const underline = {
  parseDOM: [
    { tag: 'u' },
    { style: 'text-decoration:underline' },
  ],
  toDOM: () => ['span', {
    style: 'text-decoration:underline',
  }],
}

const forecolor = {
  attrs: {
    color: {},
  },
  parseDOM: [
    {
      style: 'color',
      getAttrs: color => color ? { color } : null
    },
  ],
  toDOM: mark => {
    return ['span', { style: `color: ${mark.attrs.color};` }]
  },
}

const backcolor = {
  attrs: {
    backcolor: {},
  },
  parseDOM: [
    {
      style: 'background-color',
      getAttrs: backcolor => backcolor ? { backcolor } : null
    },
  ],
  toDOM: mark => {
    return ['span', { style: `background-color: ${mark.attrs.backcolor};` }]
  },
}

const fontsize = {
  attrs: {
    fontsize: {},
  },
  parseDOM: [
    {
      style: 'font-size',
      getAttrs: fontsize => fontsize ? { fontsize } : null
    },
  ],
  toDOM: mark => {
    return ['span', { style: `font-size: ${mark.attrs.fontsize};` }]
  },
}

const fontname = {
  attrs: {
    fontname: {},
  },
  parseDOM: [
    {
      style: 'font-family',
      getAttrs: fontname => fontname ? { fontname } : null
    },
  ],
  toDOM: mark => {
    return ['span', { style: `font-family: ${mark.attrs.fontname};` }]
  },
}

const lineheight = {
  attrs: {
    lineheight: {},
  },
  parseDOM: [
    {
      style: 'line-height',
      getAttrs: lineheight => lineheight ? { lineheight } : null
    },
  ],
  toDOM: mark => {
    return ['span', { style: `line-height: ${mark.attrs.lineheight};` }]
  },
}

const letterspacing = {
  attrs: {
    letterspacing: {},
  },
  parseDOM: [
    {
      style: 'letter-spacing',
      getAttrs: letterspacing => letterspacing ? { letterspacing } : null
    },
  ],
  toDOM: mark => {
    return ['span', { style: `letter-spacing: ${mark.attrs.letterspacing};` }]
  },
}

const textalign = {
  attrs: {
    textalign: {
      default: 'left',
    },
  },
  parseDOM: [
    {
      style: 'text-align',
      getAttrs: textalign => textalign ? { textalign } : null
    },
  ],
  toDOM: mark => {
    return ['span', { style: `text-align: ${mark.attrs.textalign}; display:block;` }]
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
  lineheight,
  letterspacing,
  textalign,
}