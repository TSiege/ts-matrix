import { AudioContext } from 'standardized-audio-context'
import { NOTES_TO_HZ } from '../audio'

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

export function generateToneBuffers(audioCtx) {
  const buffersByTone: { [k: string]: AudioBuffer } = {}
  for (let [note, hz] of Object.entries(NOTES_TO_HZ)) {
    buffersByTone[note] = generateToneBuffer({ hz, audioCtx })
  }
  return buffersByTone
}

export class TonePlayer {
  audioCtx: AudioContext
  buffersByTone: { [k: string]: AudioBuffer }
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

  playTones(tones) {
    if (!tones.length) {
      return
    }
    const { audioCtx, buffersByTone } = this
    const buffers = tones.map(tone => buffersByTone[tone])
    const buffer = audioCtx.createBuffer(1, SAMPLE_RATE, SAMPLE_RATE)
    const bufferArray = buffer.getChannelData(0)
    for (let sampleNumber = 0; sampleNumber < SAMPLE_RATE; sampleNumber++) {
      const sample = buffers.reduce((acc, buff) => {
        const bufferArray = buff.getChannelData(0)
        return acc + bufferArray[sampleNumber]
      }, 0)
      if (sampleNumber % 1000 === 0) {
        console.log({ tones, sampleNumber, sample })
      }
      bufferArray[sampleNumber] = sample
    }
    const source = audioCtx.createBufferSource()
    const gainNode = audioCtx.createGain()
    gainNode.gain.setTargetAtTime(0, audioCtx.currentTime, 0)
    source.buffer = buffer
    source.connect(gainNode)
    gainNode.connect(audioCtx.destination)
    source.start()
    gainNode.gain.setTargetAtTime(1, audioCtx.currentTime, 0.05)
    gainNode.gain.setTargetAtTime(0, audioCtx.currentTime + 0.25, 0.125)
  }
}
