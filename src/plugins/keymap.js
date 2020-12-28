import {
  toggleMark,
  selectParentNode,
  joinUp,
  joinDown,
} from 'prosemirror-commands'

import { undo, redo } from 'prosemirror-history'
import { undoInputRule } from 'prosemirror-inputrules'

export const buildKeymap = schema => {
  const keys = {}
  const bind = (key, cmd) => keys[key] = cmd

  bind('Alt-ArrowUp', joinUp)
  bind('Alt-ArrowDown', joinDown)

  bind('Ctrl-z', undo)
  bind('Ctrl-y', redo)
  bind('Backspace', undoInputRule)

  bind('Escape', selectParentNode)

  bind('Ctrl-b', toggleMark(schema.marks.strong))
  bind('Ctrl-B', toggleMark(schema.marks.strong))
  
  bind('Ctrl-i', toggleMark(schema.marks.em))
  bind('Ctrl-I', toggleMark(schema.marks.em))
  
  bind('Ctrl-u', toggleMark(schema.marks.underline))
  bind('Ctrl-U', toggleMark(schema.marks.underline))
  
  bind('Ctrl-d', toggleMark(schema.marks.strikethrough))
  bind('Ctrl-D', toggleMark(schema.marks.strikethrough))

  return keys
}