import React, { useEffect, useState, useRef, useCallback } from 'react'
import { getStroke } from 'perfect-freehand'
import gsap from 'gsap-trial'
import { registerOnTwos, handOff } from '../../core/clock'
import { playNeuralPulse } from '../../core/audio'

// Helper to convert getStroke polygon coordinates to SVG path string
function toSvgPath(points) {
  if (!points || points.length < 4) return ''
  const f = (n) => Number(n).toFixed(1)
  const mid = (a, b) => `${f((a[0] + b[0]) / 2)},${f((a[1] + b[1]) / 2)}`
  let d = `M ${f(points[0][0])} ${f(points[0][1])} Q `
  for (let i = 0; i < points.length; i++) {
    const next = points[(i + 1) % points.length]
    d += `${f(points[i][0])} ${f(points[i][1])} ${mid(points[i], next)} `
  }
  return d + ' Z'
}

// Pseudo-random seeded hash
const rnd = (n) => {
  const s = Math.sin(n * 127.1) * 43758.5453
  return s - Math.floor(s)
}

export function NeuralPreloader({ onComplete }) {
  const [visible, setVisible] = useState(true)
  const [pathD, setPathD] = useState('')
  const containerRef = useRef()
  const progressRef = useRef({ val: 0 })
  const isDismissing = useRef(false)

  // Generate an organic Lissajous / Infinity loop of points
  const rawPoints = useRef([])

  useEffect(() => {
    const pts = []
    const count = 100
    const w = 260
    const h = 130
    for (let i = 0; i <= count; i++) {
      const t = (i / count) * Math.PI * 2
      const x = (w * Math.cos(t)) / (1 + Math.sin(t) * Math.sin(t)) + 300
      const y = (h * Math.sin(t) * Math.cos(t)) / (1 + Math.sin(t) * Math.sin(t)) + 150
      pts.push([x, y, 0.5])
    }
    rawPoints.current = pts
  }, [])

  const dismiss = useCallback(() => {
    if (isDismissing.current) return
    isDismissing.current = true

    playNeuralPulse()
    handOff('gl')

    if (containerRef.current) {
      gsap.to(containerRef.current, {
        opacity: 0,
        scale: 1.05,
        duration: 0.6,
        ease: 'power3.inOut',
        onComplete: () => {
          setVisible(false)
          if (onComplete) onComplete()
        },
      })
    } else {
      setVisible(false)
      if (onComplete) onComplete()
    }
  }, [onComplete])

  useEffect(() => {
    // 1. Animate progress 0 -> 1 over 1.5 seconds, then dismiss
    const tween = gsap.to(progressRef.current, {
      val: 1,
      duration: 1.5,
      ease: 'power2.inOut',
      onComplete: () => {
        dismiss()
      },
    })

    // 2. Safety timeout: under no circumstances should it stay more than 2.2s
    const safetyTimer = setTimeout(() => {
      dismiss()
    }, 2200)

    // 3. Spider-Verse 12 fps clock: re-calculate boil and progressive stroke
    const unregister = registerOnTwos((frame) => {
      if (isDismissing.current || rawPoints.current.length === 0) return

      const progress = progressRef.current.val
      const seed = frame % 3
      const upTo = Math.max(3, Math.ceil(rawPoints.current.length * progress))

      // Apply 3-seed boil (Research F2: 0.8px offset without SVG filters)
      const currentPts = rawPoints.current.slice(0, upTo).map(([x, y, p], i) => [
        x + (rnd(seed * 131 + i) - 0.5) * 1.6,
        y + (rnd(seed * 173 + i * 1.7) - 0.5) * 1.6,
        p,
      ])

      const strokeOutline = getStroke(currentPts, {
        size: 5,
        thinning: 0.5,
        smoothing: 0.6,
        streamline: 0.4,
        start: { taper: 20 },
        end: { taper: 25 },
      })

      setPathD(toSvgPath(strokeOutline))
    })

    return () => {
      tween.kill()
      clearTimeout(safetyTimer)
      unregister()
    }
  }, [dismiss])

  if (!visible) return null

  return (
    <div
      ref={containerRef}
      onClick={dismiss}
      title="Click to enter"
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: '#05070f',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: 'all',
        cursor: 'pointer',
      }}
    >
      <div style={{ position: 'relative', width: 600, height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <svg
          viewBox="0 0 600 300"
          style={{ width: '100%', height: '100%', overflow: 'visible' }}
        >
          {/* Subtle ghost trace */}
          <path
            d={pathD}
            fill="#3b82f6"
            style={{ opacity: 0.25, filter: 'blur(8px)' }}
          />
          {/* Main animated variable stroke on twos */}
          <path
            d={pathD}
            fill="#60a5fa"
          />
        </svg>

        {/* Center Neural Kernel Label */}
        <div
          style={{
            position: 'absolute',
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '0.75rem',
            letterSpacing: '0.2em',
            color: '#93c5fd',
            textTransform: 'uppercase',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <span
            style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              backgroundColor: '#60a5fa',
              display: 'inline-block',
              boxShadow: '0 0 10px #60a5fa',
            }}
          />
          NASR ELSHAMEKH // INITIALIZING
        </div>
      </div>

      <div
        style={{
          marginTop: '20px',
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: '0.7rem',
          letterSpacing: '0.15em',
          color: '#64748b',
        }}
      >
        DUAL-CLOCK RAF // REACT 19 + .NET 10 // 120 FPS
      </div>
    </div>
  )
}
