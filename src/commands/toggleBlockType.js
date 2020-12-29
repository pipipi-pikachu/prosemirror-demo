import { setBlockType } from 'prosemirror-commands'
import { findSelectedNodeOfType, findParentNode } from './utils'

function nodeIsActive(state, type, attrs = {}) {
  const predicate = node => node.type === type
  const node = findSelectedNodeOfType(type)(state.selection)
    || findParentNode(predicate)(state.selection)

  if (!Object.keys(attrs).length || !node) {
    return !!node
  }

  return node.node.hasMarkup(type, { ...node.node.attrs, ...attrs })
}

export const toggleBlockType = (type, toggletype, attrs = {}) => {
  console.log(type, toggletype, attrs)
  return (state, dispatch, view) => {
    const isActive = nodeIsActive(state, type, attrs)

    if (isActive) {
      return setBlockType(toggletype)(state, dispatch, view)
    }

    return setBlockType(type, attrs)(state, dispatch, view)
  }
}
