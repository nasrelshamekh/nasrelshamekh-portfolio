import React, { useState, useEffect } from 'react'
import { sound } from '../utils/soundEngine'

const ACTS = [
  { id: 'hero', act: '01', label: 'ORIGIN' },
  { id: 'system', act: '02', label: 'ENGINE' },
  { id: 'works', act: '03', label: 'EVIDENCE' },
  { id: 'manifesto', act: '04', label: 'ETHOS' },
  { id: 'contact', act: '05', label: 'UPLINK' },
]

export function NarrativeSpine({ onNavigate }) {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [activeAct, setActiveAct] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight
      if (total <= 0) return
      const current = window.scrollY
      const progress = Math.min(Math.max(current / total, 0), 1)
      setScrollProgress(progress)

      // Only show on desktop screens where there's room
      setIsVisible(window.innerWidth >= 1280)

      // Determine active act
      const elements = ACTS.map((a) => document.getElementById(a.id))
      const probePoint = current + window.innerHeight * 0.4

      for (let i = elements.length - 1; i >= 0; i--) {
        const el = elements[i]
        if (el && el.offsetTop <= probePoint) {
          setActiveAct(i)
          break
        }
      }
    }

    const handleResize = () => {
      setIsVisible(window.innerWidth >= 1280)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleResize)
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  if (!isVisible) return null

  return (
    <aside
      aria-label="Narrative Acts Timeline"
      style={{
        position: 'fixed',
        left: 'clamp(16px, 2.5vw, 36px)',
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 85,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '24px',
        pointerEvents: 'none',
        fontFamily: 'JetBrains Mono, monospace',
      }}
    >
      {/* Top Telemetry Header */}
      <div
        style={{
          writingMode: 'vertical-rl',
          transform: 'rotate(180deg)',
          fontSize: '0.58rem',
          color: '#64748b',
          letterSpacing: '0.22em',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        <span style={{ color: '#00f0ff' }}>NARRATIVE //</span>
        <span>ACT [0{activeAct + 1}/05]</span>
      </div>

      {/* Illuminated Spine Track */}
      <div
        style={{
          position: 'relative',
          width: '2px',
          height: '240px',
          backgroundColor: 'rgba(255, 255, 255, 0.08)',
          borderRadius: '9999px',
          overflow: 'hidden',
        }}
      >
        {/* Active Laser Pulse Progress Fill */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: `${scrollProgress * 100}%`,
            background:
              'linear-gradient(180deg, #00f0ff 0%, #3b82f6 50%, #10b981 100%)',
            boxShadow: '0 0 10px #00f0ff',
            borderRadius: '9999px',
            transition: 'height 0.1s linear',
          }}
        />
      </div>

      {/* Discrete Act Beacons */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '14px',
          pointerEvents: 'all',
        }}
      >
        {ACTS.map((act, idx) => {
          const isCurrent = activeAct === idx
          const isPassed = activeAct > idx

          return (
            <button
              key={act.id}
              onClick={() => {
                sound.play('warp')
                if (onNavigate) onNavigate(act.id)
              }}
              onMouseEnter={() => sound.play('hover')}
              title={`Warp to Act ${act.act}: ${act.label}`}
              style={{
                background: 'transparent',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                cursor: 'pointer',
                padding: '2px 0',
                transition: 'all 0.2s ease',
              }}
            >
              {/* Dot Beacon */}
              <div
                style={{
                  width: isCurrent ? '8px' : '5px',
                  height: isCurrent ? '8px' : '5px',
                  borderRadius: '50%',
                  backgroundColor: isCurrent
                    ? '#00f0ff'
                    : isPassed
                    ? '#38bdf8'
                    : 'rgba(255, 255, 255, 0.2)',
                  boxShadow: isCurrent ? '0 0 10px #00f0ff' : 'none',
                  transition: 'all 0.2s ease',
                }}
              />

              {/* Label that shows on current or hover */}
              <span
                style={{
                  fontSize: '0.6rem',
                  letterSpacing: '0.12em',
                  color: isCurrent ? '#00f0ff' : '#475569',
                  fontWeight: isCurrent ? 700 : 500,
                  transition: 'color 0.2s ease',
                }}
              >
                {act.act}
              </span>
            </button>
          )
        })}
      </div>
    </aside>
  )
}
