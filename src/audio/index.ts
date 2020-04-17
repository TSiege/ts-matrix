import { NOTES_TO_HZ } from './notes'
// figured out by trial and error
const gains = {
  1: ((1/1) - 0.5),
  2: ((1/2) - 0.25),
  3: ((1/3) - 0.1),
  4: ((1/4) - 0.1),
  5: ((1/5) - 0.1),
  6: ((1/6) - 0.1),
  7: ((1/7) - 0.05),
  8: ((1/8) - 0.05),
  9: ((1/9) - 0.05),
  10: ((1/10) - 0.05),
  11: ((1/11) - 0.05),
  12: ((1/12) - 0.05),
  13: ((1/13) - 0.05),
  14: ((1/14) - 0.1),
  15: ((1/15) - 0.1),
  16: ((1/16) - 0.1),
}

function createAndSetupOscNode({ hz, audioCtx, gain }: { hz: number, audioCtx: AudioContext, gain: GainNode }) {
  const osc = audioCtx.createOscillator()
  osc.frequency.value = hz
  osc.connect(gain)
  return osc
}

export function playNote({ note, audioCtx }: { note: string, audioCtx: AudioContext }) {
  const gainNode = audioCtx.createGain()
  gainNode.connect(audioCtx.destination)
  gainNode.gain.setTargetAtTime(0, audioCtx.currentTime, 0)
  const osc = createAndSetupOscNode({ hz: NOTES_TO_HZ[note], audioCtx, gain: gainNode })
  osc.start(audioCtx.currentTime)
  gainNode.gain.setTargetAtTime(0.4, audioCtx.currentTime, 0.05)
  gainNode.gain.setTargetAtTime(0.0001, audioCtx.currentTime + 0.25, 0.125)
  osc.stop(audioCtx.currentTime + 1)
}

interface PlayNotesAtTimeOptions {
  notes: string[]
  duration: number
  audioCtx: AudioContext
}

export function playNotesAtTime({ notes, duration, audioCtx }: PlayNotesAtTimeOptions) {
  if (!notes.length) {
    return
  }
  const targetGain = gains[notes.length]
  const gainNode = audioCtx.createGain()
  const sourceNodes = notes
    .map(note => createAndSetupOscNode({ hz: NOTES_TO_HZ[note], audioCtx, gain: gainNode }))
  gainNode.gain.setTargetAtTime(0, audioCtx.currentTime, 0)
  gainNode.connect(audioCtx.destination)
  sourceNodes.forEach(sn => sn.start())
  gainNode.gain.setTargetAtTime(targetGain, audioCtx.currentTime, 0.05)
  gainNode.gain.setTargetAtTime(0.0001, audioCtx.currentTime + (duration * 2), 0.125)
  sourceNodes.forEach(sn => sn.stop(audioCtx.currentTime + (duration * 10)))
}
