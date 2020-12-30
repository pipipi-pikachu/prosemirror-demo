import { nodes } from 'prosemirror-schema-basic'
import { orderedList, bulletList, listItem } from 'prosemirror-schema-list'

const listNodes = {
  ordered_list: {
    ...orderedList,
    content: 'list_item+',
    group: 'block',
  },
  bullet_list: {
    ...bulletList,
    content: 'list_item+',
    group: 'block',
  },
  list_item: {
    ...listItem,
    content: 'paragraph block*',
    group: 'block',
  },

  paragraph: {
    attrs: {
      align: {default: null},
    },
    content: 'inline*',
    group: 'block',
    parseDOM: [
      {
        tag: 'p',
        getAttrs: dom => {
          const { textAlign } = dom.style
          let align = dom.getAttribute('align') || textAlign || ''
          align = /(left|right|center|justify)/.test(align) ? align : {}
        
          return { align }
        }
      }
    ],
    toDOM: node => {
      const { align } = node.attrs
      const attrs = {}
      let style = ''

      if(align && align !== 'left') style += `text-align: ${align};`
      style && (attrs.style = style)

      return ['p', attrs, 0]
    },
  },
}

export default {
  ...nodes,
  ...listNodes,
}
