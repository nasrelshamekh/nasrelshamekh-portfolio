// Web Audio Generative Synthesizer Engine (Opt-in, Zero external assets)
// Implements Research F1/F6: Discrete Foley + Continuous scroll velocity tracking

let audioCtx = null
let masterGain = null
let isMuted = true

// Continuous scroll friction loop (Research Section 6)
let scrollLoopNode = null
let scrollFilter = null
let scrollGainNode = null

const listeners = new Set()

export const getAudioState = () => ({
  isMuted,
  isReady: !!audioCtx,
})

export const subscribeAudioState = (cb) => {
  listeners.add(cb)
  cb(getAudioState())
  return () => listeners.delete(cb)
}

const notifyListeners = () => {
  const state = getAudioState()
  listeners.forEach((cb) => cb(state))
}

// Generate 2 seconds of calibrated pink/brownian noise in memory
function createNoiseBuffer(ctx) {
  const bufferSize = ctx.sampleRate * 2
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
  const output = buffer.getChannelData(0)
  let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0

  for (let i = 0; i < bufferSize; i++) {
    const white = Math.random() * 2 - 1
    b0 = 0.99886 * b0 + white * 0.0555179
    b1 = 0.99332 * b1 + white * 0.0750759
    b2 = 0.96900 * b2 + white * 0.1538520
    b3 = 0.86650 * b3 + white * 0.3104856
    b4 = 0.55000 * b4 + white * 0.5329522
    b5 = -0.7616 * b5 - white * 0.0168980
    output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.03
    b6 = white * 0.115926
  }
  return buffer
}

function initContinuousScrollSynth() {
  if (!audioCtx || scrollLoopNode) return

  try {
    const noiseBuffer = createNoiseBuffer(audioCtx)
    scrollLoopNode = audioCtx.createBufferSource()
    scrollLoopNode.buffer = noiseBuffer
    scrollLoopNode.loop = true

    scrollFilter = audioCtx.createBiquadFilter()
    scrollFilter.type = 'bandpass'
    scrollFilter.frequency.setValueAtTime(350, audioCtx.currentTime)
    scrollFilter.Q.setValueAtTime(2.5, audioCtx.currentTime)

    scrollGainNode = audioCtx.createGain()
    scrollGainNode.gain.setValueAtTime(0, audioCtx.currentTime)

    scrollLoopNode.connect(scrollFilter)
    scrollFilter.connect(scrollGainNode)
    scrollGainNode.connect(masterGain)

    scrollLoopNode.start(0)
  } catch (err) {
    console.warn('Scroll synth init error:', err)
  }
}

const initContext = () => {
  if (!audioCtx && typeof window !== 'undefined') {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext
    if (AudioContextClass) {
      audioCtx = new AudioContextClass()
      masterGain = audioCtx.createGain()
      masterGain.gain.setValueAtTime(0, audioCtx.currentTime)
      masterGain.connect(audioCtx.destination)
      initContinuousScrollSynth()
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume()
  }
}

export const toggleAudio = () => {
  initContext()
  if (!audioCtx) return false

  isMuted = !isMuted
  if (masterGain) {
    const targetGain = isMuted ? 0 : 0.18
    masterGain.gain.setTargetAtTime(targetGain, audioCtx.currentTime, 0.05)
  }
  notifyListeners()
  return !isMuted
}

// Update continuous scroll audio: fast attack (0.02s), slow release (0.28s)
export const updateScrollAudioVelocity = (velocity) => {
  if (isMuted || !audioCtx || !scrollGainNode || !scrollFilter) return

  const absVel = Math.abs(velocity || 0)
  // Normalize scroll speed 0..1
  const norm = Math.min(absVel / 35, 1)

  const now = audioCtx.currentTime
  const targetGain = norm * 0.08
  const currentGain = scrollGainNode.gain.value
  const timeConstant = targetGain > currentGain ? 0.02 : 0.28 // Fast attack, slow release

  scrollGainNode.gain.setTargetAtTime(targetGain, now, timeConstant)

  // Shift bandpass cutoff frequency upwards with velocity (300Hz -> 1400Hz)
  const targetFreq = 300 + norm * 1100
  scrollFilter.frequency.setTargetAtTime(targetFreq, now, 0.05)
}

// Micro-interaction 1: Subdued glass tick on hover
export const playHoverTick = () => {
  if (isMuted || !audioCtx) return
  try {
    const osc = audioCtx.createOscillator()
    const gain = audioCtx.createGain()
    const now = audioCtx.currentTime

    osc.type = 'sine'
    osc.frequency.setValueAtTime(880, now)
    osc.frequency.exponentialRampToValueAtTime(1440, now + 0.02)

    gain.gain.setValueAtTime(0.04, now)
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.035)

    osc.connect(gain)
    gain.connect(masterGain)

    osc.start(now)
    osc.stop(now + 0.04)
  } catch {}
}

// Micro-interaction 2: Magnetic snap on button / card interaction
export const playMagneticSnap = () => {
  if (isMuted || !audioCtx) return
  try {
    const osc = audioCtx.createOscillator()
    const gain = audioCtx.createGain()
    const now = audioCtx.currentTime

    osc.type = 'triangle'
    osc.frequency.setValueAtTime(320, now)
    osc.frequency.exponentialRampToValueAtTime(120, now + 0.08)

    gain.gain.setValueAtTime(0.08, now)
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.08)

    osc.connect(gain)
    gain.connect(masterGain)

    osc.start(now)
    osc.stop(now + 0.09)
  } catch {}
}

// Micro-interaction 3: Low warm neural pulse on section transitions
export const playNeuralPulse = () => {
  if (isMuted || !audioCtx) return
  try {
    const osc = audioCtx.createOscillator()
    const filter = audioCtx.createBiquadFilter()
    const gain = audioCtx.createGain()
    const now = audioCtx.currentTime

    osc.type = 'sine'
    osc.frequency.setValueAtTime(65, now)
    osc.frequency.exponentialRampToValueAtTime(130, now + 0.4)

    filter.type = 'lowpass'
    filter.frequency.setValueAtTime(240, now)

    gain.gain.setValueAtTime(0.12, now)
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.45)

    osc.connect(filter)
    filter.connect(gain)
    gain.connect(masterGain)

    osc.start(now)
    osc.stop(now + 0.46)
  } catch {}
}

// Micro-interaction 4: Shimmering quantum chord for prompt submit
export const playQuantumChime = () => {
  if (isMuted || !audioCtx) return
  try {
    const freqs = [523.25, 659.25, 783.99, 1046.5] // C Major 7th shimmer
    const now = audioCtx.currentTime

    freqs.forEach((freq, i) => {
      const osc = audioCtx.createOscillator()
      const gain = audioCtx.createGain()

      osc.type = 'sine'
      osc.frequency.setValueAtTime(freq, now + i * 0.04)

      gain.gain.setValueAtTime(0.04, now + i * 0.04)
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.6)

      osc.connect(gain)
      gain.connect(masterGain)

      osc.start(now + i * 0.04)
      osc.stop(now + 0.65)
    })
  } catch {}
}

// Micro-interaction 5: Reverse sweep when rewinding to top
export const playReverseSweep = () => {
  if (isMuted || !audioCtx) return
  try {
    const osc = audioCtx.createOscillator()
    const gain = audioCtx.createGain()
    const now = audioCtx.currentTime

    osc.type = 'sine'
    osc.frequency.setValueAtTime(110, now)
    osc.frequency.exponentialRampToValueAtTime(880, now + 2.5)

    gain.gain.setValueAtTime(0.01, now)
    gain.gain.linearRampToValueAtTime(0.08, now + 1.8)
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.6)

    osc.connect(gain)
    gain.connect(masterGain)

    osc.start(now)
    osc.stop(now + 2.6)
  } catch {}
}
