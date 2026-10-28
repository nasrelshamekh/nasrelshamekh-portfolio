import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { pointer, follow } from '../../core/clock'

export function CustomCursor() {
  const cursorDot = useRef()
  const cursorRing = useRef()

  useEffect(() => {
    // Only run on desktop with pointer
    if (typeof window === 'undefined' || window.matchMedia('(pointer: coarse)').matches) {
      return
    }

    const dot = cursorDot.current
    const ring = cursorRing.current
    if (!dot || !ring) return

    let currentX = window.innerWidth / 2
    let currentY = window.innerHeight / 2

    const tickerCallback = (time, deltaTime) => {
      const dt = Math.min(deltaTime / 1000, 0.1)

      // Ring chases pointer with smooth damping
      currentX = follow(currentX, pointer.targetX, 22, dt)
      currentY = follow(currentY, pointer.targetY, 22, dt)

      // Direct placement for inner dot (zero lag), damped placement for outer ring
      dot.style.transform = `translate3d(${pointer.targetX}px, ${pointer.targetY}px, 0)`
      ring.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`
    }

    gsap.ticker.add(tickerCallback)
    return () => gsap.ticker.remove(tickerCallback)
  }, [])

  return (
    <>
      {/* Precision Center Dot */}
      <div
        ref={cursorDot}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '6px',
          height: '6px',
          marginTop: '-3px',
          marginLeft: '-3px',
          borderRadius: '50%',
          backgroundColor: '#00f5d4',
          pointerEvents: 'none',
          zIndex: 99999,
          willChange: 'transform',
          boxShadow: '0 0 10px #00f5d4',
        }}
      />
      {/* Precision Damped Crosshair Ring */}
      <div
        ref={cursorRing}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '32px',
          height: '32px',
          marginTop: '-16px',
          marginLeft: '-16px',
          borderRadius: '50%',
          border: '1px solid rgba(0, 245, 212, 0.45)',
          pointerEvents: 'none',
          zIndex: 99998,
          willChange: 'transform',
          transition: 'width 0.2s, height 0.2s, border-color 0.2s',
        }}
      />
    </>
  )
}
