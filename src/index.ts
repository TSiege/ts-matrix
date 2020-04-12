import { NOTES } from './audio'
import { render, drawPlayingElements } from './matrix'
import Metronome from './metronome'

function onReady(fn) {
  if (document.readyState !== 'loading') {
    fn()
  } else {
    document.addEventListener('DOMContentLoaded', () => fn())
  }
}

function renderJsMatrix () {
  const metronome = new Metronome({ notes: NOTES, drawPlayingElements, playNotesAtTime })
  render({ notes: NOTES, metronome })
}

onReady(renderJsMatrix)
