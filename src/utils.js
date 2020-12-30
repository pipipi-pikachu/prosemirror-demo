const equalNodeType = (nodeType, node) => {
  return Array.isArray(nodeType) && nodeType.indexOf(node.type) > -1 || node.type === nodeType
}

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

export const findParentNode = predicate => {
  return _ref => findParentNodeClosestToPos(_ref.$from, predicate)
}

export const findParentNodeOfType = nodeType => {
  return selection => {
    return findParentNode(node => {
      return equalNodeType(nodeType, node)
    })(selection)
  }
}