function createButton(row: number, col: number) {
  const button = document.createElement('button')
  button.classList.add('step-button')
  button.classList.add(`col-${col}`)
  button.dataset.row = String(row)
  button.dataset.col = String(col)
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

function createTrack({
  note,
  row,
  length,
}: {
  note: string
  row: number
  length: number
}) {
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

export default function renderMatrix(notes: string[]) {
  const matrixFrag = document.createDocumentFragment()
  for (let row = 0; row < notes.length; row++) {
    const note = notes[row]
    const track = createTrack({ note, row, length: notes.length })
    matrixFrag.append(track)
  }
  const section = document.getElementById('matrix-section')
  section.append(matrixFrag)
}
