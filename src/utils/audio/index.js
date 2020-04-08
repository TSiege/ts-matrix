import { AudioContext } from 'standardized-audio-context'
import { NOTES_TO_HZ } from './tones'

const SAMPLE_RATE = 8000
const calcAngularFreq = (hz) => hz * 2 * Math.PI

export function generateToneBuffer({ hz, audioCtx }) {
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

export function generateToneBuffers(audioCtx) {
  const buffersByTone = {}
  for (let [note, hz] of Object.entries(NOTES_TO_HZ)) {
    buffersByTone[note] = generateToneBuffer({ hz, audioCtx })
  }
  return buffersByTone
}

export class TonePlayer {
  constructor(audioCtx = new AudioContext()) {
    this.audioCtx = audioCtx
    this.buffersByTone = generateToneBuffers(audioCtx)
  }

  play(tone) {
    const { audioCtx, buffersByTone } = this
    const source = audioCtx.createBufferSource()
    const gainNode = audioCtx.createGain()
    gainNode.gain.setTargetAtTime(0, audioCtx.currentTime, 0)
    source.buffer = buffersByTone[tone]
    source.connect(gainNode)
    gainNode.connect(audioCtx.destination)
    source.start()
    gainNode.gain.setTargetAtTime(1, audioCtx.currentTime, 0.05)
    gainNode.gain.setTargetAtTime(0, audioCtx.currentTime + 0.25, 0.125)
  }
}
