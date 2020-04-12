function stepPerSec(bpm = 128) {
  return (((60 / bpm) * 4) / 16)
}

function stepPerMs(bpm = 128) {
  return stepPerSec(bpm) * 1000
}

type playNotesAtTime = (notes: string[], time: number) => void
type drawPlayingElements = (prevStep: number, nextStep: number) => void

interface MetronomeConstructorArgs {
  notes: string[]
  drawPlayingElements: drawPlayingElements
  playNotesAtTime: playNotesAtTime
}

export default class Metronome {
  bpm: number
  isOn: boolean
  step: number
  prevStep: number
  notes: string[]
  matrix: boolean[][]
  interval: NodeJS.Timeout | null
  audioCtx: AudioContext
  nextDrawTime: number | null
  drawPlayingElements: drawPlayingElements
  playNotesAtTime: playNotesAtTime
  constructor({ notes, playNotesAtTime, drawPlayingElements }: MetronomeConstructorArgs) {
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext
    this.bpm = 128
    this.isOn = false
    this.notes = notes
    this.interval = null
    this.audioCtx = new AudioContext() as AudioContext
    this.matrix = notes.map(() => new Array(notes.length).fill(false))
    this.drawPlayingElements = drawPlayingElements
    this.playNotesAtTime = playNotesAtTime
    this.draw()
  }

  toggleMatrix(row: number, col:number) {
    this.matrix[row][col] = !this.matrix[row][col]
  }

  play() {
    const { intervalCb, bpm } = this
    this.interval = setInterval(intervalCb, stepPerMs(bpm))
    this.isOn = true
  }

  pause() {
    const { interval } = this
    clearInterval(interval)
    this.isOn = false
    this.nextDrawTime = null
  }

  stop() {
    this.pause()
    this.step = null
    this.prevStep = null
  }

  // private functions
  private intervalCb = () => {
    const { step } = this
    if (step === null || step === 15) {
      this.step = 0
    } else {
      this.step += 1
    }
    this.prevStep = step
    this.scheduleNotesToPlay()
  }

  private getNotesAtCurrentStep() {
    const { step, notes, matrix } = this
    const onNotes: string[] = []
    for (let i = 0; i < matrix.length; i++) {
      const isOn = matrix[i][step]
      if (isOn) {
        onNotes.push(notes[i])
      }
    }
    return onNotes
  }

  private scheduleNotesToPlay() {
    const { audioCtx, bpm, playNotesAtTime } = this
    const notes = this.getNotesAtCurrentStep()
    const nextDrawTime = audioCtx.currentTime + stepPerSec(bpm)

    playNotesAtTime(notes, nextDrawTime)
  }

  private draw = () => {
    const {
      prevStep,
      step,
      nextDrawTime,
      audioCtx,
      drawPlayingElements,
      draw
    } = this
    if (nextDrawTime === null || nextDrawTime > audioCtx.currentTime) {
      return
    }
    drawPlayingElements(prevStep, step)
    requestAnimationFrame(draw)
  }

}
