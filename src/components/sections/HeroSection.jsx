import React, { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { SplitText } from 'gsap/SplitText'
import { lenis } from '../../core/clock'
import { playHoverTick, playMagneticSnap } from '../../core/audio'

gsap.registerPlugin(SplitText)

export function HeroSection() {
  const containerRef = useRef()
  const titleRef = useRef()
  const subtitleRef = useRef()
  const telemetryRef = useRef()
  const ctaGroupRef = useRef()

  useGSAP(
    () => {
      // 1. SplitText 3D kinetic reveal on ones (60 fps)
      const split = new SplitText(titleRef.current, {
        type: 'chars,words',
        wordsClass: 'hero-word',
      })

      // Lock each word so individual characters never break across lines
      split.words.forEach((word) => {
        word.style.display = 'inline-block'
        word.style.whiteSpace = 'nowrap'
      })

      gsap.fromTo(
        split.chars,
        {
          opacity: 0,
          y: 90,
          rotateX: -85,
        },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          stagger: 0.02,
          duration: 1.2,
          ease: 'power3.out',
          delay: 0.15,
        }
      )

      // 2. Interactive Magnetic Letter Hover (MWG 089 / 041)
      split.chars.forEach((char) => {
        char.style.display = 'inline-block'
        char.style.cursor = 'default'
        char.style.willChange = 'transform, color'
        const baseColor = window.getComputedStyle(char).color || '#ffffff'

        const onEnter = () => {
          playHoverTick()
          gsap.to(char, {
            y: -10,
            scale: 1.16,
            color: '#00bbf9',
            duration: 0.16,
            ease: 'power2.out',
            overwrite: 'auto',
          })
        }

        const onLeave = () => {
          gsap.to(char, {
            y: 0,
            scale: 1,
            color: baseColor,
            duration: 0.55,
            ease: 'elastic.out(1.2, 0.4)',
            overwrite: 'auto',
          })
        }

        char.addEventListener('mouseenter', onEnter)
        char.addEventListener('mouseleave', onLeave)
      })

      // 3. Staggered section entrance (fromTo prevents zero-destination traps on re-render)
      gsap.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1.0,
          ease: 'power2.out',
          delay: 0.6,
        }
      )

      gsap.fromTo(
        telemetryRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          delay: 0.8,
        }
      )

      gsap.fromTo(
        ctaGroupRef.current,
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: 'back.out(1.7)',
          delay: 1.0,
        }
      )

      // 4. Velocity-reactive typography skew
      const handleTicker = () => {
        const vel = Math.min(Math.max((lenis.velocity || 0) * 0.06, -10), 10)
        if (titleRef.current) {
          titleRef.current.style.transform = `skewY(${vel * 0.35}deg)`
        }
      }

      gsap.ticker.add(handleTicker)
      return () => gsap.ticker.remove(handleTicker)
    },
    { scope: containerRef }
  )

  // Squash & Stretch button physics
  const handleBtnPointerDown = (e) => {
    gsap.to(e.currentTarget, {
      scaleX: 1.1,
      scaleY: 0.9,
      duration: 0.1,
      ease: 'power2.in',
    })
  }

  const handleBtnPointerUp = (e) => {
    gsap.timeline()
      .to(e.currentTarget, {
        scaleX: 0.95,
        scaleY: 1.06,
        duration: 0.12,
        ease: 'power2.out',
      })
      .to(e.currentTarget, {
        scaleX: 1,
        scaleY: 1,
        duration: 0.45,
        ease: 'elastic.out(1.4, 0.4)',
      })
  }

  const handleExploreClick = () => {
    playMagneticSnap()
    const target = document.getElementById('work')
    if (target) lenis.scrollTo(target, { duration: 1.6 })
  }

  const handleContactClick = () => {
    playMagneticSnap()
    const target = document.getElementById('contact')
    if (target) lenis.scrollTo(target, { duration: 1.8 })
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
        padding: '120px 24px 60px',
        zIndex: 2,
        perspective: '1200px',
      }}
    >
      {/* Telemetry Status Strip with Apple AI flowing chromatic border */}
      <div
        ref={telemetryRef}
        className="apple-ai-border"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '12px',
          padding: '8px 20px',
          borderRadius: '9999px',
          background: 'rgba(10, 15, 30, 0.75)',
          backdropFilter: 'blur(12px)',
          marginBottom: '32px',
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: '0.75rem',
          letterSpacing: '0.12em',
          color: '#94a3b8',
        }}
      >
        <span style={{ color: '#00f5d4' }}>● NASR ELSHAMEKH</span>
        <span style={{ opacity: 0.3 }}>|</span>
        <span>FULL-STACK ARCHITECT</span>
        <span style={{ opacity: 0.3 }}>|</span>
        <span>REACT 19 • .NET 10</span>
        <span style={{ opacity: 0.3 }}>|</span>
        <span style={{ color: '#00f5d4' }}>AVAILABLE FOR BUILDS</span>
      </div>

      {/* Main Kinetic Title with Interactive Hover & 3D Char Splits */}
      <h1
        ref={titleRef}
        style={{
          fontFamily: 'Syne, sans-serif',
          fontSize: 'clamp(2.5rem, 6.0vw, 5.8rem)',
          fontWeight: 800,
          lineHeight: 1.04,
          letterSpacing: '-0.025em',
          color: '#ffffff',
          maxWidth: '1260px',
          width: '100%',
          margin: '0 auto 28px',
          textTransform: 'uppercase',
          willChange: 'transform',
        }}
      >
        CRAFTING RESILIENT SYSTEMS <br />
        <span
          style={{
            color: '#00f5d4',
            textShadow: '0 0 32px rgba(0, 245, 212, 0.45)',
          }}
        >
          &amp; IMMERSIVE
        </span>{' '}
        WEB EXPERIENCES
      </h1>

      {/* Subtitle / Positioning */}
      <p
        ref={subtitleRef}
        style={{
          fontFamily: 'Space Grotesk, sans-serif',
          fontSize: 'clamp(1rem, 1.8vw, 1.3rem)',
          color: '#cbd5e1',
          maxWidth: '740px',
          lineHeight: 1.6,
          fontWeight: 400,
          margin: '0 auto 44px',
        }}
      >
        Full-stack developer building high-performance web applications with React, Next.js, and TypeScript, backed by robust REST APIs and distributed microservices with ASP.NET Core (.NET 10) & Node.js.
      </p>

      {/* Interactive CTA Buttons with Squash & Stretch */}
      <div
        ref={ctaGroupRef}
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '18px',
        }}
      >
        <button
          onClick={handleExploreClick}
          onMouseEnter={playHoverTick}
          onPointerDown={handleBtnPointerDown}
          onPointerUp={handleBtnPointerUp}
          className="btn-primary"
          style={{
            background: '#ffffff',
            color: '#05070f',
            border: 'none',
            borderRadius: '9999px',
            padding: '16px 36px',
            fontFamily: 'Space Grotesk, sans-serif',
            fontSize: '0.95rem',
            fontWeight: 700,
            letterSpacing: '0.02em',
            cursor: 'pointer',
            boxShadow: '0 10px 30px -10px rgba(255, 255, 255, 0.4)',
            transformOrigin: 'center center',
          }}
        >
          VIEW SELECTED WORK ↓
        </button>

        <button
          onClick={handleContactClick}
          onMouseEnter={playHoverTick}
          onPointerDown={handleBtnPointerDown}
          onPointerUp={handleBtnPointerUp}
          className="btn-secondary"
          style={{
            background: 'rgba(255, 255, 255, 0.05)',
            color: '#ffffff',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            borderRadius: '9999px',
            padding: '16px 32px',
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '0.88rem',
            fontWeight: 500,
            cursor: 'pointer',
            backdropFilter: 'blur(8px)',
            transformOrigin: 'center center',
          }}
        >
          GET IN TOUCH ↗
        </button>
      </div>

      {/* Floating Scroll Indicator in normal flow below buttons */}
      <div
        style={{
          marginTop: '44px',
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
            fontSize: '0.65rem',
            letterSpacing: '0.2em',
            color: '#64748b',
          }}
        >
          SCROLL TO EXPLORE
        </span>
        <div
          style={{
            width: '1px',
            height: '24px',
            background: 'linear-gradient(to bottom, #00f5d4, transparent)',
          }}
        />
      </div>
    </section>
  )
}
