import renderMatrix from './renderers'
import addEventHandlers from './events'
import Metronome from '../metronome'

export function render({
  notes,
  metronome,
}: {
  notes: string[]
  metronome: Metronome
}) {
  renderMatrix(notes)
  addEventHandlers(metronome)
}

export function drawPlayingCues(prevStep: number, nextStep?: number) {
  if (prevStep !== undefined) {
    const elsToStopPlaying = [
      ...document.getElementsByClassName(`col-${prevStep}`),
    ]
    for (const el of elsToStopPlaying) {
      el.classList.remove('playing')
    }
  }
  if (nextStep !== undefined) {
    const elsToPlay = [...document.getElementsByClassName(`col-${nextStep}`)]
    for (const el of elsToPlay) {
      el.classList.add('playing')
    }
  }
}

export async function removePlayingCues() {
  const elsToStopPlaying = [...document.getElementsByClassName('playing')]
  for (const el of elsToStopPlaying) {
    el.classList.remove('playing')
  }
}
