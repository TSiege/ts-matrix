import { NOTES } from './audio'
import { Matrix } from './components/matrix'

function onReady(fn) {
  if (document.readyState !== 'loading') {
    fn()
  } else {
    document.addEventListener('DOMContentLoaded', () => fn())
  }
}

function renderJsMatrix () {
  const matrix = new Matrix(NOTES)
  matrix.renderMatrix()
}

onReady(renderJsMatrix)
