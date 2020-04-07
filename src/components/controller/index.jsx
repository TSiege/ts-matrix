import React from 'react'
import Track from '../track'
import { deepClone, stepPerMs } from '../../utils'
import { NOTES, SEQUENCES } from '../../utils/data'
import { TonePlayer } from '../../utils/audio'
import './styles.css'

export default class Controller extends React.Component {
  constructor(props) {
    super(props)
    const audioCtx = new AudioContext()
    const player = new TonePlayer(audioCtx)

    this.state = {
      bpm: 128,
      step: null,
      interval: null,
      isPlaying: false,
      audioCtx,
      player,
      sequences: [...deepClone(SEQUENCES)]
    }
  }

  interval = () => {
    const { step } = this.state
    if (step === null || step === 15) {
      this.setState({ step: 0 })
    } else {
      this.setState({ step: step + 1 })
    }
  }

  stop = () => {
    const { interval } = this.state
    clearInterval(interval)
    this.setState({ interval: null, isPlaying: false, step: null })
  }

  togglePlay = () => {
    const { isPlaying, interval, bpm } = this.state
    if (isPlaying) {
      clearInterval(interval)
      this.setState({ isPlaying: false, interval: null })
    } else {
      const interval = setInterval(this.interval, stepPerMs(bpm))
      this.setState({ isPlaying: true, interval })
    }
  }

  updateBpm = ({ target: { value }}) => {
    const { interval: oldInterval, isPlaying } = this.state
    if (isNaN(Number(value))) {
      return
    }
    if (isPlaying) {
      clearInterval(oldInterval)
      const interval = setInterval(this.interval, stepPerMs(value))
      this.setState({ interval, bpm: value })
    } else {
      this.setState({ bpm: value })
    }
  }

  selectSequence = (name) => {
    this.setState({ ...deepClone(SEQUENCES[name]) })
  }

  toggleSequence = (pos, i) => {
    console.log({ pos, i })
    const sequence = this.state.sequences[pos]
    const step = sequence[i]
    sequence[i] = !step
    console.log({ i, pos, step })
    this.setState({ sequences: this.state.sequences })
  }

  renderPlayButton() {
    const { isPlaying } = this.state
    const innerHTML = isPlaying ?
      <svg width="15" height="15" id="Capa_1"  viewBox="0 0 424.236 424.236" xmlns="http://www.w3.org/2000/svg"><path id="path-1_5_" d="m247.471 0h176.765v424.236h-176.765z" transform="translate(9 2)"/><path id="path-1_4_" d="m0 0h176.765v424.236h-176.765z" transform="translate(2 2)"/></svg> :
      <svg width="20" height="20" viewBox="0 0 494.942 494.942" xmlns="http://www.w3.org/2000/svg"><path d="m35.353 0 424.236 247.471-424.236 247.471z"/></svg>
    return <button className="play" onClick={this.togglePlay}>{innerHTML}</button>
  }

  renderSteps() {
    const { step } = this.state
    const steps = []
    for (let i = 0; i < 16; i++) {
      const playingClassname = step === i ? 'playing' : ''
      steps.push(<span key={i} className={`step ${playingClassname}`}>{i + 1}</span>)
    }
    return steps
  }

  renderTracks() {
    const { step, isPlaying, sequences, player } = this.state
    return sequences.map((sequence, i) => {
      const note = NOTES[i]
      return <Track
        key={i}
        pos={i}
        name={note}
        step={step}
        player={player}
        isPlaying={isPlaying}
        sequence={sequence}
        toggleSequence={this.toggleSequence}
      />
    })
  }

render() {
    return (
      <div className="controller">
        <div className="header">
          <h1 className="title">JS-Matrix</h1>
          <span className="toolbar">
            <button className="stop" onClick={this.stop}>
              <svg width="15" height="15" id="Layer_1" viewBox="0 0 506.1 506.1" xmlns="http://www.w3.org/2000/svg"><path d="m489.609 0h-473.118c-9.108 0-16.491 7.383-16.491 16.491v473.118c0 9.107 7.383 16.491 16.491 16.491h473.119c9.107 0 16.49-7.383 16.49-16.491v-473.118c0-9.108-7.383-16.491-16.491-16.491z"/></svg>
            </button>
            {this.renderPlayButton()}
          </span>
        </div>
        <div className="steps">
          {this.renderSteps()}
        </div>
        <section className="tracks">
          {this.renderTracks()}
        </section>
      </div>
    )
  }
}
