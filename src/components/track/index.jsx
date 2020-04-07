import React from 'react'
import StepButton from '../stepButton'
import './styles.css'

export default class Track extends React.Component {
  playEffect() {
    const { player, name } = this.props
    player.play(name)
  }

  componentDidUpdate(prev) {
    if (Number.isInteger(prev.step) && prev.isPlaying) {
      const { sequence } = this.props
      if (sequence[prev.step]) {
        this.playEffect()
      }
    }
  }

  toggleStepState = async (i) => {
    const { sequence, pos } = this.props
    const updatedSequence = [...sequence]
    const isPlaying = !updatedSequence[i]
    if (isPlaying) {
      this.playEffect()
    }
    this.props.toggleSequence(pos, i)
  }

  renderStepButtons() {
    const { step, sequence } = this.props
    const steps = []
    for (let i = 0; i < 16; i++) {
      const playingClassname = step === i ? 'playing' : ''
      steps.push(
        <StepButton
          key={i}
          step={i}
          isOn={sequence[i]}
          playing={playingClassname}
          toggleStepState={this.toggleStepState}
        />
      )
    }
    return steps
  }

  render() {
    const { name } = this.props
    return (
      <div className="track">
        <audio id={name} src={`${process.env.PUBLIC_URL}/samples/${name}.wav`} type="audio/wav"></audio>
        <h3>{this.props.name}</h3>
        <span className="step-buttons">
          {this.renderStepButtons()}
        </span>
      </div>
    )
  }
}
