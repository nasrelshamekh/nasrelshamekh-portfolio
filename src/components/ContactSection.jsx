import React, { useState } from 'react'
import { Send, CheckCircle2, Copy, ShieldCheck, ArrowUpRight } from 'lucide-react'
import { sound } from '../utils/soundEngine'

export function ContactSection({ onScrollTop }) {
  const [copied, setCopied] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState(null)
  const [transmitting, setTransmitting] = useState(false)
  const [transmittingProgress, setTransmittingProgress] = useState(0)

  const handleCopy = () => {
    navigator.clipboard.writeText('nasrelshamekh@gmail.com')
    sound.play('accessGranted')
    setCopied(true)
    setTimeout(() => setCopied(false), 3000)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.name || !formData.email || !formData.message) return

    sound.play('click')
    setTransmitting(true)
    setStatus('SENDING MESSAGE...')

    let p = 0
    const interval = setInterval(() => {
      p += 20
      setTransmittingProgress(p)
      sound.play('packet')
      if (p >= 100) {
        clearInterval(interval)
        setTimeout(() => {
          sound.play('accessGranted')
          setStatus('MESSAGE DELIVERED — THANK YOU')
          setTransmitting(false)
          setFormData({ name: '', email: '', message: '' })
          setTimeout(() => setStatus(null), 6000)
        }, 300)
      }
    }, 120)
  }

  return (
    <footer
      id="contact"
      style={{
        position: 'relative',
        padding: '120px 0 60px',
        borderTop: '1px solid rgba(0, 240, 255, 0.15)',
        zIndex: 2,
      }}
    >
      <div className="grid-widescreen">
        {/* Section Header - Full-Width, Never Hidden */}
        <div style={{ marginBottom: '56px' }}>
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'var(--text-mono-label)',
              letterSpacing: '0.2em',
              color: 'var(--color-accent-cyan)',
              marginBottom: '16px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
            }}
          >
            <span
              style={{
                width: '8px',
                height: '8px',
                borderRadius: 'var(--radius-full)',
                background: 'var(--color-accent-cyan)',
                boxShadow: '0 0 8px var(--color-accent-cyan)',
              }}
            />
            <span>SECTION 05 // DIRECT INQUIRIES</span>
          </div>

          <h2
            className="text-h1"
            style={{
              textTransform: 'uppercase',
              marginBottom: '18px',
            }}
          >
            START A{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, var(--color-accent-cyan) 0%, #3b82f6 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                display: 'inline-block',
                textShadow: '0 0 16px rgba(0, 240, 255, 0.22)',
              }}
            >
              CONVERSATION
            </span>
          </h2>

          <p
            className="text-body-lg"
            style={{
              maxWidth: '720px',
            }}
          >
            I am currently available for full-time senior engineering roles,
            backend architecture consulting, and high-impact web builds. Have a
            project or opportunity to discuss? Send a message below.
          </p>
        </div>

        {/* 2-Column Balanced Cards: Direct Channels on left, Message Form on right */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
            gap: '32px',
            alignItems: 'start',
            marginBottom: '96px',
          }}
        >
          {/* Left Card: Direct Transmission & Verified Channels */}
          <div
            className="hud-card"
            style={{
              padding: 'clamp(20px, 3.2vw, 32px)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              minHeight: '100%',
              background: 'rgba(6, 9, 15, 0.88)',
              border: '1px solid rgba(0, 240, 255, 0.2)',
              position: 'relative',
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '0.7rem',
                  color: '#00f0ff',
                  letterSpacing: '0.12em',
                  marginBottom: '12px',
                  fontWeight: 700,
                }}
              >
                DIRECT INQUIRIES // CONTACT DETAILS
              </div>

              <div
                className="text-h2"
                style={{
                  color: 'var(--color-text-high)',
                  marginBottom: '8px',
                }}
              >
                Let's Build Together
              </div>

              <p
                style={{
                  fontFamily: 'Plus Jakarta Sans, sans-serif',
                  fontSize: '0.94rem',
                  color: '#94a3b8',
                  lineHeight: 1.6,
                  marginBottom: '28px',
                }}
              >
                Direct inquiries are typically answered within 24 hours. Copy my
                email below or connect via GitHub and LinkedIn.
              </p>

              {/* One-Click Copy Email Pill */}
              <div style={{ marginBottom: '28px' }}>
                <div
                  style={{
                    fontFamily: 'JetBrains Mono, monospace',
                    fontSize: '0.68rem',
                    color: '#64748b',
                    letterSpacing: '0.08em',
                    marginBottom: '8px',
                  }}
                >
                  EMAIL ADDRESS // CLICK TO COPY
                </div>

                <button
                  onClick={handleCopy}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '14px 20px',
                    borderRadius: '8px',
                    background: copied
                      ? 'rgba(16, 185, 129, 0.12)'
                      : 'rgba(0, 240, 255, 0.05)',
                    border: copied
                      ? '1px solid #10b981'
                      : '1px solid rgba(0, 240, 255, 0.25)',
                    fontFamily: 'JetBrains Mono, monospace',
                    fontSize: '0.88rem',
                    fontWeight: 600,
                    color: copied ? '#10b981' : '#ffffff',
                    transition: 'all 0.2s ease',
                    width: '100%',
                    justifyContent: 'space-between',
                  }}
                >
                  <span
                    style={{
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    nasrelshamekh@gmail.com
                  </span>
                  <span
                    style={{
                      fontSize: '0.72rem',
                      padding: '3px 8px',
                      borderRadius: '4px',
                      background: copied
                        ? '#10b981'
                        : 'rgba(0, 240, 255, 0.15)',
                      color: copied ? '#05070c' : '#00f0ff',
                      fontWeight: 700,
                      flexShrink: 0,
                    }}
                  >
                    {copied ? '✓ COPIED' : 'COPY'}
                  </span>
                </button>
              </div>

              {/* Status & Location Telemetry with Segmented Signal Bars */}
              <div
                style={{
                  padding: '16px',
                  borderRadius: '8px',
                  background: 'rgba(0, 0, 0, 0.4)',
                  border: '1px solid rgba(255, 255, 255, 0.06)',
                  marginBottom: '28px',
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '0.72rem',
                  lineHeight: 1.6,
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: '6px',
                  }}
                >
                  <span style={{ color: '#64748b' }}>LOCATION:</span>
                  <span style={{ color: '#ffffff' }}>
                    Alexandria, Egypt (UTC+3)
                  </span>
                </div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: '6px',
                  }}
                >
                  <span style={{ color: '#64748b' }}>COORDINATES:</span>
                  <span style={{ color: '#00f0ff' }}>
                    31.2001° N, 29.9187° E
                  </span>
                </div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: '6px',
                  }}
                >
                  <span style={{ color: '#64748b' }}>PRIMARY STACK:</span>
                  <span style={{ color: '#3b82f6' }}>.NET 10 + React 19</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#64748b' }}>AVAILABILITY:</span>
                  <span style={{ color: '#10b981', fontWeight: 700 }}>
                    OPEN FOR ROLES &amp; CONTRACTS
                  </span>
                </div>
              </div>
            </div>

            {/* Social Channels */}
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <a
                href="https://github.com/nasrelshamekh"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-core-secondary"
                style={{ flex: 1, justifyContent: 'center' }}
              >
                GITHUB ↗
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-core-secondary"
                style={{ flex: 1, justifyContent: 'center' }}
              >
                LINKEDIN ↗
              </a>
            </div>
          </div>

          {/* Right Card: Interactive Transmission Form */}
          <div
            className="hud-card"
            style={{
              padding: 'clamp(20px, 3.2vw, 32px)',
              background: 'rgba(6, 9, 15, 0.88)',
              border: '1px solid rgba(0, 240, 255, 0.2)',
              position: 'relative',
            }}
          >
            <div
              className="text-h2"
              style={{
                color: 'var(--color-text-high)',
                marginBottom: '6px',
              }}
            >
              Direct Message
            </div>
            <div
              style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '0.72rem',
                color: '#64748b',
                marginBottom: '24px',
              }}
            >
              Delivered directly to my inbox
            </div>

            <form
              onSubmit={handleSubmit}
              style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
            >
              <div>
                <label
                  style={{
                    display: 'block',
                    fontFamily: 'JetBrains Mono, monospace',
                    fontSize: '0.68rem',
                    color: '#94a3b8',
                    marginBottom: '8px',
                  }}
                >
                  YOUR NAME
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="Jane Doe"
                  style={{
                    width: '100%',
                    padding: '13px 16px',
                    borderRadius: '8px',
                    background: 'rgba(0, 0, 0, 0.5)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    color: '#ffffff',
                    fontFamily: 'Plus Jakarta Sans, sans-serif',
                    fontSize: '0.92rem',
                    outline: 'none',
                  }}
                />
              </div>

              <div>
                <label
                  style={{
                    display: 'block',
                    fontFamily: 'JetBrains Mono, monospace',
                    fontSize: '0.68rem',
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
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="jane@example.com"
                  style={{
                    width: '100%',
                    padding: '13px 16px',
                    borderRadius: '8px',
                    background: 'rgba(0, 0, 0, 0.5)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    color: '#ffffff',
                    fontFamily: 'Plus Jakarta Sans, sans-serif',
                    fontSize: '0.92rem',
                    outline: 'none',
                  }}
                />
              </div>

              <div>
                <label
                  style={{
                    display: 'block',
                    fontFamily: 'JetBrains Mono, monospace',
                    fontSize: '0.68rem',
                    color: '#94a3b8',
                    marginBottom: '8px',
                  }}
                >
                  MESSAGE OR PROJECT DETAILS
                </label>
                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  placeholder="Tell me about your product requirements, stack, and timeline..."
                  style={{
                    width: '100%',
                    padding: '13px 16px',
                    borderRadius: '8px',
                    background: 'rgba(0, 0, 0, 0.5)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    color: '#ffffff',
                    fontFamily: 'Plus Jakarta Sans, sans-serif',
                    fontSize: '0.92rem',
                    outline: 'none',
                    resize: 'vertical',
                  }}
                />
              </div>

              {/* Transmitting Progress Bar when sending */}
              {transmitting && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      fontFamily: 'JetBrains Mono, monospace',
                      fontSize: '0.66rem',
                      color: '#00f0ff',
                    }}
                  >
                    <span>SENDING_MESSAGE...</span>
                    <span>{transmittingProgress}%</span>
                  </div>
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(20, 1fr)',
                      gap: '2px',
                      height: '6px',
                    }}
                  >
                    {Array.from({ length: 20 }).map((_, i) => (
                      <div
                        key={i}
                        style={{
                          backgroundColor:
                            i < Math.round(transmittingProgress / 5)
                              ? '#00f0ff'
                              : 'rgba(255, 255, 255, 0.05)',
                          borderRadius: '1px',
                          boxShadow:
                            i < Math.round(transmittingProgress / 5)
                              ? '0 0 6px #00f0ff'
                              : 'none',
                        }}
                      />
                    ))}
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={transmitting}
                className="btn-core-primary"
                style={{
                  width: '100%',
                  justifyContent: 'center',
                  marginTop: '8px',
                  background:
                    status && status.includes('DELIVERED')
                      ? '#10b981'
                      : 'linear-gradient(135deg, #00f0ff 0%, #3b82f6 100%)',
                  color: '#040508',
                  border: 'none',
                  boxShadow: '0 8px 20px rgba(0, 240, 255, 0.35)',
                }}
              >
                {status || 'SEND MESSAGE ↗'}
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Colophon Bar */}
        {/* --- Global System Terminal Footer --- */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'flex-start',
            gap: 'clamp(16px, 3vw, 36px)',
            paddingTop: '32px',
            paddingRight: 'clamp(120px, 15vw, 220px)',
            borderTop: '1px solid var(--color-border-subtle)',
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--text-mono-micro)',
            color: 'var(--color-text-muted)',
            letterSpacing: '0.04em',
          }}
        >
          <div>
            © {new Date().getFullYear()} NASR ELSHAMEKH // ENGINEERED WITH REACT 19 &amp; .NET 10
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: 'var(--radius-full)', backgroundColor: 'var(--color-accent-emerald)', display: 'inline-block' }} />
            <span>ALEXANDRIA, EGYPT (UTC+3) // REACT 19 + .NET 10</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
