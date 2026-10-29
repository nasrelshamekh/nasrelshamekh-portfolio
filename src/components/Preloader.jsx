import React, { useEffect, useState, useRef } from 'react'
import gsap from 'gsap'

const BOOT_LOGS = [
  'BOOTING NASR ELSHAMEKH PORTFOLIO ENGINE...',
  'COMPILING ASP.NET CORE (.NET 10) ARCHITECTURE...',
  'MOUNTING REACT 19 & NEXT.JS DESIGN SYSTEM...',
  'INITIALIZATION COMPLETE • 120 FPS CALIBRATED',
]

export function Preloader({ onComplete }) {
  const [count, setCount] = useState(0)
  const [logIndex, setLogIndex] = useState(0)
  const overlayRef = useRef()
  const barRef = useRef()

  useEffect(() => {
    let current = 0
    const timer = setInterval(() => {
      const step = Math.floor(Math.random() * 10) + 4
      current = Math.min(current + step, 100)
      setCount(current)

      if (current < 30) setLogIndex(0)
      else if (current < 65) setLogIndex(1)
      else if (current < 95) setLogIndex(2)
      else setLogIndex(3)

      if (barRef.current) {
        barRef.current.style.width = `${current}%`
      }

      if (current >= 100) {
        clearInterval(timer)
        setTimeout(() => {
          if (overlayRef.current) {
            gsap.to(overlayRef.current, {
              yPercent: -100,
              duration: 0.85,
              ease: 'power4.inOut',
              onComplete: () => {
                if (onComplete) onComplete()
              },
            })
          } else {
            if (onComplete) onComplete()
          }
        }, 300)
      }
    }, 40)

    return () => clearInterval(timer)
  }, [onComplete])

  return (
    <div
      ref={overlayRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        background: '#0a0b0e',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        willChange: 'transform',
      }}
    >
      {/* Brand Monogram */}
      <div
        style={{
          width: '68px',
          height: '68px',
          borderRadius: '18px',
          background: 'linear-gradient(135deg, #a855f7 0%, #06b6d4 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'Syne, sans-serif',
          fontWeight: 800,
          fontSize: '1.8rem',
          color: '#0a0b0e',
          boxShadow: '0 0 35px rgba(168, 85, 247, 0.4)',
          marginBottom: '28px',
          animation: 'beaconPulse 2s infinite ease-in-out',
        }}
      >
        NE
      </div>

      <div
        style={{
          fontFamily: 'Syne, sans-serif',
          fontWeight: 800,
          fontSize: '1.3rem',
          letterSpacing: '0.08em',
          color: '#ffffff',
          marginBottom: '6px',
        }}
      >
        NASR ELSHAMEKH
      </div>

      <div
        style={{
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: '0.74rem',
          letterSpacing: '0.15em',
          color: '#a855f7',
          marginBottom: '36px',
        }}
      >
        FULL-STACK ARCHITECT // REACT 19 &amp; .NET 10
      </div>

      {/* Progress Bar Container */}
      <div
        style={{
          width: '280px',
          height: '3px',
          background: 'rgba(255, 255, 255, 0.08)',
          borderRadius: '9999px',
          overflow: 'hidden',
          marginBottom: '16px',
          position: 'relative',
        }}
      >
        <div
          ref={barRef}
          style={{
            height: '100%',
            width: `${count}%`,
            background: 'linear-gradient(90deg, #a855f7, #06b6d4)',
            boxShadow: '0 0 12px #06b6d4',
            transition: 'width 0.04s ease',
          }}
        />
      </div>

      {/* Numerical Percentage Counter & Boot Step */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '280px',
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: '0.72rem',
          color: '#64748b',
        }}
      >
        <span>{BOOT_LOGS[logIndex]}</span>
        <span style={{ color: '#ffffff', fontWeight: 700 }}>{count}%</span>
      </div>
    </div>
  )
}
