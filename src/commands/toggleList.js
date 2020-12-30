import { wrapInList, liftListItem } from 'prosemirror-schema-list'

const findParentNodeClosestToPos = ($pos, predicate) => {
  for(let i = $pos.depth; i > 0; i--) {
    const node = $pos.node(i)
    if(predicate(node)) {
      return {
        pos: i > 0 ? $pos.before(i) : 0,
        start: $pos.start(i),
        depth: i,
        node,
      }
    }
  }
}

const findParentNode = (predicate) => {
  return _ref => findParentNodeClosestToPos(_ref.$from, predicate)
}

const isList = (node, schema) => {
  return (
    node.type === schema.nodes.bullet_list ||
    node.type === schema.nodes.ordered_list
  )
}

export const toggleList = (listType, itemType) => {
  return (state, dispatch, view) => {
    const { schema, selection } = state
    const { $from, $to } = selection
    const range = $from.blockRange($to)

    if(!range) return false

    const parentList = findParentNode(node => isList(node, schema))(selection)

    if(range.depth >= 1 && parentList && range.depth - parentList.depth <= 1) {
      if(parentList.node.type === listType) {
        return liftListItem(itemType)(state, dispatch, view)
      }

      if(isList(parentList.node, schema) && listType.validContent(parentList.node.content)) {
        const { tr } = state
        tr.setNodeMarkup(parentList.pos, listType)

        if(dispatch) dispatch(tr)

        return false
      }
    }

    return wrapInList(listType)(state, dispatch, view)
  }
}
