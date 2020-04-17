import { playNotesAtTime, playNote } from '../audio'
import { drawPlayingCues, removePlayingCues } from '../matrix'

function stepPerSec(bpm = 128) {
  return (((60 / bpm) * 4) / 16)
}

function stepPerMs(bpm = 128) {
  return stepPerSec(bpm) * 1000
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
  hasDrawnCues: boolean
  constructor(notes: string[]) {
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext
    this.bpm = 128
    this.isOn = false
    this.step = null
    this.notes = notes
    this.interval = null
    this.audioCtx = new AudioContext() as AudioContext
    this.hasDrawnCues = false
    this.matrix = notes.map(() => new Array(notes.length).fill(false))
  }

  toggleMatrix(row: number, col:number) {
    const { matrix, notes, audioCtx } = this
    const isOn = !matrix[row][col]
    matrix[row][col] = isOn
    if (isOn) {
      playNote(notes[row], audioCtx)
    }
  }

  play() {
    const { intervalCb, bpm } = this
    this.interval = setInterval(intervalCb, stepPerMs(bpm))
    this.isOn = true
  }

  pause() {
    const { interval } = this
    interval && clearInterval(interval)
    this.isOn = false
  }

  stop() {
    this.pause()
    this.step = null
    this.prevStep = null
    removePlayingCues()
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
    this.hasDrawnCues = false
    this.scheduleNotesToPlay()
    this.draw()
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
    const { audioCtx, bpm } = this
    const notes = this.getNotesAtCurrentStep()
    playNotesAtTime({ notes, duration: stepPerSec(bpm), audioCtx })
  }

  private draw = () => {
    const { prevStep, step, draw, isOn } = this
    if (!this.hasDrawnCues) {
      drawPlayingCues(prevStep, step)
      this.hasDrawnCues = true
    }
    if (isOn) {
      requestAnimationFrame(draw)
    }
  }

}
