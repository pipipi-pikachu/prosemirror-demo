import {
  toggleMark,
  selectParentNode,
  joinUp,
  joinDown,
} from 'prosemirror-commands'
import { splitListItem, liftListItem, sinkListItem } from 'prosemirror-schema-list'

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
  bind('Ctrl-i', toggleMark(schema.marks.em))
  bind('Ctrl-u', toggleMark(schema.marks.underline))
  bind('Ctrl-d', toggleMark(schema.marks.strikethrough))

  bind('Enter', splitListItem(schema.nodes.list_item))
  bind('Mod-[', liftListItem(schema.nodes.list_item))
  bind('Mod-]', sinkListItem(schema.nodes.list_item))

  return keys
}