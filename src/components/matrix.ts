let mouseup = true
let isTurningOn = true

function onMousedown(e: MouseEvent) {
  mouseup = false
  const button = e.target as HTMLElement
  isTurningOn = !button.classList.contains('on')
  button.classList.toggle('on')
}

function onMouseup() {
  mouseup = true
}

function toggleButtonOnMouseEnter(e: MouseEvent) {
  const button = e.target as HTMLElement
  if (mouseup) {
    return
  }
  const isOn = button.classList.contains('on')
  if ((isOn && !isTurningOn) || (!isOn && isTurningOn)) {
    button.classList.toggle('on')
  }
}

function createButton(row: number, col: number) {
  const button = document.createElement('button')
  button.classList.add('step-button')
  button.classList.add(`col-${col}`)
  button.dataset.row = String(row)
  button.dataset.col = String(col)
  button.addEventListener('mouseenter', toggleButtonOnMouseEnter)
  button.addEventListener('mousedown', onMousedown)
  return button
}

function createSpanButton() {
  const span = document.createElement('span')
  span.classList.add('step-buttons')
  return span
}

function createTrackNameH3(name: string) {
  const h3 = document.createElement('h3')
  h3.classList.add('track-name')
  h3.textContent = name
  return h3
}

function createTrack({ note, row, length }: { note: string, row: number, length: number }) {
  const track = document.createElement('div')
  track.classList.add('track')
  const h3 = createTrackNameH3(note)
  track.append(h3)
  const span = createSpanButton()
  track.append(span)
  const buttons = []
  for (let col = 0; col < length; col++) {
    buttons.push(createButton(row, col))
  }
  span.append(...buttons)

  return track
}

class Matrix {
  notes: string[]
  constructor(notes: string[]) {
    this.notes = notes
  }
  renderMatrix() {
    const matrixFrag = document.createDocumentFragment()
    const { notes } = this
    for (let row = 0; row < notes.length; row++) {
      const note = notes[row]
      const track = createTrack({ note, row, length: notes.length })
      matrixFrag.append(track)
    }
    const section = document.getElementById('matrix-section')
    section.append(matrixFrag)
  }
}

// document needs to be ready for this
export function renderMatrix(notes: string[]) {
  const matrix = new Matrix(notes)
  matrix.renderMatrix()
  const { body } = document
  body.addEventListener('mouseup', onMouseup)
  return matrix
}
