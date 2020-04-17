import { NOTES_TO_HZ } from './notes'

// const spectrum = new Float32Array([0, 1.5, 0.5, 0.33333])
const spectrum = new Float32Array([0, 0.85, 0.909, 0.141])
// const spectrum = new Float32Array([0, 0.33873793482780457, 0.6374239921569824, 0.8607420325279236, 0.9822872281074524, 0.9876883625984192, 0.8763066530227661, 0.6613118648529053, 0.3681245446205139, 0.03141075745224953, -0.30901700258255005, -0.6129070520401001, -0.8443279266357422, -0.9759167432785034, -0.9921147227287292, -0.8910065293312073, -0.6845471262931824, -0.39714789390563965, -0.06279052048921585, 0.27899110317230225, 0.5877852439880371, 0.8270805478096008, 0.9685831665992737, 0.995561957359314, 0.9048270583152771, 0.7071067690849304, 0.4257792830467224, 0.09410831332206726, -0.24868988990783691, -0.56208336353302, -0.80901700258255, -0.960293710231781, -0.9980267286300659, -0.9177546501159668, -0.728968620300293, -0.45399048924446106, -0.12533323466777802, 0.21814323961734772, 0.5358268022537231, 0.7901549935340881, 0.9510565400123596, 0.9995065331459045, 0.9297764897346497, 0.7501110434532166, 0.4817536771297455, 0.15643446147441864, -0.187381312251091, -0.509041428565979, -0.7705132365226746, -0.9408807754516602, -1])

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


export function playNote(tone, audioCtx: AudioContext) {
  const source = audioCtx.createBufferSource()
  const gainNode = audioCtx.createGain()
  gainNode.gain.setTargetAtTime(0, audioCtx.currentTime, 0)
  // source.buffer = buffersByTone[tone]
  // source.connect(gainNode)
  gainNode.connect(audioCtx.destination)
  // source.start()
  let newOsc = audioCtx.createOscillator();
  const waveform = audioCtx.createPeriodicWave(new Float32Array(spectrum.length), spectrum, {disableNormalization: true})
  // newOsc.setPeriodicWave(waveform);
  newOsc.frequency.value = NOTES_TO_HZ[tone]
  newOsc.connect(gainNode);
  newOsc.start(audioCtx.currentTime)
  gainNode.gain.setTargetAtTime(0.5, audioCtx.currentTime, 0.05)
  gainNode.gain.setTargetAtTime(0.0001, audioCtx.currentTime + 0.25, 0.125)
  newOsc.stop(audioCtx.currentTime + 1)
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
  const targetGain = (Math.floor(1 / notes.length * 100) / 100) - 0.1
  const gainNode = audioCtx.createGain()
  const sourceNodes = notes.map(tone => {
    let newOsc = audioCtx.createOscillator();
    const waveform = audioCtx.createPeriodicWave(new Float32Array(spectrum.length), spectrum, {disableNormalization: true})
    // newOsc.setPeriodicWave(waveform);
    newOsc.frequency.value = NOTES_TO_HZ[tone]
    newOsc.connect(gainNode);
    return newOsc
  })
  gainNode.gain.setTargetAtTime(0, audioCtx.currentTime, 0)
  gainNode.connect(audioCtx.destination)
  sourceNodes.forEach(sn => sn.start())
  gainNode.gain.setTargetAtTime(targetGain, audioCtx.currentTime, 0.05)
  gainNode.gain.setTargetAtTime(0.0001, audioCtx.currentTime + (duration * 2), 0.125)
  sourceNodes.forEach(sn => sn.stop(audioCtx.currentTime + (duration * 10)))
}
