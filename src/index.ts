import { NOTES } from './audio'
import { render } from './matrix'

function onReady(fn) {
  if (document.readyState !== 'loading') {
    fn()
  } else {
    document.addEventListener('DOMContentLoaded', () => fn())
  }
}

function renderJsMatrix () {
  render(NOTES)
}

onReady(renderJsMatrix)
