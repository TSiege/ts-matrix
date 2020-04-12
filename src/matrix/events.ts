import Metronome from '../metronome'

let mouseup = true
let isTurningOn = true
const playSVGStr = '<svg width="20" height="20" viewBox="0 0 494.942 494.942" xmlns="http://www.w3.org/2000/svg"><path d="m35.353 0 424.236 247.471-424.236 247.471z"></path></svg>'
const pauseSVGStr = '<svg width="15" height="15" viewBox="0 0 424.236 424.236" xmlns="http://www.w3.org/2000/svg"><path d="m247.471 0h176.765v424.236h-176.765z" id="path-1_5_" transform="translate(9 2)"></path><path id="path-1_4_" d="m0 0h176.765v424.236h-176.765z" transform="translate(2 2)"></path></svg>'

function togglePlay(metronome: Metronome) {
  return () => {
    const playButton = document.getElementById('play')
    const isOn = playButton.classList.contains('on')
    playButton.classList.toggle('on')
    if (isOn) {
      playButton.innerHTML = playSVGStr
      metronome.pause()
    } else {
      playButton.innerHTML = pauseSVGStr
      metronome.play()
    }
  }
}

function turnOff(metronome: Metronome) {
  return () => {
    const playButton = document.getElementById('play')
    const isOn = playButton.classList.contains('on')
    if (isOn) {
      playButton.classList.toggle('on')
      playButton.innerHTML = playSVGStr
      metronome.stop()
    }
  }
}

function addEventHandlersToControls(metronome: Metronome) {
  const playButton = document.getElementById('play')
  const stopButton = document.getElementById('stop')
  playButton.addEventListener('click', togglePlay(metronome))
  stopButton.addEventListener('click', turnOff(metronome))
}

function onMousedown(metronome: Metronome) {
  return (e: MouseEvent) => {
    mouseup = false
    const button = e.target as HTMLElement
    isTurningOn = !button.classList.contains('on')
    button.classList.toggle('on')
    const row = Number(button.dataset.row)
    const col = Number(button.dataset.col)
    metronome.toggleMatrix(row, col)
  }
}

function onMouseup() {
  mouseup = true
}

function toggleButtonOnMouseEnter(metronome: Metronome) {
  return (e: MouseEvent) => {
    if (mouseup) {
      return
    }
    const button = e.target as HTMLElement
    const isOn = button.classList.contains('on')
    if ((isOn && !isTurningOn) || (!isOn && isTurningOn)) {
      button.classList.toggle('on')
      const row = Number(button.dataset.row)
      const col = Number(button.dataset.col)
      metronome.toggleMatrix(row, col)
    }
  }
}

function addEventHandlersToMatrix(metronome: Metronome) {
  const toggleButtonCB = toggleButtonOnMouseEnter(metronome)
  const onMousedownCB = onMousedown(metronome)
  document.body.addEventListener('mouseup', onMouseup)
  const stepButtons = document.getElementsByClassName('step-button')
  for (const button of stepButtons) {
    button.addEventListener('mouseenter', toggleButtonCB)
    button.addEventListener('mousedown', onMousedownCB)
  }
}

export default function addEventHandlers(metronome: Metronome) {
  addEventHandlersToControls(metronome)
  addEventHandlersToMatrix(metronome)
}
