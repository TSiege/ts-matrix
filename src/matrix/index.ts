import renderMatrix from './renderers'
import addEventHandlers from './events'

export function render(notes: string[]) {
  renderMatrix(notes)
  addEventHandlers()
}
