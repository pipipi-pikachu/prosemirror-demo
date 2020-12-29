import { NodeSelection } from 'prosemirror-state'

export const isNodeSelection = (selection) => {
  return selection instanceof NodeSelection
}

export const equalNodeType = (nodeType, node) => {
  return Array.isArray(nodeType) && nodeType.indexOf(node.type) > -1 || node.type === nodeType;
};

export const findParentNodeClosestToPos = ($pos, predicate) => {
  for (var i = $pos.depth; i > 0; i--) {
    var node = $pos.node(i);
    if (predicate(node)) {
      return {
        pos: i > 0 ? $pos.before(i) : 0,
        start: $pos.start(i),
        depth: i,
        node: node
      };
    }
  }
}

export const findSelectedNodeOfType = (nodeType) => {
  return function (selection) {
    if (isNodeSelection(selection)) {
      var node = selection.node,
          $from = selection.$from;

      if (equalNodeType(nodeType, node)) {
        return { node: node, pos: $from.pos, depth: $from.depth };
      }
    }
  };
};

export const findParentNode = (predicate) => {
  return function (_ref) {
    var $from = _ref.$from
    return findParentNodeClosestToPos($from, predicate)
  }
}