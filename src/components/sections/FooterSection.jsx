import React, { useState } from 'react'
import { playHoverTick, playMagneticSnap, playQuantumChime, playReverseSweep } from '../../core/audio'
import { lenis } from '../../core/clock'

export function FooterSection() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [submitStatus, setSubmitStatus] = useState(null)

  const handleRewind = () => {
    playReverseSweep()
    lenis.scrollTo(0, { duration: 3.5 })
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()
    if (!formData.name || !formData.email || !formData.message) return

    playQuantumChime()
    setSubmitStatus('SENDING...')

    setTimeout(() => {
      setSubmitStatus('MESSAGE DISPATCHED! THANK YOU.')
      setFormData({ name: '', email: '', message: '' })
      setTimeout(() => setSubmitStatus(null), 5000)
    }, 700)
  }

  return (
    <footer
      id="contact"
      style={{
        position: 'relative',
        padding: '120px 24px 60px',
        maxWidth: '1280px',
        margin: '0 auto',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        zIndex: 2,
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '64px',
          alignItems: 'start',
          marginBottom: '80px',
        }}
      >
        {/* Left: Contact Info & CTA */}
        <div>
          <div
            style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '0.8rem',
              letterSpacing: '0.2em',
              color: '#00f5d4',
              marginBottom: '16px',
            }}
          >
            // CHAPTER 06 — GET IN TOUCH
          </div>

          <h3
            style={{
              fontFamily: 'Syne, sans-serif',
              fontSize: 'clamp(2.4rem, 4.5vw, 3.8rem)',
              fontWeight: 800,
              color: '#ffffff',
              letterSpacing: '-0.02em',
              marginBottom: '20px',
              textTransform: 'uppercase',
              lineHeight: 1.05,
            }}
          >
            LET'S ARCHITECT <br />
            <span
              style={{
                background: 'linear-gradient(135deg, #00f5d4 0%, #00bbf9 50%, #f72585 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              SOMETHING GREAT
            </span>
          </h3>

          <p
            style={{
              fontFamily: 'Space Grotesk, sans-serif',
              fontSize: '1.05rem',
              color: '#94a3b8',
              lineHeight: 1.6,
              marginBottom: '36px',
            }}
          >
            Have a project in mind, need full-stack engineering expertise in React and .NET,
            or want to talk through architecture? Send a note and I'll get right back to you.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '0.88rem',
                color: '#cbd5e1',
              }}
            >
              <span style={{ color: '#00f5d4' }}>● LOCATION:</span>
              <span>Available Globally (Remote)</span>
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '0.88rem',
                color: '#cbd5e1',
              }}
            >
              <span style={{ color: '#00f5d4' }}>● SPECIALTY:</span>
              <span>React 19, .NET 10, MySQL, Three.js</span>
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '0.88rem',
                color: '#cbd5e1',
              }}
            >
              <span style={{ color: '#00f5d4' }}>● STATUS:</span>
              <span style={{ color: '#00f5d4' }}>Open for Full-Time & Contract Builds</span>
            </div>
          </div>
        </div>

        {/* Right: Interactive Contact Form */}
        <div
          style={{
            background: 'rgba(10, 15, 30, 0.75)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '24px',
            padding: '36px',
            boxShadow: '0 25px 50px -15px rgba(0, 0, 0, 0.8)',
          }}
        >
          <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <label
                style={{
                  display: 'block',
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '0.75rem',
                  letterSpacing: '0.1em',
                  color: '#94a3b8',
                  marginBottom: '8px',
                }}
              >
                NAME
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                onFocus={playHoverTick}
                placeholder="Your Name"
                style={{
                  width: '100%',
                  background: 'rgba(5, 7, 15, 0.8)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  borderRadius: '12px',
                  padding: '14px 18px',
                  color: '#ffffff',
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontSize: '0.95rem',
                  outline: 'none',
                }}
              />
            </div>

            <div>
              <label
                style={{
                  display: 'block',
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '0.75rem',
                  letterSpacing: '0.1em',
                  color: '#94a3b8',
                  marginBottom: '8px',
                }}
              >
                EMAIL ADDRESS
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                onFocus={playHoverTick}
                placeholder="name@example.com"
                style={{
                  width: '100%',
                  background: 'rgba(5, 7, 15, 0.8)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  borderRadius: '12px',
                  padding: '14px 18px',
                  color: '#ffffff',
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontSize: '0.95rem',
                  outline: 'none',
                }}
              />
            </div>

            <div>
              <label
                style={{
                  display: 'block',
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '0.75rem',
                  letterSpacing: '0.1em',
                  color: '#94a3b8',
                  marginBottom: '8px',
                }}
              >
                MESSAGE
              </label>
              <textarea
                required
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                onFocus={playHoverTick}
                placeholder="Tell me about your project, timeline, or idea..."
                style={{
                  width: '100%',
                  background: 'rgba(5, 7, 15, 0.8)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  borderRadius: '12px',
                  padding: '14px 18px',
                  color: '#ffffff',
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontSize: '0.95rem',
                  outline: 'none',
                  resize: 'vertical',
                }}
              />
            </div>

            <button
              type="submit"
              onMouseEnter={playHoverTick}
              style={{
                background: '#00f5d4',
                color: '#05070f',
                border: 'none',
                borderRadius: '9999px',
                padding: '16px',
                fontFamily: 'Space Grotesk, sans-serif',
                fontWeight: 700,
                fontSize: '0.95rem',
                cursor: 'pointer',
                boxShadow: '0 0 25px rgba(0, 245, 212, 0.35)',
                transition: 'transform 0.2s ease',
              }}
            >
              DISPATCH MESSAGE ↗
            </button>

            {submitStatus && (
              <div
                style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '0.8rem',
                  color: '#00f5d4',
                  textAlign: 'center',
                }}
              >
                {submitStatus}
              </div>
            )}
          </form>
        </div>
      </div>

      {/* Rewind To Top Button */}
      <div style={{ textAlign: 'center', marginBottom: '48px' }}>
        <button
          onClick={handleRewind}
          onMouseEnter={playHoverTick}
          style={{
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(0, 245, 212, 0.3)',
            borderRadius: '9999px',
            padding: '18px 44px',
            color: '#00f5d4',
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '0.85rem',
            fontWeight: 700,
            letterSpacing: '0.15em',
            cursor: 'pointer',
            boxShadow: '0 0 30px rgba(0, 245, 212, 0.12)',
            transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          ▲ REWIND TO ORIGIN
        </button>
      </div>

      {/* Bottom Bar */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
          paddingTop: '24px',
          borderTop: '1px solid rgba(255, 255, 255, 0.05)',
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: '0.72rem',
          color: '#64748b',
        }}
      >
        <div>© 2026 NASR ELSHAMEKH // ALL RIGHTS RESERVED</div>
        <div>
          <a
            href="https://github.com/nasrelshamekh"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#94a3b8', textDecoration: 'none', marginRight: '16px' }}
          >
            GITHUB ↗
          </a>
          <a
            href="https://circle-hub-nu.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#94a3b8', textDecoration: 'none', marginRight: '16px' }}
          >
            CIRCLEHUB ↗
          </a>
          <a
            href="https://nexora-app-seven.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#94a3b8', textDecoration: 'none' }}
          >
            NEXORA ↗
          </a>
        </div>
        <div>DUAL-CLOCK ENGINE: LENIS + THREE.JS + GSAP</div>
      </div>
    </footer>
  )
}
