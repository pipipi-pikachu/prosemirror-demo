export const setTextAlign = (tr, schema, alignment) => {
  const { selection, doc } = tr
  if(!selection || !doc) return tr

  const { from, to } = selection
  const { nodes } = schema

  const blockquote = nodes.blockquote
  const listItem = nodes.list_item
  const paragraph = nodes.paragraph

  const tasks = []
  alignment = alignment || null

  const allowedNodeTypes = new Set([blockquote, listItem, paragraph])

  doc.nodesBetween(from, to, (node, pos) => {
    const nodeType = node.type
    const align = node.attrs.align || null
    if(align !== alignment && allowedNodeTypes.has(nodeType)) {
      tasks.push({
        node,
        pos,
        nodeType,
      })
    }
    return true
  })

  if(!tasks.length) return tr

  tasks.forEach(job => {
    const { node, pos, nodeType } = job
    let { attrs } = node
    if(alignment) attrs = { ...attrs, align: alignment }
    else attrs = { ...attrs, align: null }
    tr = tr.setNodeMarkup(pos, nodeType, attrs, node.marks);
  })

  return tr
}

export const alignmentCommand = (view, alignment) => {
  const { state } = view
  const { schema, selection } = state
  const tr = setTextAlign(
    state.tr.setSelection(selection),
    schema,
    alignment,
  )
  view.dispatch(tr)
}