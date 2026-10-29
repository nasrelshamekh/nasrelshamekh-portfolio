import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function NarrativeInterlude({
  actLabel = 'SECTION 02 // ARCHITECTURAL FOUNDATION',
  lead = 'CODE THAT RUNS IS NOT ENOUGH',
  punchline = 'ARCHITECTURE MUST BE RESILIENT UNDER LOAD',
  subtext = 'Before a single pixel renders, backend services must handle concurrency gracefully and isolate failures.',
  accent = 'var(--color-accent-cyan)',
  telemetry = '',
}) {
  const containerRef = useRef(null)
  const laserRef = useRef(null)
  const leadRef = useRef(null)
  const punchlineRef = useRef(null)
  const subtextRef = useRef(null)
  const telemetryRef = useRef(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        end: 'bottom 45%',
        toggleActions: 'play none none reverse',
      },
    })

    // 1. Sweeping laser gateway scanline
    if (laserRef.current) {
      tl.fromTo(
        laserRef.current,
        { scaleX: 0, opacity: 0 },
        { scaleX: 1, opacity: 1, duration: 0.8, ease: 'power3.inOut' }
      )
    }

    // 2. Telemetry and Act Badge
    if (telemetryRef.current) {
      tl.fromTo(
        telemetryRef.current,
        { y: 15, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' },
        '-=0.4'
      )
    }

    // 3. Lead Quote Line
    tl.fromTo(
      leadRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 0.7, duration: 0.7, ease: 'power3.out' },
      '-=0.3'
    )

    // 4. Big Punchline Statement
    tl.fromTo(
      punchlineRef.current,
      { y: 35, opacity: 0, scale: 0.98 },
      { y: 0, opacity: 1, scale: 1, duration: 0.8, ease: 'power3.out' },
      '-=0.4'
    )

    // 5. Subtext
    if (subtextRef.current) {
      tl.fromTo(
        subtextRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' },
        '-=0.4'
      )
    }

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === el) st.kill()
      })
    }
  }, [])

  return (
    <section
      ref={containerRef}
      aria-label={actLabel}
      style={{
        width: '100%',
        maxWidth: '1540px',
        margin: '0 auto',
        padding: '48px clamp(16px, 3.5vw, 48px) 32px',
        position: 'relative',
        zIndex: 3,
        userSelect: 'none',
      }}
    >
      {/* Laser Scanline Gateway */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '1px',
          backgroundColor: 'var(--color-border-subtle)',
          overflow: 'hidden',
          marginBottom: '24px',
        }}
      >
        <div
          ref={laserRef}
          style={{
            position: 'absolute',
            inset: 0,
            background: `linear-gradient(90deg, transparent 0%, ${accent} 50%, #3b82f6 80%, transparent 100%)`,
            boxShadow: `0 0 14px ${accent}`,
            transformOrigin: 'left center',
          }}
        />
      </div>

      {/* Editorial Chapter Content */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          gap: '12px',
        }}
      >
        {/* Top Meta: Act Badge & Optional Telemetry */}
        <div
          ref={telemetryRef}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '12px',
          }}
        >
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'var(--text-mono-label)',
              letterSpacing: '0.2em',
              color: accent,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '4px 14px',
              borderRadius: 'var(--radius-full)',
              backgroundColor: 'rgba(0, 240, 255, 0.06)',
              border: '1px solid var(--color-border-accent)',
            }}
          >
            <span
              style={{
                width: '6px',
                height: '6px',
                borderRadius: 'var(--radius-full)',
                backgroundColor: accent,
                boxShadow: `0 0 8px ${accent}`,
              }}
            />
            <span>{actLabel}</span>
          </div>

          {telemetry && (
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--text-mono-micro)',
                color: 'var(--color-text-muted)',
                letterSpacing: '0.12em',
              }}
            >
              // {telemetry}
            </span>
          )}
        </div>

        {/* Lead Quote Line */}
        <div
          ref={leadRef}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--text-h2)',
            fontWeight: 800,
            lineHeight: 1.15,
            color: 'var(--color-text-muted)',
            letterSpacing: '-0.02em',
            textTransform: 'uppercase',
            maxWidth: '1000px',
          }}
        >
          {lead}
        </div>

        {/* Big Punchline Statement */}
        <div
          ref={punchlineRef}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--text-h1)',
            fontWeight: 800,
            lineHeight: 1.05,
            color: 'var(--color-text-high)',
            letterSpacing: '-0.025em',
            textTransform: 'uppercase',
            maxWidth: '1100px',
            textShadow: `0 0 20px rgba(0, 240, 255, 0.18)`,
          }}
        >
          <span
            style={{
              background: `linear-gradient(135deg, var(--color-text-high) 0%, ${accent} 100%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              display: 'inline-block',
            }}
          >
            {punchline}
          </span>
        </div>

        {/* Subtext */}
        {subtext && (
          <p
            ref={subtextRef}
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-body-lg)',
              color: 'var(--color-text-body)',
              lineHeight: 1.6,
              maxWidth: '680px',
              margin: '6px 0 0',
            }}
          >
            {subtext}
          </p>
        )}
      </div>
    </section>
  )
}
