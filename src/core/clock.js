import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import { advance } from '@react-three/fiber'
import { updateScrollAudioVelocity } from './audio'

gsap.registerPlugin(ScrollTrigger)

// 1. Single Lenis instance with autoRaf: false
export const lenis = new Lenis({
  autoRaf: false,
  lerp: 0.08,
  smoothWheel: true,
  wheelMultiplier: 0.9,
  touchMultiplier: 1.5,
})

if (typeof window !== 'undefined') {
  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual'
  }
  window.scrollTo(0, 0)
}

// Bind Lenis scroll events to GSAP ScrollTrigger
lenis.on('scroll', ScrollTrigger.update)
gsap.ticker.lagSmoothing(0)

// 2. The "drawn" clock: 12 fps for Spider-Verse organic motion
export const twos = { frame: 0, time: 0 }
const drawnCallbacks = new Set()

export const registerOnTwos = (callback) => {
  drawnCallbacks.add(callback)
  return () => drawnCallbacks.delete(callback)
}

// 3. Pointer & Scroll Shared Bus
export const pointer = {
  x: typeof window !== 'undefined' ? window.innerWidth / 2 : 0,
  y: typeof window !== 'undefined' ? window.innerHeight / 2 : 0,
  ndcX: 0,
  ndcY: 0,
  targetX: 0,
  targetY: 0,
}

if (typeof window !== 'undefined') {
  window.addEventListener('pointermove', (e) => {
    pointer.targetX = e.clientX
    pointer.targetY = e.clientY
    pointer.ndcX = (e.clientX / window.innerWidth) * 2 - 1
    pointer.ndcY = -(e.clientY / window.innerHeight) * 2 + 1
  })
}

// 4. Match Cut Source of Truth (Research F3)
export const O = {
  x: typeof window !== 'undefined' ? window.innerWidth / 2 : 0,
  y: typeof window !== 'undefined' ? window.innerHeight / 2 : 0,
  r: 40,
  sx: 1,
  sy: 1,
  rot: 0,
  owner: 'preloader', // 'preloader' -> 'gl' -> 'ui'
}

export const handOff = (to) => {
  O.owner = to
}

// 5. Frame-rate independent exponential damping helper
export const follow = (cur, target, damping, dt) =>
  cur + (target - cur) * (1 - Math.exp(-damping * dt))

// 6. The Master Ticker: Lenis -> ScrollTrigger -> Drawn 12fps -> WebGL Advance
let isMasterClockRunning = false

export const startMasterClock = () => {
  if (isMasterClockRunning) return
  isMasterClockRunning = true

  gsap.ticker.add((time, deltaTime) => {
    const dt = Math.min(deltaTime / 1000, 0.1)

    // A. Smooth pointer chase (smooth cursor & spring physics)
    pointer.x = follow(pointer.x, pointer.targetX, 18, dt)
    pointer.y = follow(pointer.y, pointer.targetY, 18, dt)

    // B. Advance Lenis smooth scroll
    lenis.raf(time * 1000)
    updateScrollAudioVelocity(lenis.velocity)

    // C. Step drawn/generative layers at 12 fps
    const f = Math.floor(time * 12)
    if (f !== twos.frame) {
      twos.frame = f
      twos.time = time
      drawnCallbacks.forEach((cb) => {
        try {
          cb(f, time)
        } catch (err) {
          console.warn('Twos callback error:', err)
        }
      })
    }

    // D. Advance WebGL Canvas last (it reads updated scroll & O transform)
    try {
      advance(time * 1000)
    } catch {
      // If canvas is not yet mounted, advance will gracefully no-op
    }
  })
}
