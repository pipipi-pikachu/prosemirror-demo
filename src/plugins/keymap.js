import {
  wrapIn,
  setBlockType,
  toggleMark,
  joinUp,
  joinDown,
  lift,
  selectParentNode,
} from 'prosemirror-commands'

import { wrapInList } from 'prosemirror-schema-list'
import {undo, redo} from 'prosemirror-history'
import {undoInputRule} from 'prosemirror-inputrules'

export const buildKeymap = schema => {
  const keys = {}
  const bind = (key, cmd) => keys[key] = cmd

  bind('Ctrl-z', undo)
  bind('Shift-Ctrl-z', redo)
  bind('Backspace', undoInputRule)
  bind('Ctrl-y', redo)

  bind('Alt-ArrowUp', joinUp)
  bind('Alt-ArrowDown', joinDown)
  bind('Ctrl-BracketLeft', lift)
  bind('Escape', selectParentNode)

  bind('Ctrl-b', toggleMark(schema.marks.strong))
  bind('Ctrl-B', toggleMark(schema.marks.strong))
  
  bind('Ctrl-i', toggleMark(schema.marks.em))
  bind('Ctrl-I', toggleMark(schema.marks.em))
  
  bind('Ctrl-`', toggleMark(schema.marks.code))
  bind('Ctrl->', wrapIn(schema.nodes.blockquote))
  bind('Shift-Ctrl-\\', setBlockType(schema.nodes.code_block))

  bind('Shift-Ctrl-l', wrapInList(schema.nodes.bullet_list))
  bind('Shift-Ctrl-u', wrapInList(schema.nodes.ordered_list))

  return keys
}