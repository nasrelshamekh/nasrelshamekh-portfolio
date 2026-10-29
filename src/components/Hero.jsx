import React, { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { SplitText } from 'gsap/SplitText'

gsap.registerPlugin(SplitText)

export function Hero({ onNavigate }) {
  const containerRef = useRef()
  const titleRef = useRef()
  const badgeRef = useRef()
  const bioRef = useRef()
  const statsRef = useRef()
  const ctaRef = useRef()

  useGSAP(
    () => {
      // 1. Badge slide down
      gsap.fromTo(
        badgeRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.1 }
      )

      // 2. Kinetic character reveal
      const split = new SplitText(titleRef.current, {
        type: 'chars,words',
        wordsClass: 'hero-word',
      })

      split.words.forEach((w) => {
        w.style.display = 'inline-block'
        w.style.whiteSpace = 'nowrap'
      })

      gsap.fromTo(
        split.chars,
        { opacity: 0, y: 70, rotateX: -65 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          stagger: 0.015,
          duration: 1.1,
          ease: 'power3.out',
          delay: 0.2,
        }
      )

      // 3. Bio & stats entrance
      gsap.fromTo(
        bioRef.current,
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', delay: 0.6 }
      )

      gsap.fromTo(
        statsRef.current,
        { opacity: 0, y: 30, scale: 0.98 },
        { opacity: 1, y: 0, scale: 1, duration: 0.9, ease: 'back.out(1.4)', delay: 0.75 }
      )

      gsap.fromTo(
        ctaRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.9 }
      )
    },
    { scope: containerRef }
  )

  const handleMagneticMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    gsap.to(e.currentTarget, {
      x: x * 0.3,
      y: y * 0.3,
      duration: 0.2,
      ease: 'power2.out',
    })
  }

  const handleMagneticLeave = (e) => {
    gsap.to(e.currentTarget, {
      x: 0,
      y: 0,
      duration: 0.6,
      ease: 'elastic.out(1.2, 0.4)',
    })
  }

  return (
    <section
      ref={containerRef}
      id="hero"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        padding: '140px clamp(24px, 4vw, 64px) 80px',
        maxWidth: '1520px',
        margin: '0 auto',
        zIndex: 2,
      }}
    >
      {/* 1. Identity Badge */}
      <div
        ref={badgeRef}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '12px',
          padding: '8px 22px',
          borderRadius: '9999px',
          background: 'rgba(255, 255, 255, 0.04)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(12px)',
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: '0.78rem',
          letterSpacing: '0.12em',
          color: '#94a3b8',
          marginBottom: '32px',
        }}
      >
        <span style={{ color: '#a855f7', fontWeight: 600 }}>NASR ELSHAMEKH</span>
        <span style={{ opacity: 0.3 }}>/</span>
        <span style={{ color: '#ffffff' }}>FULL-STACK SOFTWARE ENGINEER</span>
        <span style={{ opacity: 0.3 }}>/</span>
        <span style={{ color: '#10b981' }}>ASP.NET CORE 10 • REACT 19</span>
      </div>

      {/* 2. Headline */}
      <h1
        ref={titleRef}
        className="hero-headline"
        style={{
          fontFamily: 'Syne, sans-serif',
          fontSize: 'clamp(2.4rem, 6.2vw, 5.6rem)',
          fontWeight: 800,
          lineHeight: 1.04,
          letterSpacing: '-0.03em',
          color: '#ffffff',
          textTransform: 'uppercase',
          maxWidth: '1280px',
          marginBottom: '28px',
          willChange: 'transform',
        }}
      >
        ARCHITECTING RESILIENT BACKENDS <br />
        <span style={{ color: '#a855f7', textShadow: '0 0 35px rgba(168, 85, 247, 0.45)' }}>
          &amp; FLUID WEB
        </span>{' '}
        EXPERIENCES
      </h1>

      {/* 3. Personal Statement */}
      <p
        ref={bioRef}
        style={{
          fontFamily: 'Space Grotesk, sans-serif',
          fontSize: 'clamp(1.05rem, 1.8vw, 1.3rem)',
          color: '#94a3b8',
          maxWidth: '820px',
          lineHeight: 1.65,
          fontWeight: 400,
          margin: '0 auto 36px',
        }}
      >
        I bridge the divide between high-throughput system architecture—designing distributed microservices and RESTful APIs in <strong style={{ color: '#ffffff' }}>ASP.NET Core (.NET 10)</strong> &amp; Node.js—and visceral, 60fps frontend craft in <strong style={{ color: '#ffffff' }}>React 19, Next.js</strong> &amp; TypeScript.
      </p>

      {/* 4. Tactile Stat & Identity Card */}
      <div
        ref={statsRef}
        className="glass-panel"
        style={{
          display: 'inline-flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '28px',
          padding: '16px 32px',
          borderRadius: '20px',
          marginBottom: '44px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <img
            src="/nasr-icon.png"
            alt="Nasr Elshamekh"
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              border: '2px solid rgba(168, 85, 247, 0.6)',
              objectFit: 'cover',
            }}
          />
          <div style={{ textAlign: 'left' }}>
            <div style={{ fontFamily: 'Syne, sans-serif', fontSize: '0.88rem', fontWeight: 700, color: '#ffffff' }}>
              Nasr Elshamekh
            </div>
            <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.68rem', color: '#64748b' }}>
              Full-Stack Architect
            </div>
          </div>
        </div>

        <div style={{ width: '1px', height: '24px', background: 'rgba(255, 255, 255, 0.1)' }} />

        <div style={{ textAlign: 'left', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.74rem' }}>
          <span style={{ color: '#64748b' }}>CORE STACK: </span>
          <span style={{ color: '#e2e8f0' }}>React 19 • Next.js • .NET 10 • TypeScript • MySQL</span>
        </div>

        <div style={{ width: '1px', height: '24px', background: 'rgba(255, 255, 255, 0.1)' }} />

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#10b981' }} className="live-beacon" />
          <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.72rem', color: '#10b981' }}>
            Open for Hire &amp; Contracts
          </span>
        </div>
      </div>

      {/* 5. CTA Actions with Magnetic Physics */}
      <div
        ref={ctaRef}
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '16px',
        }}
      >
        <button
          onClick={() => onNavigate('works')}
          onMouseMove={handleMagneticMove}
          onMouseLeave={handleMagneticLeave}
          className="btn-action-primary"
        >
          EXPLORE SELECTED WORKS ↓
        </button>

        <button
          onClick={() => onNavigate('contact')}
          onMouseMove={handleMagneticMove}
          onMouseLeave={handleMagneticLeave}
          className="btn-action-secondary"
        >
          GET IN TOUCH ↗
        </button>
      </div>

      {/* 6. Scroll Hint */}
      <div
        style={{
          marginTop: '56px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
          opacity: 0.6,
        }}
      >
        <span
          style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '0.66rem',
            letterSpacing: '0.2em',
            color: '#64748b',
          }}
        >
          SCROLL TO UNPACK THE STORY
        </span>
        <div
          style={{
            width: '1px',
            height: '24px',
            background: 'linear-gradient(to bottom, #a855f7, transparent)',
          }}
        />
      </div>
    </section>
  )
}
