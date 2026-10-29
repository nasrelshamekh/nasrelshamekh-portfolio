// Web Audio API Procedural Cyber Sound Engine
// Zero external audio assets, zero latency, ultra-tactile sci-fi feedback.

class SoundEngine {
  constructor() {
    this.ctx = null
    this.enabled = false
    this.masterGain = null
  }

  init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || window.webkitAudioContext
      if (AudioCtx) {
        this.ctx = new AudioCtx()
        this.masterGain = this.ctx.createGain()
        this.masterGain.gain.setValueAtTime(0.15, this.ctx.currentTime) // Clean, audible tactile volume
        this.masterGain.connect(this.ctx.destination)
      }
    }
  }

  toggle() {
    this.init()
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume()
    }
    this.enabled = !this.enabled
    if (this.enabled) {
      this.play('accessGranted')
    }
    return this.enabled
  }

  play(type) {
    if (!this.enabled) return
    this.init()
    if (!this.ctx) return
    if (this.ctx.state === 'suspended') {
      this.ctx.resume()
    }

    const t = this.ctx.currentTime

    switch (type) {
      // 1. Subtle, high-frequency hover blip
      case 'hover': {
        const osc = this.ctx.createOscillator()
        const gain = this.ctx.createGain()
        osc.type = 'sine'
        osc.frequency.setValueAtTime(1800, t)
        osc.frequency.exponentialRampToValueAtTime(2600, t + 0.025)

        gain.gain.setValueAtTime(0.03, t)
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.03)

        osc.connect(gain)
        gain.connect(this.masterGain)
        osc.start(t)
        osc.stop(t + 0.035)
        break
      }

      // 2. Crisp tactical switch click
      case 'click': {
        const osc = this.ctx.createOscillator()
        const gain = this.ctx.createGain()
        osc.type = 'triangle'
        osc.frequency.setValueAtTime(900, t)
        osc.frequency.exponentialRampToValueAtTime(280, t + 0.04)

        gain.gain.setValueAtTime(0.06, t)
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.045)

        osc.connect(gain)
        gain.connect(this.masterGain)
        osc.start(t)
        osc.stop(t + 0.05)
        break
      }

      // 3. Cyber Data Packet pip (used in DataFlowVisualizer)
      case 'packet': {
        const osc = this.ctx.createOscillator()
        const gain = this.ctx.createGain()
        osc.type = 'sine'
        osc.frequency.setValueAtTime(1250, t)
        osc.frequency.exponentialRampToValueAtTime(1750, t + 0.06)

        gain.gain.setValueAtTime(0.04, t)
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.07)

        osc.connect(gain)
        gain.connect(this.masterGain)
        osc.start(t)
        osc.stop(t + 0.075)
        break
      }

      // 4. Terminal mechanical keystroke
      case 'terminalKey': {
        const osc = this.ctx.createOscillator()
        const gain = this.ctx.createGain()
        osc.type = 'square'
        // Slight pitch variation like real mechanical switches
        const freq = 420 + Math.random() * 80
        osc.frequency.setValueAtTime(freq, t)
        osc.frequency.exponentialRampToValueAtTime(freq * 0.5, t + 0.03)

        gain.gain.setValueAtTime(0.025, t)
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.03)

        osc.connect(gain)
        gain.connect(this.masterGain)
        osc.start(t)
        osc.stop(t + 0.035)
        break
      }

      // 5. Scene warp sweep
      case 'warp': {
        const osc = this.ctx.createOscillator()
        const filter = this.ctx.createBiquadFilter()
        const gain = this.ctx.createGain()

        osc.type = 'sawtooth'
        osc.frequency.setValueAtTime(140, t)
        osc.frequency.exponentialRampToValueAtTime(680, t + 0.14)

        filter.type = 'lowpass'
        filter.frequency.setValueAtTime(400, t)
        filter.frequency.exponentialRampToValueAtTime(1800, t + 0.14)

        gain.gain.setValueAtTime(0.03, t)
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.16)

        osc.connect(filter)
        filter.connect(gain)
        gain.connect(this.masterGain)
        osc.start(t)
        osc.stop(t + 0.17)
        break
      }

      // 6. Access Granted / Copy Success Dual-tone Chord
      case 'accessGranted': {
        const notes = [880, 1318.5, 1760] // A5, E6, A6 major harmonic
        notes.forEach((freq, idx) => {
          const osc = this.ctx.createOscillator()
          const gain = this.ctx.createGain()
          osc.type = 'sine'
          osc.frequency.setValueAtTime(freq, t + idx * 0.04)

          gain.gain.setValueAtTime(0.03, t + idx * 0.04)
          gain.gain.exponentialRampToValueAtTime(0.001, t + idx * 0.04 + 0.18)

          osc.connect(gain)
          gain.connect(this.masterGain)
          osc.start(t + idx * 0.04)
          osc.stop(t + idx * 0.04 + 0.2)
        })
        break
      }

      default:
        break
    }
  }
}

export const sound = new SoundEngine()
