import { NOTES } from './audio/notes'
import { render } from './matrix'
import Metronome from './metronome'

function onReady(fn) {
  if (document.readyState !== 'loading') {
    fn()
  } else {
    document.addEventListener('DOMContentLoaded', () => fn())
  }
}

function renderJsMatrix () {
  const metronome = new Metronome(NOTES)
  render({ notes: NOTES, metronome })
}

onReady(renderJsMatrix)
