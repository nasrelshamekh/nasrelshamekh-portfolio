import React, { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function Philosophy() {
  const containerRef = useRef()
  const paragraphRef = useRef()
  const pillarsRef = useRef()

  useGSAP(
    () => {
      // 1. Signature scroll scrub: words illuminate as you scroll
      const words = paragraphRef.current.querySelectorAll('.story-word')

      gsap.fromTo(
        words,
        { opacity: 0.18, color: '#475569' },
        {
          opacity: 1,
          color: '#ffffff',
          stagger: 0.04,
          scrollTrigger: {
            trigger: paragraphRef.current,
            start: 'top 75%',
            end: 'bottom 45%',
            scrub: 1.0,
          },
        }
      )

      // 2. Pillars reveal
      const cards = pillarsRef.current.querySelectorAll('.pillar-card')
      cards.forEach((card, idx) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: idx * 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              once: true,
            },
          }
        )
      })
    },
    { scope: containerRef }
  )

  const narrativeText =
    "Great software lives at the convergence of two crafts: rigorous system architecture under the hood, and visceral, effortless delight on the surface. Behind every fluid interface is an unyielding data engine—scalable RESTful microservices in ASP.NET Core (.NET 10), normalized relational schemas, and hardened JWT authentication. On the front, I engineer 60fps web applications in React 19 and Next.js with strict TypeScript precision and tactile micro-interactions."

  return (
    <section
      ref={containerRef}
      id="story"
      style={{
        position: 'relative',
        padding: '160px clamp(24px, 4vw, 64px)',
        maxWidth: '1520px',
        margin: '0 auto',
        zIndex: 2,
      }}
    >
      {/* Chapter Marker */}
      <div
        style={{
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: '0.8rem',
          letterSpacing: '0.22em',
          color: '#a855f7',
          marginBottom: '20px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
        }}
      >
        <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#a855f7' }} />
        <span>CHAPTER 01 // THE PHILOSOPHY</span>
      </div>

      <h2
        style={{
          fontFamily: 'Syne, sans-serif',
          fontSize: 'clamp(2.4rem, 5.2vw, 4.6rem)',
          fontWeight: 800,
          lineHeight: 1.05,
          color: '#ffffff',
          letterSpacing: '-0.02em',
          textTransform: 'uppercase',
          marginBottom: '44px',
        }}
      >
        TWO SIDES OF <br />
        <span
          style={{
            background: 'linear-gradient(135deg, #a855f7 0%, #38bdf8 50%, #06b6d4 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            display: 'inline-block',
          }}
        >
          THE SAME WIRE.
        </span>
      </h2>

      {/* Signature Scroll-Scrubbed Text Reveal */}
      <p
        ref={paragraphRef}
        style={{
          fontFamily: 'Space Grotesk, sans-serif',
          fontSize: 'clamp(1.25rem, 2.6vw, 2.1rem)',
          lineHeight: 1.45,
          fontWeight: 500,
          maxWidth: '1180px',
          marginBottom: '88px',
          letterSpacing: '-0.01em',
        }}
      >
        {narrativeText.split(' ').map((word, i) => (
          <span
            key={i}
            className="story-word"
            style={{
              display: 'inline-block',
              marginRight: '0.28em',
              transition: 'opacity 0.2s ease, color 0.2s ease',
              willChange: 'opacity, color',
            }}
          >
            {word}
          </span>
        ))}
      </p>

      {/* Three Structural Columns */}
      <div
        ref={pillarsRef}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '28px',
        }}
      >
        {[
          {
            num: '01',
            title: 'THE ENGINE // BACKEND ARCHITECTURE',
            tech: 'C# • ASP.NET Core 10 • Node.js • PostgreSQL • MySQL • EF Core',
            desc: 'Architecting resilient RESTful APIs, distributed microservices, and database transaction pipelines. Scalable schema design, LINQ optimization, role-based JWT auth guards, and sub-second execution.',
            accent: '#a855f7',
          },
          {
            num: '02',
            title: 'THE SURFACE // FRONTEND CRAFTSMANSHIP',
            tech: 'React 19 • Next.js App Router • TypeScript • Tailwind CSS • Vite',
            desc: 'Crafting responsive, high-performance web applications with modular component architecture. Strict TypeScript type-safety, robust state orchestration, and fluid layout responsiveness across all screens.',
            accent: '#06b6d4',
          },
          {
            num: '03',
            title: 'THE SYNERGY // CREATIVE COMPUTING & MOTION',
            tech: 'GSAP ScrollTrigger • Three.js • Lenis Smooth Scroll • WebGL',
            desc: 'Bringing software to life through intentional motion and visceral tactile feedback. Physics-driven interactions and 120 FPS animations engineered for speed, beauty, and strict web accessibility.',
            accent: '#38bdf8',
          },
        ].map((item) => (
          <div
            key={item.num}
            className="pillar-card glass-panel"
            style={{
              padding: '36px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '20px',
                }}
              >
                <span
                  style={{
                    fontFamily: 'JetBrains Mono, monospace',
                    fontSize: '1.25rem',
                    fontWeight: 700,
                    color: item.accent,
                  }}
                >
                  /{item.num}
                </span>
                <span
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    backgroundColor: item.accent,
                    boxShadow: `0 0 10px ${item.accent}`,
                  }}
                />
              </div>

              <h3
                style={{
                  fontFamily: 'Syne, sans-serif',
                  fontSize: '1.2rem',
                  fontWeight: 700,
                  color: '#ffffff',
                  marginBottom: '10px',
                }}
              >
                {item.title}
              </h3>

              <div
                style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '0.72rem',
                  color: '#a855f7',
                  letterSpacing: '0.04em',
                  marginBottom: '18px',
                }}
              >
                {item.tech}
              </div>

              <p
                style={{
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontSize: '0.98rem',
                  color: '#94a3b8',
                  lineHeight: 1.6,
                }}
              >
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
