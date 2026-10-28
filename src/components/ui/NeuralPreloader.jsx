import React, { useEffect, useState, useRef, useCallback } from 'react'
import gsap from 'gsap'
import { handOff, lenis } from '../../core/clock'
import { playNeuralPulse } from '../../core/audio'

// Mathematically perfect Bernoulli Lemniscate (Infinity Loop) centered at (300, 150)
const INFINITY_PATH_D = (() => {
  const count = 300
  const w = 220
  const h = 110
  const pts = []
  for (let i = 0; i <= count; i++) {
    const t = (i / count) * Math.PI * 2
    const x = (w * Math.cos(t)) / (1 + Math.sin(t) * Math.sin(t)) + 300
    const y = (h * Math.sin(t) * Math.cos(t)) / (1 + Math.sin(t) * Math.sin(t)) + 150
    pts.push(`${x.toFixed(1)},${y.toFixed(1)}`)
  }
  return `M ${pts[0]} L ${pts.slice(1).join(' ')} Z`
})()

export function NeuralPreloader({ onComplete }) {
  const [visible, setVisible] = useState(true)
  const containerRef = useRef()
  const pathRef = useRef()
  const glowPathRef = useRef()
  const tracerRef = useRef()
  const isDismissing = useRef(false)

  const dismiss = useCallback(() => {
    if (isDismissing.current) return
    isDismissing.current = true

    playNeuralPulse()
    handOff('gl')

    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0)
      lenis.scrollTo(0, { immediate: true })
    }

    if (containerRef.current) {
      gsap.to(containerRef.current, {
        opacity: 0,
        scale: 1.04,
        duration: 0.55,
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
    const path = pathRef.current
    if (!path) return

    const length = path.getTotalLength()

    // Initialize stroke dash for hardware-accelerated drawing
    path.style.strokeDasharray = `${length} ${length}`
    path.style.strokeDashoffset = length

    if (glowPathRef.current) {
      glowPathRef.current.style.strokeDasharray = `${length} ${length}`
      glowPathRef.current.style.strokeDashoffset = length
    }

    const progressObj = { val: 0 }

    // Silky smooth 60fps/120fps hardware-accelerated tracer
    const tween = gsap.to(progressObj, {
      val: 1,
      duration: 1.6,
      ease: 'power2.inOut',
      onUpdate: () => {
        const offset = length * (1 - progressObj.val)
        if (path) path.style.strokeDashoffset = offset
        if (glowPathRef.current) glowPathRef.current.style.strokeDashoffset = offset

        if (tracerRef.current && progressObj.val > 0) {
          const pt = path.getPointAtLength(length * progressObj.val)
          tracerRef.current.setAttribute('cx', pt.x)
          tracerRef.current.setAttribute('cy', pt.y)
        }
      },
      onComplete: () => {
        dismiss()
      },
    })

    const safetyTimer = setTimeout(() => {
      dismiss()
    }, 2200)

    return () => {
      tween.kill()
      clearTimeout(safetyTimer)
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
          <defs>
            <linearGradient id="infGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#00f5d4" />
              <stop offset="50%" stopColor="#00bbf9" />
              <stop offset="100%" stopColor="#7928ca" />
            </linearGradient>
            <filter id="tracerGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Faint architectural guide track */}
          <path
            d={INFINITY_PATH_D}
            fill="none"
            stroke="rgba(255, 255, 255, 0.08)"
            strokeWidth="2"
          />

          {/* Glowing blur halo */}
          <path
            ref={glowPathRef}
            d={INFINITY_PATH_D}
            fill="none"
            stroke="url(#infGrad)"
            strokeWidth="8"
            strokeLinecap="round"
            style={{ opacity: 0.35, filter: 'blur(8px)' }}
          />

          {/* Main silky gradient stroke */}
          <path
            ref={pathRef}
            d={INFINITY_PATH_D}
            fill="none"
            stroke="url(#infGrad)"
            strokeWidth="3.5"
            strokeLinecap="round"
          />

          {/* Glowing tracer dot riding at the leading edge */}
          <circle
            ref={tracerRef}
            cx="520"
            cy="150"
            r="5"
            fill="#00f5d4"
            filter="url(#tracerGlow)"
          />
        </svg>

        {/* Geometrical Placement inside Infinity Loop Cavities */}
        {/* Left Loop Cavity: Nasr Elshamekh */}
        <div
          style={{
            position: 'absolute',
            left: '205px',
            top: '150px',
            transform: 'translate(-50%, -50%)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '0.72rem',
            letterSpacing: '0.16em',
            color: '#ffffff',
            whiteSpace: 'nowrap',
            zIndex: 2,
            textShadow: '0 2px 10px rgba(5, 7, 15, 0.95), 0 0 20px rgba(5, 7, 15, 0.9)',
            pointerEvents: 'none',
          }}
        >
          <span
            style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              backgroundColor: '#00f5d4',
              display: 'inline-block',
              boxShadow: '0 0 10px #00f5d4',
            }}
          />
          <span>NASR ELSHAMEKH</span>
        </div>

        {/* Center Intersection: // */}
        <div
          style={{
            position: 'absolute',
            left: '300px',
            top: '150px',
            transform: 'translate(-50%, -50%)',
            fontFamily: 'JetBrains Mono, monospace',
            color: '#00f5d4',
            fontWeight: 700,
            fontSize: '0.85rem',
            letterSpacing: '0.1em',
            zIndex: 2,
            textShadow: '0 0 12px rgba(0, 245, 212, 0.8), 0 0 24px rgba(5, 7, 15, 0.95)',
            pointerEvents: 'none',
          }}
        >
          //
        </div>

        {/* Right Loop Cavity: Initializing */}
        <div
          style={{
            position: 'absolute',
            left: '395px',
            top: '150px',
            transform: 'translate(-50%, -50%)',
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '0.72rem',
            letterSpacing: '0.16em',
            color: '#94a3b8',
            whiteSpace: 'nowrap',
            zIndex: 2,
            textShadow: '0 2px 10px rgba(5, 7, 15, 0.95), 0 0 20px rgba(5, 7, 15, 0.9)',
            pointerEvents: 'none',
          }}
        >
          <span>INITIALIZING</span>
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
        FULL-STACK ARCHITECTURE // REACT 19 + .NET 10 // 120 FPS
      </div>
    </div>
  )
}
