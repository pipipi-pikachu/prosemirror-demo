function getMarkRange($pos = null, type = null) {

  if (!$pos || !type) {
    return false
  }

  const start = $pos.parent.childAfter($pos.parentOffset)

  if (!start.node) {
    return false
  }

  const link = start.node.marks.find(mark => mark.type === type)
  if (!link) {
    return false
  }

  let startIndex = $pos.index()
  let startPos = $pos.start() + start.offset
  let endIndex = startIndex + 1
  let endPos = startPos + start.node.nodeSize

  while (startIndex > 0 && link.isInSet($pos.parent.child(startIndex - 1).marks)) {
    startIndex -= 1
    startPos -= $pos.parent.child(startIndex).nodeSize
  }

  while (endIndex < $pos.parent.childCount && link.isInSet($pos.parent.child(endIndex).marks)) {
    endPos += $pos.parent.child(endIndex).nodeSize
    endIndex += 1
  }

  return { from: startPos, to: endPos }

}


export const updateMark = (type, attrs) => {
  return (state, dispatch) => {
    const {
      tr,
      selection,
      doc,
    } = state

    const {
      ranges,
      empty,
    } = selection

    if (empty) {
      const { from, to } = getMarkRange(selection.$from, type)
      if (doc.rangeHasMark(from, to, type)) {
        tr.removeMark(from, to, type)
      }

      tr.addMark(from, to, type.create(attrs))
    } else {
      ranges.forEach(ref$1 => {
        const { $to, $from } = ref$1

        if (doc.rangeHasMark($from.pos, $to.pos, type)) {
          tr.removeMark($from.pos, $to.pos, type)
        }

        tr.addMark($from.pos, $to.pos, type.create(attrs))
      })
    }

    return dispatch(tr)
  }
}
