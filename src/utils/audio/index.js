import { NOTES_TO_HZ } from './tones'

export async function fetchAudioFile(path, audioCtx = new AudioContext()) {
  // const source = audioCtx.createBufferSource()
  const myRequest = new Request(path)

  const response = await fetch(myRequest)
  const buffer = await response.arrayBuffer()
  return audioCtx.decodeAudioData(buffer)
}

const SAMPLE_RATE = 44100
const calcAngularFreq = (hz) => hz * 2 * Math.PI

export function generateToneBuffer({ hz, audioCtx }) {
  const duration = SAMPLE_RATE * 2
  const angularFreq = calcAngularFreq(hz)
  const buffer = audioCtx.createBuffer(1, duration, SAMPLE_RATE)
  const bufferArray = buffer.getChannelData(0)
  for (let sampleNumber = 0; sampleNumber < duration; sampleNumber++) {
    const sampleTime = sampleNumber / 44100
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
    const gain = audioCtx.createGain()
    gain.gain.setTargetAtTime(0, audioCtx.currentTime, 0)
    source.buffer = buffersByTone[tone]
    source.connect(gain)
    gain.connect(audioCtx.destination)
    source.start()
    gain.gain.setTargetAtTime(1, audioCtx.currentTime, 0.05)
    gain.gain.setTargetAtTime(0, audioCtx.currentTime + 0.25, 0.125)
  }
}
