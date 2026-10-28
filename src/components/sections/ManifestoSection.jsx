import React, { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { playHoverTick } from '../../core/audio'

gsap.registerPlugin(ScrollTrigger)

export function ManifestoSection() {
  const containerRef = useRef()

  useGSAP(
    () => {
      const rows = gsap.utils.toArray('.manifesto-row')

      rows.forEach((row) => {
        gsap.fromTo(
          row,
          { opacity: 0.2, x: -30 },
          {
            opacity: 1,
            x: 0,
            duration: 1.0,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: row,
              start: 'top 80%',
              end: 'top 40%',
              scrub: 0.8,
            },
          }
        )
      })
    },
    { scope: containerRef }
  )

  return (
    <section
      ref={containerRef}
      id="about"
      style={{
        position: 'relative',
        padding: '160px 24px',
        maxWidth: '1200px',
        margin: '0 auto',
        zIndex: 2,
      }}
    >
      <div
        style={{
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: '0.8rem',
          letterSpacing: '0.2em',
          color: '#00f5d4',
          marginBottom: '24px',
        }}
      >
        // CHAPTER 02 — ABOUT & PHILOSOPHY
      </div>

      <h2
        style={{
          fontFamily: 'Syne, sans-serif',
          fontSize: 'clamp(2.4rem, 5.5vw, 4.8rem)',
          fontWeight: 800,
          lineHeight: 1.05,
          color: '#ffffff',
          letterSpacing: '-0.02em',
          textTransform: 'uppercase',
          marginBottom: '64px',
        }}
      >
        ENGINEERING <br />
        <span
          style={{
            display: 'inline-block',
            background: 'linear-gradient(135deg, #00f5d4 0%, #00bbf9 50%, #f72585 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          WITH PURPOSE
        </span>
      </h2>

      {/* About Pillars */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
        {[
          {
            num: '01',
            title: 'MODERN REACT & NEXT.JS PRECISION',
            desc: 'Building responsive, scalable web applications using React, Next.js, Vite, TypeScript, and Tailwind CSS. Emphasizing component reusability, clean state orchestration, and fluid performance.',
          },
          {
            num: '02',
            title: 'ENTERPRISE .NET & NODE BACKENDS',
            desc: 'Designing robust, secure REST APIs in ASP.NET Core (.NET 10) and Node.js. Architecting relational schemas with PostgreSQL & MySQL, managed with Entity Framework Core and Prisma ORM, safeguarded with JWT authentication.',
          },
          {
            num: '03',
            title: 'CREATIVE COMPUTING & HIGH-FPS MOTION',
            desc: 'Fusing rigorous software engineering with high-end creative web technologies—leveraging Three.js, GSAP, and Lenis smooth scrolling to craft unforgettable web experiences that leave a lasting mark.',
          },
        ].map((item) => (
          <div
            key={item.num}
            className="manifesto-row"
            onMouseEnter={playHoverTick}
            style={{
              display: 'grid',
              gridTemplateColumns: '80px 1.2fr 1.8fr',
              alignItems: 'baseline',
              paddingBottom: '36px',
              borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
              gap: '24px',
            }}
          >
            <span
              style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '1.2rem',
                color: '#00f5d4',
                fontWeight: 700,
              }}
            >
              /{item.num}
            </span>
            <h3
              style={{
                fontFamily: 'Syne, sans-serif',
                fontSize: 'clamp(1.2rem, 1.8vw, 1.6rem)',
                fontWeight: 700,
                color: '#ffffff',
                textTransform: 'uppercase',
              }}
            >
              {item.title}
            </h3>
            <p
              style={{
                fontFamily: 'Space Grotesk, sans-serif',
                fontSize: '1.05rem',
                color: '#94a3b8',
                lineHeight: 1.6,
              }}
            >
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
