import { NOTES_TO_HZ } from './notes'

const SAMPLE_RATE = 8000
const calcAngularFreq = (hz) => hz * 2 * Math.PI

function generateToneBuffer({ hz, audioCtx }: { hz: number, audioCtx: AudioContext }) {
  const duration = SAMPLE_RATE
  const angularFreq = calcAngularFreq(hz)
  const buffer = audioCtx.createBuffer(1, duration, SAMPLE_RATE)
  const bufferArray = buffer.getChannelData(0)
  for (let sampleNumber = 0; sampleNumber < duration; sampleNumber++) {
    const sampleTime = sampleNumber / SAMPLE_RATE
    const sampleAngle = sampleTime * angularFreq
    const sample = Math.sin(sampleAngle)
    bufferArray[sampleNumber] = sample
  }

  return buffer
}

function generateToneBuffers(audioCtx) {
  const buffersByTone: { [k: string]: AudioBuffer } = {}
  for (let [note, hz] of Object.entries(NOTES_TO_HZ)) {
    buffersByTone[note] = generateToneBuffer({ hz, audioCtx })
  }
  return buffersByTone
}

window.generateToneBuffers = generateToneBuffers

const buffersByTone = generateToneBuffers(new (window.AudioContext || (window as any).webkitAudioContext))

export function playNote(tone, audioCtx) {
  const source = audioCtx.createBufferSource()
  const gainNode = audioCtx.createGain()
  gainNode.gain.setTargetAtTime(0, audioCtx.currentTime, 0)
  source.buffer = buffersByTone[tone]
  source.connect(gainNode)
  gainNode.connect(audioCtx.destination)
  source.start()
  gainNode.gain.setTargetAtTime(0.5, audioCtx.currentTime, 0.05)
  gainNode.gain.setTargetAtTime(0, audioCtx.currentTime + 0.25, 0.125)
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

  const gainNode = audioCtx.createGain()
  const sourceNodes = notes.map(tone => {
    const source = audioCtx.createBufferSource()
    source.buffer = buffersByTone[tone]
    source.connect(gainNode)
    return source
  })
  gainNode.gain.setTargetAtTime(0, audioCtx.currentTime, 0)
  gainNode.connect(audioCtx.destination)
  sourceNodes.forEach(sn => sn.start())
  gainNode.gain.setTargetAtTime(1 / notes.length, audioCtx.currentTime + duration, 0.05)
  gainNode.gain.setTargetAtTime(0, audioCtx.currentTime + 0.25, 0.125)
}
