import React from 'react'
import ReactDOM from 'react-dom'
import App from './App.js'
import './index.css'

import { fetchAudioFile, generateToneBuffer, generateToneBuffers } from './utils/audio/.'

window.fetchAudioFile = fetchAudioFile
window.generateToneBuffer = generateToneBuffer
window.generateToneBuffers = generateToneBuffers

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
