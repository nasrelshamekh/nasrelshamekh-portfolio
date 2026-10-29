import React, { useState, useEffect, useRef } from 'react'
import { ArrowUp, Terminal, Shield, Cpu, FolderGit2, Mail } from 'lucide-react'
import { sound } from '../utils/soundEngine'

const SCENES = [
  { id: 'hero', num: '01', label: 'OVERVIEW', icon: Cpu },
  { id: 'system', num: '02', label: 'ARCHITECTURE', icon: Terminal },
  { id: 'works', num: '03', label: 'PROJECTS', icon: FolderGit2 },
  { id: 'manifesto', num: '04', label: 'PRINCIPLES', icon: Shield },
  { id: 'contact', num: '05', label: 'CONTACT', icon: Mail },
]

export function ScrollHUD({ onNavigate }) {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [activeScene, setActiveScene] = useState(0)
  const [isExpanded, setIsExpanded] = useState(false)
  const containerRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      if (totalHeight <= 0) return
      const current = window.scrollY
      const progress = Math.min(Math.max(current / totalHeight, 0), 1)
      setScrollProgress(progress)

      // Determine active scene based on section element positions
      const sectionElements = SCENES.map((s) => document.getElementById(s.id))
      const scrollMiddle = current + window.innerHeight * 0.35

      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const el = sectionElements[i]
        if (el && el.offsetTop <= scrollMiddle) {
          setActiveScene(i)
          break
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close warp navigator when clicking anywhere outside or pressing Escape
  useEffect(() => {
    if (!isExpanded) return

    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsExpanded(false)
      }
    }

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsExpanded(false)
      }
    }

    document.addEventListener('pointerdown', handleClickOutside)
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('pointerdown', handleClickOutside)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isExpanded])

  const percentInt = Math.round(scrollProgress * 100)
  const TOTAL_TICKS = 32
  const activeTicks = Math.round(scrollProgress * TOTAL_TICKS)

  return (
    <aside
      ref={containerRef}
      aria-label="Scene navigation and scroll progress"
      style={{
        position: 'fixed',
        bottom: 'calc(var(--frame, 8px) + clamp(14px, 2vw, 20px))',
        right: 'calc(var(--frame, 8px) + clamp(14px, 2vw, 20px))',
        zIndex: 90,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        gap: '10px',
        pointerEvents: 'none',
        fontFamily: 'var(--font-mono)',
      }}
    >
      {/* Expanded Holographic Scene Selector Panel */}
      {isExpanded && (
        <div
          style={{
            pointerEvents: 'all',
            backgroundColor: 'rgba(5, 8, 14, 0.94)',
            border: '1px solid var(--color-border-accent)',
            borderRadius: 'var(--radius-lg)',
            padding: '14px',
            backdropFilter: 'blur(20px)',
            boxShadow: '0 15px 35px rgba(0, 0, 0, 0.8), 0 0 25px rgba(0, 240, 255, 0.15)',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            minWidth: '220px',
            maxWidth: 'calc(100vw - 32px)',
            animation: 'fadeInHUD 0.2s ease-out',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontSize: 'var(--text-mono-micro)',
              color: 'var(--color-text-muted)',
              borderBottom: '1px solid var(--color-border-subtle)',
              paddingBottom: '6px',
            }}
          >
            <span style={{ color: 'var(--color-accent-cyan)' }}>NAVIGATOR //</span>
            <span>ALX-NODE</span>
          </div>

          {SCENES.map((scene, idx) => {
            const Icon = scene.icon
            const isCurrent = activeScene === idx
            return (
              <button
                key={scene.id}
                onClick={() => {
                  sound.play('warp')
                  if (onNavigate) onNavigate(scene.id)
                  setIsExpanded(false)
                }}
                onMouseEnter={() => sound.play('hover')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '7px 10px',
                  borderRadius: 'var(--radius-md)',
                  background: isCurrent
                    ? 'rgba(0, 240, 255, 0.12)'
                    : 'transparent',
                  border: isCurrent
                    ? '1px solid var(--color-border-accent)'
                    : '1px solid transparent',
                  color: isCurrent ? 'var(--color-accent-cyan)' : 'var(--color-text-body)',
                  fontSize: 'var(--text-mono-label)',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.15s ease',
                }}
                onMouseOver={(e) => {
                  if (!isCurrent) {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)'
                    e.currentTarget.style.color = '#ffffff'
                  }
                }}
                onMouseOut={(e) => {
                  if (!isCurrent) {
                    e.currentTarget.style.backgroundColor = 'transparent'
                    e.currentTarget.style.color = 'var(--color-text-body)'
                  }
                }}
              >
                <span
                  style={{
                    fontSize: 'var(--text-mono-micro)',
                    color: isCurrent ? 'var(--color-accent-cyan)' : 'var(--color-text-muted)',
                    fontWeight: 700,
                  }}
                >
                  [{scene.num}]
                </span>
                <Icon size={12} color={isCurrent ? 'var(--color-accent-cyan)' : 'var(--color-text-muted)'} />
                <span style={{ flex: 1 }}>{scene.label}</span>
                {isCurrent && (
                  <span
                    style={{
                      width: '5px',
                      height: '5px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--color-accent-cyan)',
                      boxShadow: '0 0 8px var(--color-accent-cyan)',
                    }}
                  />
                )}
              </button>
            )
          })}
        </div>
      )}

      {/* Main Circular HUD Scroll Dial & Telemetry Pill */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          pointerEvents: 'all',
        }}
      >
        {/* Telemetry Tag Pill */}
        <div
          className="hud-pill-mobile-hide"
          onClick={() => setIsExpanded(!isExpanded)}
          style={{
            cursor: 'pointer',
            backgroundColor: 'rgba(6, 9, 15, 0.88)',
            border: '1px solid var(--color-border-subtle)',
            borderRadius: 'var(--radius-full)',
            padding: '6px 14px',
            backdropFilter: 'blur(16px)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.5)',
            transition: 'all 0.2s ease',
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.borderColor = 'var(--color-border-accent)'
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.borderColor = 'var(--color-border-subtle)'
          }}
        >
          <span
            style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              backgroundColor: 'var(--color-accent-cyan)',
              boxShadow: '0 0 8px var(--color-accent-cyan)',
              animation: 'pulse 1.4s infinite ease-in-out',
            }}
          />
          <span style={{ fontSize: 'var(--text-mono-micro)', color: 'var(--color-text-muted)' }}>
            SCENE:
          </span>
          <span style={{ fontSize: 'var(--text-mono-label)', color: 'var(--color-text-high)', fontWeight: 700 }}>
            {SCENES[activeScene].num} {SCENES[activeScene].label}
          </span>
        </div>

        {/* Circular Radar Scroll Wheel */}
        <div
          onClick={() => {
            if (percentInt > 90) {
              sound.play('warp')
              window.scrollTo({ top: 0, behavior: 'smooth' })
            } else {
              sound.play('click')
              setIsExpanded(!isExpanded)
            }
          }}
          onMouseEnter={() => sound.play('hover')}
          title={percentInt > 90 ? 'Back to top' : 'Open Scene Navigator'}
          style={{
            position: 'relative',
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            backgroundColor: 'rgba(5, 8, 14, 0.92)',
            border: '1px solid var(--color-border-accent)',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.7), 0 0 20px rgba(0, 240, 255, 0.1)',
            backdropFilter: 'blur(20px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'scale(1.06)'
            e.currentTarget.style.borderColor = 'var(--color-accent-cyan)'
            e.currentTarget.style.boxShadow = '0 12px 35px rgba(0, 0, 0, 0.8), 0 0 25px rgba(0, 240, 255, 0.3)'
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'scale(1)'
            e.currentTarget.style.borderColor = 'var(--color-border-accent)'
            e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.7), 0 0 20px rgba(0, 240, 255, 0.1)'
          }}
        >
          {/* SVG Circular Progress & Radar Ticks */}
          <svg
            width="64"
            height="64"
            viewBox="0 0 64 64"
            style={{
              position: 'absolute',
              inset: 0,
              transform: 'rotate(-90deg)',
              pointerEvents: 'none',
            }}
          >
            {/* Background Track Circle */}
            <circle
              cx="32"
              cy="32"
              r="26"
              fill="none"
              stroke="rgba(255, 255, 255, 0.06)"
              strokeWidth="2.5"
            />
            {/* Active Progress Glowing Stroke */}
            <circle
              cx="32"
              cy="32"
              r="26"
              fill="none"
              stroke="var(--color-accent-cyan)"
              strokeWidth="2.5"
              strokeDasharray={2 * Math.PI * 26}
              strokeDashoffset={2 * Math.PI * 26 * (1 - scrollProgress)}
              strokeLinecap="round"
              style={{
                filter: 'drop-shadow(0 0 4px var(--color-accent-cyan))',
                transition: 'stroke-dashoffset 0.1s linear',
              }}
            />

            {/* Segmented Radial Ticks */}
            {Array.from({ length: TOTAL_TICKS }).map((_, i) => {
              const angle = (i / TOTAL_TICKS) * 360
              const isActive = i < activeTicks
              return (
                <line
                  key={i}
                  x1="32"
                  y1="3"
                  x2="32"
                  y2="6"
                  transform={`rotate(${angle} 32 32)`}
                  stroke={isActive ? 'var(--color-accent-cyan)' : 'rgba(255, 255, 255, 0.1)'}
                  strokeWidth="1.2"
                />
              )
            })}
          </svg>

          {/* Center Digital Percentage Readout or Top Arrow */}
          {percentInt > 94 ? (
            <ArrowUp size={16} color="var(--color-accent-cyan)" />
          ) : (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 2,
              }}
            >
              <span
                style={{
                  fontSize: 'var(--text-mono-label)',
                  fontWeight: 800,
                  color: 'var(--color-text-high)',
                  letterSpacing: '-0.02em',
                }}
              >
                {percentInt}%
              </span>
              <span
                style={{
                  fontSize: '0.46rem',
                  color: 'var(--color-accent-cyan)',
                  letterSpacing: '0.1em',
                }}
              >
                HUD
              </span>
            </div>
          )}
        </div>
      </div>
    </aside>
  )
}
