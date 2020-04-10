import { NOTES } from './audio'
import { renderMatrix } from './components/matrix'

function onReady(fn) {
  if (document.readyState !== 'loading') {
    fn()
  } else {
    document.addEventListener('DOMContentLoaded', () => fn())
  }
}

function renderJsMatrix () {
  const matrix = renderMatrix(NOTES)
}

onReady(renderJsMatrix)
