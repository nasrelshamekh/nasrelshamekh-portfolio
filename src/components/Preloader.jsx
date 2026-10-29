import React, { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { sound } from '../utils/soundEngine'

const BOOT_STAGES = [
  'INITIALIZING APPLICATION RUNTIME',
  'CONNECTING TO ALEXANDRIA, EG',
  'LOADING .NET 10 BACKEND ARCHITECTURE',
  'MOUNTING REACT 19 CLIENT SURFACES',
  'CALIBRATING HARDWARE ACCELERATION',
  'INITIALIZATION COMPLETE // SYSTEM READY',
]

const TARGET_NAME = 'NASR ELSHAMEKH'
const GLYPHS = '01#@$%&*<>~/\\|{}[]+=!?:;'
const TOTAL_SEGMENTS = 32

export function Preloader({ onComplete, onStartReveal }) {
  const [percent, setPercent] = useState(0)
  const [decodedName, setDecodedName] = useState('')
  const [stageIndex, setStageIndex] = useState(0)
  const [accessGranted, setAccessGranted] = useState(false)

  const containerRef = useRef(null)
  const contentRef = useRef(null)
  const overlayRef = useRef(null)
  const horizontalBarsRef = useRef([])
  const completedRef = useRef(false)

  // 0. Lock viewport scroll to top during boot initialization
  useEffect(() => {
    window.__lenis?.stop()
    window.scrollTo(0, 0)
    window.__lenis?.scrollTo(0, { immediate: true })

    const preventScroll = (e) => e.preventDefault()
    window.addEventListener('wheel', preventScroll, { passive: false })
    window.addEventListener('touchmove', preventScroll, { passive: false })

    return () => {
      window.removeEventListener('wheel', preventScroll)
      window.removeEventListener('touchmove', preventScroll)
      window.scrollTo(0, 0)
      window.__lenis?.scrollTo(0, { immediate: true })
      window.__lenis?.start()
    }
  }, [])

  const safeComplete = () => {
    if (!completedRef.current) {
      completedRef.current = true
      window.scrollTo(0, 0)
      window.__lenis?.scrollTo(0, { immediate: true })
      if (onStartReveal) onStartReveal()
      if (onComplete) onComplete()
    }
  }

  // 1. Boot Progress & Glyph Decryption Loop
  useEffect(() => {
    let currentPercent = 0

    const interval = setInterval(() => {
      // Snappy, realistic Hollywood increments
      const increment = Math.floor(Math.random() * 8) + 4
      currentPercent = Math.min(currentPercent + increment, 100)
      setPercent(currentPercent)

      // Active boot stage
      const stage = Math.min(
        Math.floor((currentPercent / 100) * BOOT_STAGES.length),
        BOOT_STAGES.length - 1
      )
      setStageIndex(stage)

      // Matrix Decryption unscrambler for target name
      const progressFraction = currentPercent / 100
      const solvedCount = Math.floor(progressFraction * TARGET_NAME.length)
      let scrambled = ''
      for (let i = 0; i < TARGET_NAME.length; i++) {
        if (i < solvedCount) {
          scrambled += TARGET_NAME[i]
        } else if (TARGET_NAME[i] === ' ') {
          scrambled += ' '
        } else {
          scrambled += GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
        }
      }
      setDecodedName(scrambled)

      // Boot Complete Trigger
      if (currentPercent >= 100) {
        clearInterval(interval)
        setDecodedName(TARGET_NAME)
        setAccessGranted(true)
        sound.play('accessGranted')

        setTimeout(() => {
          try {
            const prefersReducedMotion =
              typeof window !== 'undefined' &&
              window.matchMedia &&
              window.matchMedia('(prefers-reduced-motion: reduce)').matches

            const tl = gsap.timeline({
              onComplete: () => safeComplete(),
            })

            if (prefersReducedMotion) {
              tl.to(containerRef.current, {
                opacity: 0,
                duration: 0.3,
                ease: 'power2.out',
              })
            } else {
              // 1. Fade out HUD terminal content
              const targets = [contentRef.current, overlayRef.current].filter(Boolean)
              if (targets.length > 0) {
                tl.to(targets, {
                  opacity: 0,
                  scale: 0.98,
                  duration: 0.2,
                  ease: 'power2.in',
                })
              }

              // 2. Signal underlying Hero section to start animating simultaneously
              tl.call(() => {
                window.scrollTo(0, 0)
                window.__lenis?.scrollTo(0, { immediate: true })
                if (onStartReveal) onStartReveal()
              }, null, '-=0.04')

              // 3. Part the 8 horizontal cyber shutters in alternating directions
              const bars = (horizontalBarsRef.current || []).filter(Boolean)
              if (bars.length > 0) {
                tl.to(
                  bars,
                  {
                    xPercent: (i) => (i % 2 === 0 ? -105 : 105),
                    duration: 0.75,
                    stagger: 0.03,
                    ease: 'power3.inOut',
                  },
                  '-=0.04'
                )
              } else {
                safeComplete()
              }
            }
          } catch (err) {
            console.warn('Preloader exit fallback:', err)
            safeComplete()
          }
        }, 280)
      }
    }, 42)

    // Safety fallback timer so preloader never hangs
    const fallbackTimer = setTimeout(() => {
      safeComplete()
    }, 2800)

    return () => {
      clearInterval(interval)
      clearTimeout(fallbackTimer)
    }
  }, [onComplete, onStartReveal])

  const activeSegments = Math.round((percent / 100) * TOTAL_SEGMENTS)

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        backgroundColor: 'transparent',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 'clamp(20px, 4vw, 48px)',
        pointerEvents: 'none',
        overflow: 'hidden',
        userSelect: 'none',
      }}
    >
      {/* 8 Horizontal Cyber Shutters */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          display: 'flex',
          flexDirection: 'column',
          pointerEvents: 'none',
        }}
      >
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
          <div
            key={i}
            ref={(el) => (horizontalBarsRef.current[i] = el)}
            style={{
              flex: 1,
              width: '100%',
              backgroundColor: '#040508',
              borderBottom: '1px solid rgba(0, 240, 255, 0.04)',
              position: 'relative',
            }}
          />
        ))}
      </div>

      {/* Subtle CRT Vignette */}
      <div
        ref={overlayRef}
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 2,
          pointerEvents: 'none',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(circle at center, transparent 45%, rgba(2, 4, 8, 0.8) 100%)',
          }}
        />
      </div>

      {/* Clean, Focused Monolithic Preloader Centerpiece */}
      <div
        ref={contentRef}
        style={{
          position: 'relative',
          zIndex: 3,
          width: '100%',
          maxWidth: '780px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          gap: '28px',
          fontFamily: 'var(--font-mono)',
        }}
      >
        {/* Top Telemetry Tag */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            padding: '5px 14px',
            borderRadius: 'var(--radius-full)',
            backgroundColor: 'rgba(0, 240, 255, 0.05)',
            border: '1px solid var(--color-border-accent)',
            fontSize: 'var(--text-mono-micro)',
            color: 'var(--color-text-muted)',
            letterSpacing: '0.14em',
          }}
        >
          <span
            style={{
              width: '6px',
              height: '6px',
              borderRadius: 'var(--radius-full)',
              backgroundColor: accessGranted ? 'var(--color-accent-emerald)' : 'var(--color-accent-cyan)',
              boxShadow: accessGranted
                ? '0 0 10px var(--color-accent-emerald)'
                : '0 0 10px var(--color-accent-cyan)',
              animation: 'pulse 1.2s infinite ease-in-out',
            }}
          />
          <span style={{ color: 'var(--color-accent-cyan)', fontWeight: 700 }}>
            NODE: ALEXANDRIA_EG
          </span>
          <span style={{ opacity: 0.3 }}>|</span>
          <span>31.2001° N, 29.9187° E</span>
        </div>

        {/* Identity & Matrix Decryption Unscrambler */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '10px',
          }}
        >
          <div
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--text-hero)',
              fontWeight: 800,
              color: 'var(--color-text-high)',
              letterSpacing: '-0.025em',
              lineHeight: 1.05,
              textShadow: '0 0 40px rgba(0, 240, 255, 0.25)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
            }}
          >
            <span>{decodedName || TARGET_NAME}</span>
            <span
              style={{
                display: 'inline-block',
                width: '4px',
                height: '0.85em',
                backgroundColor: 'var(--color-accent-cyan)',
                boxShadow: '0 0 10px var(--color-accent-cyan)',
                animation: 'blink 0.8s infinite',
              }}
            />
          </div>

          <div
            style={{
              fontSize: 'var(--text-body-sm)',
              color: 'var(--color-text-body)',
              letterSpacing: '0.12em',
              fontWeight: 500,
            }}
          >
            FULL-STACK SOFTWARE ENGINEER //{' '}
            <span style={{ color: 'var(--color-accent-cyan)' }}>.NET 10</span> &amp;{' '}
            <span style={{ color: 'var(--color-accent-emerald)' }}>REACT 19</span>
          </div>
        </div>

        {/* Unified High-Precision Segmented Progress Bar */}
        <div
          style={{
            width: '100%',
            maxWidth: '540px',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
          }}
        >
          {/* Progress Header */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontSize: 'var(--text-mono-micro)',
              letterSpacing: '0.1em',
            }}
          >
            <span
              style={{
                color: accessGranted ? 'var(--color-accent-emerald)' : 'var(--color-accent-cyan)',
                fontWeight: 700,
                transition: 'color 0.2s ease',
              }}
            >
              {accessGranted ? '>> SYSTEM READY' : `>> ${BOOT_STAGES[stageIndex]}`}
            </span>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--text-mono-label)',
                fontWeight: 800,
                color: accessGranted ? 'var(--color-accent-emerald)' : 'var(--color-text-high)',
                letterSpacing: '0.05em',
              }}
            >
              {percent}%
            </span>
          </div>

          {/* Segmented Track */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: `repeat(${TOTAL_SEGMENTS}, 1fr)`,
              gap: '3px',
              height: '14px',
              padding: '3px',
              backgroundColor: 'rgba(5, 8, 14, 0.8)',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--color-border-accent)',
              boxShadow: 'inset 0 0 10px rgba(0, 0, 0, 0.8)',
            }}
          >
            {Array.from({ length: TOTAL_SEGMENTS }).map((_, idx) => {
              const isActive = idx < activeSegments
              const isLeadingEdge = idx === activeSegments - 1

              return (
                <div
                  key={idx}
                  style={{
                    height: '100%',
                    borderRadius: '1px',
                    backgroundColor: isActive
                      ? isLeadingEdge
                        ? '#ffffff'
                        : accessGranted
                        ? 'var(--color-accent-emerald)'
                        : 'var(--color-accent-cyan)'
                      : 'rgba(255, 255, 255, 0.03)',
                    boxShadow: isActive
                      ? isLeadingEdge
                        ? '0 0 10px #ffffff, 0 0 16px var(--color-accent-cyan)'
                        : accessGranted
                        ? '0 0 6px rgba(16, 185, 129, 0.5)'
                        : '0 0 6px rgba(0, 240, 255, 0.5)'
                    : 'none',
                    transition: 'all 0.08s ease',
                    opacity: isActive ? 1 : 0.15,
                  }}
                />
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
