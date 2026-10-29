import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function SceneTransition({
  sceneNumber = '02',
  sceneTag = 'ARCHITECTURE_PIPELINE',
  title = 'THE SYSTEM INSPECTOR',
  telemetry = 'THROUGHPUT: HIGH-CONCURRENCY // PIPELINE: .NET 10',
}) {
  const containerRef = useRef(null)
  const laserRef = useRef(null)
  const textRef = useRef(null)
  const segmentsRef = useRef([])

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        end: 'bottom 40%',
        toggleActions: 'play none none reverse',
      },
    })

    // Laser scanline sweeping across
    tl.fromTo(
      laserRef.current,
      { scaleX: 0, opacity: 0 },
      { scaleX: 1, opacity: 1, duration: 0.7, ease: 'power3.inOut' }
    )

    // Text & Telemetry reveal
    tl.fromTo(
      textRef.current,
      { y: 15, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' },
      '-=0.3'
    )

    // Segmented indicator cascade
    tl.fromTo(
      segmentsRef.current,
      { opacity: 0, scaleY: 0 },
      {
        opacity: 1,
        scaleY: 1,
        duration: 0.4,
        stagger: 0.02,
        ease: 'power1.out',
      },
      '-=0.3'
    )

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === el) st.kill()
      })
    }
  }, [])

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        maxWidth: '1540px',
        margin: '0 auto',
        padding: '60px clamp(20px, 4vw, 48px) 30px',
        position: 'relative',
        zIndex: 5,
        fontFamily: 'JetBrains Mono, monospace',
        userSelect: 'none',
      }}
    >
      {/* Top Laser Scanline Rule */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '1px',
          backgroundColor: 'rgba(255, 255, 255, 0.06)',
          overflow: 'hidden',
          marginBottom: '20px',
        }}
      >
        <div
          ref={laserRef}
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(90deg, transparent 0%, #00f0ff 50%, #3b82f6 80%, transparent 100%)',
            boxShadow: '0 0 12px #00f0ff',
            transformOrigin: 'left center',
          }}
        />
      </div>

      {/* Telemetry Header Row */}
      <div
        ref={textRef}
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
        }}
      >
        {/* Left: Sequence Badge & Scene Title */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '4px 10px',
              backgroundColor: 'rgba(0, 240, 255, 0.06)',
              border: '1px solid rgba(0, 240, 255, 0.25)',
              borderRadius: '4px',
              fontSize: '0.68rem',
              color: '#00f0ff',
              letterSpacing: '0.12em',
              fontWeight: 700,
            }}
          >
            <span
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                backgroundColor: '#00f0ff',
                boxShadow: '0 0 6px #00f0ff',
              }}
            />
            <span>SCENE [{sceneNumber}]</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span
              style={{
                fontFamily: 'Syne, sans-serif',
                fontSize: 'clamp(1rem, 2vw, 1.35rem)',
                fontWeight: 800,
                color: '#ffffff',
                letterSpacing: '-0.01em',
              }}
            >
              {title}
            </span>
            <span
              style={{
                fontSize: '0.64rem',
                color: '#64748b',
                letterSpacing: '0.14em',
              }}
            >
              // {sceneTag}
            </span>
          </div>
        </div>

        {/* Right: Hacker Segmented Telemetry Indicator */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
          }}
        >
          <div
            style={{
              fontSize: '0.65rem',
              color: '#64748b',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <span>{telemetry}</span>
          </div>

          {/* Micro Segmented Cascade Bars */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '2px',
              height: '14px',
              padding: '2px 4px',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              borderRadius: '3px',
              border: '1px solid rgba(255, 255, 255, 0.08)',
            }}
          >
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                ref={(el) => (segmentsRef.current[i] = el)}
                style={{
                  width: '3px',
                  height: '100%',
                  borderRadius: '1px',
                  backgroundColor:
                    i < 9 ? '#00f0ff' : 'rgba(255, 255, 255, 0.1)',
                  boxShadow:
                    i < 9 ? '0 0 4px rgba(0, 240, 255, 0.6)' : 'none',
                  transformOrigin: 'bottom center',
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
