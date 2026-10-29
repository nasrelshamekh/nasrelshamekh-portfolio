import React, { useState, useEffect, useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Terminal, Shield, Cpu, Activity, CornerDownRight } from 'lucide-react'
import { sound } from '../utils/soundEngine'

gsap.registerPlugin(ScrollTrigger)

export function Hero({ onNavigate, isRevealing = false }) {
  const [activeTab, setActiveTab] = useState('dotnet')
  const heroRef = useRef(null)
  const animatedRef = useRef(false)

  // Scroll parallax exit
  useGSAP(
    () => {
      gsap.to('.hero-content-wrapper', {
        scale: 0.94,
        opacity: 0.35,
        y: -50,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })
    },
    { scope: heroRef }
  )

  // Coordinated entrance animation triggered when preloader shutters part
  useEffect(() => {
    const triggerEntrance = () => {
      if (!animatedRef.current) {
        animatedRef.current = true
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

        tl.fromTo('.hero-badge', { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.7 })
        tl.fromTo(
          '.hero-title-line',
          { opacity: 0, y: 40, rotateX: -15 },
          { opacity: 1, y: 0, rotateX: 0, stagger: 0.08, duration: 0.8 },
          '-=0.4'
        )
        tl.fromTo('.hero-desc', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7 }, '-=0.5')
        tl.fromTo('.hero-actions', { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.6 }, '-=0.5')
        tl.fromTo(
          '.hero-hub',
          { opacity: 0, scale: 0.96, y: 25 },
          { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: 'back.out(1.2)' },
          '-=0.5'
        )
      }
    }

    if (isRevealing) {
      triggerEntrance()
    }

    const fallback = setTimeout(triggerEntrance, 2400)
    return () => clearTimeout(fallback)
  }, [isRevealing])

  const runtimeInfo = {
    dotnet: {
      title: 'ASP.NET Core (.NET 10)',
      category: 'DISTRIBUTED BACKEND ARCHITECTURE',
      desc: 'C#, Entity Framework Core, JWT Bearer Guards, REST microservices, low-latency API execution.',
      accent: '#3b82f6',
      badge: 'STABLE RUNTIME',
      metricLabel: 'REQUEST PIPELINE ARCHITECTURE',
      metricVal: 'HIGH-CONCURRENCY',
      barsFilled: 18,
    },
    react: {
      title: 'React 19 & Next.js App Router',
      category: 'RESPONSIVE CLIENT CRAFT',
      desc: 'Server Components, strict TypeScript type boundaries, Tailwind design systems, zero layout shifts.',
      accent: '#00f0ff',
      badge: 'HARDWARE ACCELERATED',
      metricLabel: 'FRAME RENDER TARGET',
      metricVal: '60–120 HZ FLUID',
      barsFilled: 20,
    },
    database: {
      title: 'PostgreSQL & MySQL Relational',
      category: 'RELATIONAL PERSISTENCE',
      desc: 'Normalized schemas, index optimization, LINQ query tuning, atomic ACID transactions.',
      accent: '#10b981',
      badge: 'ACID COMPLIANT',
      metricLabel: 'INDEX OPTIMIZATION',
      metricVal: 'B-TREE COMPOSITE',
      barsFilled: 16,
    },
  }

  const cur = runtimeInfo[activeTab]

  return (
    <section
      ref={heroRef}
      id="hero"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        padding: '130px 0 80px',
        zIndex: 2,
      }}
    >
      <div className="grid-widescreen" style={{ width: '100%' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.15fr 0.85fr',
            gap: 'clamp(40px, 5vw, 80px)',
            alignItems: 'center',
          }}
          className="contact-col-grid hero-content-wrapper"
        >
          {/* Left Column: Bold Editorial Cyber Typography */}
          <div>
            <div
              className="hero-badge text-mono-label"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 14px',
                borderRadius: 'var(--radius-full)',
                background: 'rgba(0, 240, 255, 0.08)',
                border: '1px solid var(--color-border-accent)',
                marginBottom: '24px',
                maxWidth: '100%',
                flexWrap: 'wrap',
                rowGap: '4px',
              }}
            >
              <span
                style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--color-accent-cyan)',
                  boxShadow: '0 0 6px var(--color-accent-cyan)',
                  flexShrink: 0,
                }}
              />
              <span style={{ fontWeight: 700 }}>ALEXANDRIA, EG</span>
              <span style={{ color: 'var(--color-text-muted)' }}>//</span>
              <span style={{ color: 'var(--color-text-high)' }}>FULL-STACK SOFTWARE ENGINEER</span>
            </div>

            <h1
              className="text-hero"
              style={{
                textTransform: 'uppercase',
                marginBottom: '24px',
                maxWidth: '100%',
                overflowWrap: 'break-word',
              }}
            >
              <span className="hero-title-line" style={{ display: 'block' }}>
                ENGINEERING
              </span>
              <span className="hero-title-line" style={{ display: 'block' }}>
                SCALABLE SYSTEMS
              </span>
              <span
                className="hero-title-line"
                style={{
                  display: 'block',
                  color: 'var(--color-accent-cyan)',
                  textShadow: '0 0 16px rgba(0, 240, 255, 0.22)',
                }}
              >
                &amp; FLUID INTERFACES
              </span>
            </h1>

            <p
              className="hero-desc text-body-lg"
              style={{
                maxWidth: '640px',
                marginBottom: '34px',
              }}
            >
              Based in Alexandria, Egypt. I specialize in the full lifecycle of high-performance software—engineering resilient backend microservices in <strong style={{ color: 'var(--color-text-high)' }}>ASP.NET Core (.NET 10)</strong> and crafting responsive, low-latency interfaces in <strong style={{ color: 'var(--color-text-high)' }}>React 19 &amp; Next.js</strong>.
            </p>

            <div
              className="hero-actions hero-actions-responsive"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
                flexWrap: 'wrap',
              }}
            >
              <button
                onClick={() => {
                  sound.play('warp')
                  onNavigate('works')
                }}
                onMouseEnter={() => sound.play('hover')}
                className="btn-core-primary"
              >
                VIEW FEATURED WORK ↓
              </button>

              <button
                onClick={() => {
                  sound.play('warp')
                  onNavigate('system')
                }}
                onMouseEnter={() => sound.play('hover')}
                className="btn-core-secondary"
              >
                <Terminal size={14} color="var(--color-accent-cyan)" />
                <span>SYSTEM INSPECTOR ↗</span>
              </button>
            </div>
          </div>

          {/* Right Column: Hollywood Cyber Telemetry Hub */}
          <div
            className="hero-hub hud-card"
            style={{
              padding: '32px',
              position: 'relative',
              border: '1px solid rgba(0, 240, 255, 0.22)',
              backgroundColor: 'rgba(6, 9, 15, 0.85)',
              boxShadow:
                '0 20px 50px rgba(0, 0, 0, 0.8), 0 0 30px rgba(0, 240, 255, 0.06)',
            }}
          >
            {/* Profile Header Row */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '22px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div
                  style={{
                    position: 'relative',
                    width: '44px',
                    height: '44px',
                    borderRadius: '10px',
                    overflow: 'hidden',
                    border: '1.5px solid rgba(0, 240, 255, 0.5)',
                    boxShadow: '0 0 12px rgba(0, 240, 255, 0.3)',
                  }}
                >
                  <img
                    src="/nasr-icon.png"
                    alt="Nasr Elshamekh"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                </div>
                <div>
                  <div
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1rem',
                      fontWeight: 700,
                      color: 'var(--color-text-high)',
                    }}
                  >
                    Nasr Elshamekh
                  </div>
                  <div className="text-mono-micro">
                    Alexandria, Egypt (UTC+3)
                  </div>
                </div>
              </div>

              <span
                className="text-mono-micro"
                style={{
                  color: cur.accent,
                  padding: '4px 10px',
                  borderRadius: 'var(--radius-sm)',
                  background: `${cur.accent}15`,
                  border: `1px solid ${cur.accent}40`,
                  fontWeight: 700,
                }}
              >
                {cur.badge}
              </span>
            </div>

            {/* Interactive Mode Pills */}
            <div
              style={{
                display: 'flex',
                gap: '6px',
                marginBottom: '20px',
                padding: '4px',
                background: 'rgba(0, 0, 0, 0.5)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--color-border-subtle)',
              }}
            >
              {[
                { id: 'dotnet', label: '.NET 10', icon: Cpu },
                { id: 'react', label: 'REACT 19', icon: Activity },
                { id: 'database', label: 'DATABASE', icon: Shield },
              ].map((tab) => {
                const Icon = tab.icon
                const isSelected = activeTab === tab.id
                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id)
                      sound.play('click')
                    }}
                    onMouseEnter={() => sound.play('hover')}
                    className={`btn-core-tab ${isSelected ? 'active' : ''}`}
                    style={{
                      flex: 1,
                      border: isSelected
                        ? '1px solid rgba(0, 240, 255, 0.4)'
                        : '1px solid transparent',
                    }}
                  >
                    <Icon size={12} color={isSelected ? 'var(--color-accent-cyan)' : 'var(--color-text-muted)'} />
                    <span>{tab.label}</span>
                  </button>
                )
              })}
            </div>

            {/* Runtime Box */}
            <div
              style={{
                padding: '18px',
                borderRadius: 'var(--radius-md)',
                background: 'rgba(0, 0, 0, 0.4)',
                border: `1px solid ${cur.accent}33`,
                marginBottom: '20px',
              }}
            >
              <div
                className="text-mono-micro"
                style={{
                  color: cur.accent,
                  marginBottom: '6px',
                  fontWeight: 700,
                }}
              >
                // {cur.category}
              </div>
              <div
                className="text-h3"
                style={{
                  color: 'var(--color-text-high)',
                  marginBottom: '8px',
                }}
              >
                {cur.title}
              </div>
              <p
                className="text-body-sm"
                style={{
                  color: '#94a3b8',
                  lineHeight: 1.5,
                  marginBottom: '14px',
                }}
              >
                {cur.desc}
              </p>

              {/* Segmented Cyber Telemetry Bar for Runtime */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: '0.64rem',
                    fontFamily: 'JetBrains Mono, monospace',
                    color: '#64748b',
                  }}
                >
                  <span>{cur.metricLabel}</span>
                  <span style={{ color: '#ffffff', fontWeight: 700 }}>
                    {cur.metricVal}
                  </span>
                </div>

                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(20, 1fr)',
                    gap: '2px',
                    height: '10px',
                    padding: '2px',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    borderRadius: '3px',
                  }}
                >
                  {Array.from({ length: 20 }).map((_, barIdx) => (
                    <div
                      key={barIdx}
                      style={{
                        height: '100%',
                        borderRadius: '1px',
                        backgroundColor:
                          barIdx < cur.barsFilled
                            ? cur.accent
                            : 'rgba(255, 255, 255, 0.05)',
                        boxShadow:
                          barIdx < cur.barsFilled
                            ? `0 0 6px ${cur.accent}`
                            : 'none',
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Metrics */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '8px',
                textAlign: 'center',
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '0.72rem',
              }}
            >
              <div
                style={{
                  padding: '10px 6px',
                  background: 'rgba(255, 255, 255, 0.02)',
                  borderRadius: '6px',
                  border: '1px solid rgba(255, 255, 255, 0.04)',
                }}
              >
                <div style={{ color: '#ffffff', fontSize: '0.96rem', fontWeight: 800 }}>
                  06
                </div>
                <div style={{ color: '#64748b', fontSize: '0.62rem' }}>SHIPPED APPS</div>
              </div>
              <div
                style={{
                  padding: '10px 6px',
                  background: 'rgba(255, 255, 255, 0.02)',
                  borderRadius: '6px',
                  border: '1px solid rgba(255, 255, 255, 0.04)',
                }}
              >
                <div style={{ color: '#00f0ff', fontSize: '0.96rem', fontWeight: 800 }}>
                  &lt; 200ms
                </div>
                <div style={{ color: '#64748b', fontSize: '0.62rem' }}>API LATENCY</div>
              </div>
              <div
                style={{
                  padding: '10px 6px',
                  background: 'rgba(255, 255, 255, 0.02)',
                  borderRadius: '6px',
                  border: '1px solid rgba(255, 255, 255, 0.04)',
                }}
              >
                <div style={{ color: '#10b981', fontSize: '0.96rem', fontWeight: 800 }}>
                  120 FPS
                </div>
                <div style={{ color: '#64748b', fontSize: '0.62rem' }}>CALIBRATION</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
