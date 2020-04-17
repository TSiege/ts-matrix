// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"audio/notes.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NOTES = ['D5', 'C5', 'B4', 'A4', 'G4', 'F4', 'E4', 'D4', 'C4', 'B3', 'A3', 'G3', 'F3', 'E3', 'D3', 'C3'];
exports.NOTES_TO_HZ = {
  'C0': 16.35,
  'C#0': 17.32,
  'Db0': 17.32,
  'D0': 18.35,
  'D#0': 19.45,
  'Eb0': 19.45,
  'E0': 20.60,
  'F0': 21.83,
  'F#0': 23.12,
  'Gb0': 23.12,
  'G0': 24.50,
  'G#0': 25.96,
  'Ab0': 25.96,
  'A0': 27.50,
  'A#0': 29.14,
  'Bb0': 29.14,
  'B0': 30.87,
  'C1': 32.70,
  'C#1': 34.65,
  'Db1': 34.65,
  'D1': 36.71,
  'D#1': 38.89,
  'Eb1': 38.89,
  'E1': 41.20,
  'F1': 43.65,
  'F#1': 46.25,
  'Gb1': 46.25,
  'G1': 49.00,
  'G#1': 51.91,
  'Ab1': 51.91,
  'A1': 55.00,
  'A#1': 58.27,
  'Bb1': 58.27,
  'B1': 61.74,
  'C2': 65.41,
  'C#2': 69.30,
  'Db2': 69.30,
  'D2': 73.42,
  'D#2': 77.78,
  'Eb2': 77.78,
  'E2': 82.41,
  'F2': 87.31,
  'F#2': 92.50,
  'Gb2': 92.50,
  'G2': 98.00,
  'G#2': 103.83,
  'Ab2': 103.83,
  'A2': 110.00,
  'A#2': 116.54,
  'Bb2': 116.54,
  'B2': 123.47,
  'C3': 130.81,
  'C#3': 138.59,
  'Db3': 138.59,
  'D3': 146.83,
  'D#3': 155.56,
  'Eb3': 155.56,
  'E3': 164.81,
  'F3': 174.61,
  'F#3': 185.00,
  'Gb3': 185.00,
  'G3': 196.00,
  'G#3': 207.65,
  'Ab3': 207.65,
  'A3': 220.00,
  'A#3': 233.08,
  'Bb3': 233.08,
  'B3': 246.94,
  'C4': 261.63,
  'C#4': 277.18,
  'Db4': 277.18,
  'D4': 293.66,
  'D#4': 311.13,
  'Eb4': 311.13,
  'E4': 329.63,
  'F4': 349.23,
  'F#4': 369.99,
  'Gb4': 369.99,
  'G4': 392.00,
  'G#4': 415.30,
  'Ab4': 415.30,
  'A4': 440.00,
  'A#4': 466.16,
  'Bb4': 466.16,
  'B4': 493.88,
  'C5': 523.25,
  'C#5': 554.37,
  'Db5': 554.37,
  'D5': 587.33,
  'D#5': 622.25,
  'Eb5': 622.25,
  'E5': 659.26,
  'F5': 698.46,
  'F#5': 739.99,
  'Gb5': 739.99,
  'G5': 783.99,
  'G#5': 830.61,
  'Ab5': 830.61,
  'A5': 880.00,
  'A#5': 932.33,
  'Bb5': 932.33,
  'B5': 987.77,
  'C6': 1046.50,
  'C#6': 1108.73,
  'Db6': 1108.73,
  'D6': 1174.66,
  'D#6': 1244.51,
  'Eb6': 1244.51,
  'E6': 1318.51,
  'F6': 1396.91,
  'F#6': 1479.98,
  'Gb6': 1479.98,
  'G6': 1567.98,
  'G#6': 1661.22,
  'Ab6': 1661.22,
  'A6': 1760.00,
  'A#6': 1864.66,
  'Bb6': 1864.66,
  'B6': 1975.53,
  'C7': 2093.00,
  'C#7': 2217.46,
  'Db7': 2217.46,
  'D7': 2349.32,
  'D#7': 2489.02,
  'Eb7': 2489.02,
  'E7': 2637.02,
  'F7': 2793.83,
  'F#7': 2959.96,
  'Gb7': 2959.96,
  'G7': 3135.96,
  'G#7': 3322.44,
  'Ab7': 3322.44,
  'A7': 3520.00,
  'A#7': 3729.31,
  'Bb7': 3729.31,
  'B7': 3951.07,
  'C8': 4186.01
};
},{}],"matrix/renderers.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function createButton(row, col) {
  var button = document.createElement('button');
  button.classList.add('step-button');
  button.classList.add("col-" + col);
  button.dataset.row = String(row);
  button.dataset.col = String(col);
  return button;
}

function createSpanButton() {
  var span = document.createElement('span');
  span.classList.add('step-buttons');
  return span;
}

function createTrackNameH3(name) {
  var h3 = document.createElement('h3');
  h3.classList.add('track-name');
  h3.textContent = name;
  return h3;
}

function createTrack(_a) {
  var note = _a.note,
      row = _a.row,
      length = _a.length;
  var track = document.createElement('div');
  track.classList.add('track');
  var h3 = createTrackNameH3(note);
  track.append(h3);
  var span = createSpanButton();
  track.append(span);
  var buttons = [];

  for (var col = 0; col < length; col++) {
    buttons.push(createButton(row, col));
  }

  span.append.apply(span, buttons);
  return track;
}

function renderMatrix(notes) {
  var matrixFrag = document.createDocumentFragment();

  for (var row = 0; row < notes.length; row++) {
    var note = notes[row];
    var track = createTrack({
      note: note,
      row: row,
      length: notes.length
    });
    matrixFrag.append(track);
  }

  var section = document.getElementById('matrix-section');
  section.append(matrixFrag);
}

exports.default = renderMatrix;
},{}],"matrix/events.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var mouseup = true;
var isTurningOn = true;
var playSVGStr = '<svg width="20" height="20" viewBox="0 0 494.942 494.942" xmlns="http://www.w3.org/2000/svg"><path d="m35.353 0 424.236 247.471-424.236 247.471z"></path></svg>';
var pauseSVGStr = '<svg width="15" height="15" viewBox="0 0 424.236 424.236" xmlns="http://www.w3.org/2000/svg"><path d="m247.471 0h176.765v424.236h-176.765z" id="path-1_5_" transform="translate(9 2)"></path><path id="path-1_4_" d="m0 0h176.765v424.236h-176.765z" transform="translate(2 2)"></path></svg>';

function togglePlay(metronome) {
  return function () {
    var playButton = document.getElementById('play');
    var isOn = playButton.classList.contains('on');
    playButton.classList.toggle('on');

    if (isOn) {
      playButton.innerHTML = playSVGStr;
      metronome.pause();
    } else {
      playButton.innerHTML = pauseSVGStr;
      metronome.play();
    }
  };
}

function turnOff(metronome) {
  return function () {
    var playButton = document.getElementById('play');
    var isOn = playButton.classList.contains('on');

    if (isOn) {
      playButton.classList.toggle('on');
      playButton.innerHTML = playSVGStr;
    }

    metronome.stop();
  };
}

function addEventHandlersToControls(metronome) {
  var playButton = document.getElementById('play');
  var stopButton = document.getElementById('stop');
  playButton.addEventListener('click', togglePlay(metronome));
  stopButton.addEventListener('click', turnOff(metronome));
}

function onMousedown(metronome) {
  return function (e) {
    mouseup = false;
    var button = e.target;
    isTurningOn = !button.classList.contains('on');
    button.classList.toggle('on');
    var row = Number(button.dataset.row);
    var col = Number(button.dataset.col);
    metronome.toggleMatrix(row, col);
  };
}

function onMouseup() {
  mouseup = true;
}

function toggleButtonOnMouseEnter(metronome) {
  return function (e) {
    if (mouseup) {
      return;
    }

    var button = e.target;
    var isOn = button.classList.contains('on');

    if (isOn && !isTurningOn || !isOn && isTurningOn) {
      button.classList.toggle('on');
      var row = Number(button.dataset.row);
      var col = Number(button.dataset.col);
      metronome.toggleMatrix(row, col);
    }
  };
}

function addEventHandlersToMatrix(metronome) {
  var toggleButtonCB = toggleButtonOnMouseEnter(metronome);
  var onMousedownCB = onMousedown(metronome);
  document.body.addEventListener('mouseup', onMouseup);
  var stepButtons = document.getElementsByClassName('step-button');

  for (var _i = 0, stepButtons_1 = stepButtons; _i < stepButtons_1.length; _i++) {
    var button = stepButtons_1[_i];
    button.addEventListener('mouseenter', toggleButtonCB);
    button.addEventListener('mousedown', onMousedownCB);
  }
}

function addEventHandlers(metronome) {
  addEventHandlersToControls(metronome);
  addEventHandlersToMatrix(metronome);
}

exports.default = addEventHandlers;
},{}],"matrix/index.ts":[function(require,module,exports) {
"use strict";

var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

var __generator = this && this.__generator || function (thisArg, body) {
  var _ = {
    label: 0,
    sent: function sent() {
      if (t[0] & 1) throw t[1];
      return t[1];
    },
    trys: [],
    ops: []
  },
      f,
      y,
      t,
      g;
  return g = {
    next: verb(0),
    "throw": verb(1),
    "return": verb(2)
  }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
    return this;
  }), g;

  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }

  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");

    while (_) {
      try {
        if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
        if (y = 0, t) op = [op[0] & 2, t.value];

        switch (op[0]) {
          case 0:
          case 1:
            t = op;
            break;

          case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };

          case 5:
            _.label++;
            y = op[1];
            op = [0];
            continue;

          case 7:
            op = _.ops.pop();

            _.trys.pop();

            continue;

          default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
              _ = 0;
              continue;
            }

            if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }

            if (op[0] === 6 && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }

            if (t && _.label < t[2]) {
              _.label = t[2];

              _.ops.push(op);

              break;
            }

            if (t[2]) _.ops.pop();

            _.trys.pop();

            continue;
        }

        op = body.call(thisArg, _);
      } catch (e) {
        op = [6, e];
        y = 0;
      } finally {
        f = t = 0;
      }
    }

    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
};

var __spreadArrays = this && this.__spreadArrays || function () {
  for (var s = 0, i = 0, il = arguments.length; i < il; i++) {
    s += arguments[i].length;
  }

  for (var r = Array(s), k = 0, i = 0; i < il; i++) {
    for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++) {
      r[k] = a[j];
    }
  }

  return r;
};

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var renderers_1 = __importDefault(require("./renderers"));

var events_1 = __importDefault(require("./events"));

function render(_a) {
  var notes = _a.notes,
      metronome = _a.metronome;
  renderers_1.default(notes);
  events_1.default(metronome);
}

exports.render = render;

function drawPlayingCues(prevStep, nextStep) {
  if (prevStep !== undefined) {
    var elsToStopPlaying = __spreadArrays(document.getElementsByClassName("col-" + prevStep));

    for (var _i = 0, elsToStopPlaying_1 = elsToStopPlaying; _i < elsToStopPlaying_1.length; _i++) {
      var el = elsToStopPlaying_1[_i];
      el.classList.remove('playing');
    }
  }

  if (nextStep !== undefined) {
    var elsToPlay = __spreadArrays(document.getElementsByClassName("col-" + nextStep));

    for (var _a = 0, elsToPlay_1 = elsToPlay; _a < elsToPlay_1.length; _a++) {
      var el = elsToPlay_1[_a];
      el.classList.add('playing');
    }
  }
}

exports.drawPlayingCues = drawPlayingCues;

function removePlayingCues() {
  return __awaiter(this, void 0, void 0, function () {
    var elsToStopPlaying, _i, elsToStopPlaying_2, el;

    return __generator(this, function (_a) {
      elsToStopPlaying = __spreadArrays(document.getElementsByClassName('playing'));

      for (_i = 0, elsToStopPlaying_2 = elsToStopPlaying; _i < elsToStopPlaying_2.length; _i++) {
        el = elsToStopPlaying_2[_i];
        el.classList.remove('playing');
      }

      return [2
      /*return*/
      ];
    });
  });
}

exports.removePlayingCues = removePlayingCues;
},{"./renderers":"matrix/renderers.ts","./events":"matrix/events.ts"}],"audio/index.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var notes_1 = require("./notes"); // figured out by trial and error


var gains = {
  1: 1 / 1 - 0.5,
  2: 1 / 2 - 0.25,
  3: 1 / 3 - 0.1,
  4: 1 / 4 - 0.1,
  5: 1 / 5 - 0.1,
  6: 1 / 6 - 0.1,
  7: 1 / 7 - 0.05,
  8: 1 / 8 - 0.05,
  9: 1 / 9 - 0.05,
  10: 1 / 10 - 0.05,
  11: 1 / 11 - 0.05,
  12: 1 / 12 - 0.05,
  13: 1 / 13 - 0.05,
  14: 1 / 14 - 0.1,
  15: 1 / 15 - 0.1,
  16: 1 / 16 - 0.1
};

function createAndSetupOscNode(_a) {
  var hz = _a.hz,
      audioCtx = _a.audioCtx,
      gain = _a.gain;
  var osc = audioCtx.createOscillator();
  osc.frequency.value = hz;
  osc.connect(gain);
  return osc;
}

function playNote(_a) {
  var note = _a.note,
      audioCtx = _a.audioCtx;
  var gainNode = audioCtx.createGain();
  gainNode.connect(audioCtx.destination);
  gainNode.gain.setTargetAtTime(0, audioCtx.currentTime, 0);
  var osc = createAndSetupOscNode({
    hz: notes_1.NOTES_TO_HZ[note],
    audioCtx: audioCtx,
    gain: gainNode
  });
  osc.start(audioCtx.currentTime);
  gainNode.gain.setTargetAtTime(0.4, audioCtx.currentTime, 0.05);
  gainNode.gain.setTargetAtTime(0.0001, audioCtx.currentTime + 0.25, 0.125);
  osc.stop(audioCtx.currentTime + 1);
}

exports.playNote = playNote;

function playNotesAtTime(_a) {
  var notes = _a.notes,
      duration = _a.duration,
      audioCtx = _a.audioCtx;

  if (!notes.length) {
    return;
  }

  var targetGain = gains[notes.length];
  var gainNode = audioCtx.createGain();
  var sourceNodes = notes.map(function (note) {
    return createAndSetupOscNode({
      hz: notes_1.NOTES_TO_HZ[note],
      audioCtx: audioCtx,
      gain: gainNode
    });
  });
  gainNode.gain.setTargetAtTime(0, audioCtx.currentTime, 0);
  gainNode.connect(audioCtx.destination);
  sourceNodes.forEach(function (sn) {
    return sn.start();
  });
  gainNode.gain.setTargetAtTime(targetGain, audioCtx.currentTime, 0.05);
  gainNode.gain.setTargetAtTime(0.0001, audioCtx.currentTime + duration * 2, 0.125);
  sourceNodes.forEach(function (sn) {
    return sn.stop(audioCtx.currentTime + duration * 10);
  });
}

exports.playNotesAtTime = playNotesAtTime;
},{"./notes":"audio/notes.ts"}],"metronome/index.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var audio_1 = require("../audio");

var matrix_1 = require("../matrix");

function stepPerSec(bpm) {
  if (bpm === void 0) {
    bpm = 128;
  }

  return 60 / bpm * 4 / 16;
}

function stepPerMs(bpm) {
  if (bpm === void 0) {
    bpm = 128;
  }

  return stepPerSec(bpm) * 1000;
}

var Metronome =
/** @class */
function () {
  function Metronome(notes) {
    var _this = this; // private methods


    this.intervalCb = function () {
      var step = _this.step;

      if (step === null || step === 15) {
        _this.step = 0;
      } else {
        _this.step += 1;
      }

      _this.prevStep = step;
      _this.hasDrawnCues = false;

      _this.scheduleNotesToPlay();

      _this.draw();
    };

    this.draw = function () {
      var _a = _this,
          prevStep = _a.prevStep,
          step = _a.step,
          draw = _a.draw,
          isOn = _a.isOn;

      if (!_this.hasDrawnCues) {
        matrix_1.drawPlayingCues(prevStep, step);
        _this.hasDrawnCues = true;
      }

      if (isOn) {
        requestAnimationFrame(draw);
      }
    };

    var AudioContext = window.AudioContext || window.webkitAudioContext;
    this.bpm = 128;
    this.isOn = false;
    this.step = null;
    this.notes = notes;
    this.interval = null;
    this.audioCtx = new AudioContext();
    this.hasDrawnCues = false;
    this.matrix = notes.map(function () {
      return new Array(notes.length).fill(false);
    });
  }

  Metronome.prototype.toggleMatrix = function (row, col) {
    var _a = this,
        matrix = _a.matrix,
        notes = _a.notes,
        audioCtx = _a.audioCtx;

    var isOn = !matrix[row][col];
    matrix[row][col] = isOn;

    if (isOn) {
      audio_1.playNote({
        note: notes[row],
        audioCtx: audioCtx
      });
    }
  };

  Metronome.prototype.play = function () {
    var _a = this,
        intervalCb = _a.intervalCb,
        bpm = _a.bpm;

    this.interval = setInterval(intervalCb, stepPerMs(bpm));
    this.isOn = true;
  };

  Metronome.prototype.pause = function () {
    var interval = this.interval;
    interval && clearInterval(interval);
    this.isOn = false;
  };

  Metronome.prototype.stop = function () {
    this.pause();
    this.step = null;
    this.prevStep = null;
    matrix_1.removePlayingCues();
  };

  Metronome.prototype.getNotesAtCurrentStep = function () {
    var _a = this,
        step = _a.step,
        notes = _a.notes,
        matrix = _a.matrix;

    var onNotes = [];

    for (var i = 0; i < matrix.length; i++) {
      var isOn = matrix[i][step];

      if (isOn) {
        onNotes.push(notes[i]);
      }
    }

    return onNotes;
  };

  Metronome.prototype.scheduleNotesToPlay = function () {
    var _a = this,
        audioCtx = _a.audioCtx,
        bpm = _a.bpm;

    var notes = this.getNotesAtCurrentStep();
    audio_1.playNotesAtTime({
      notes: notes,
      duration: stepPerSec(bpm),
      audioCtx: audioCtx
    });
  };

  return Metronome;
}();

exports.default = Metronome;
},{"../audio":"audio/index.ts","../matrix":"matrix/index.ts"}],"index.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var notes_1 = require("./audio/notes");

var matrix_1 = require("./matrix");

var metronome_1 = __importDefault(require("./metronome"));

function onReady(fn) {
  if (document.readyState !== 'loading') {
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', function () {
      return fn();
    });
  }
}

function renderJsMatrix() {
  var metronome = new metronome_1.default(notes_1.NOTES);
  matrix_1.render({
    notes: notes_1.NOTES,
    metronome: metronome
  });
}

onReady(renderJsMatrix);
},{"./audio/notes":"audio/notes.ts","./matrix":"matrix/index.ts","./metronome":"metronome/index.ts"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "53021" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.ts"], null)
//# sourceMappingURL=/src.77de5100.js.map