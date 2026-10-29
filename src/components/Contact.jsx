import React, { useState } from 'react'

export function Contact({ onScrollTop }) {
  const [copied, setCopied] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState(null)

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('nasrelshamekh@gmail.com')
    setCopied(true)
    setTimeout(() => setCopied(false), 3000)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.name || !formData.email || !formData.message) return

    setStatus('TRANSMITTING...')
    setTimeout(() => {
      setStatus('MESSAGE TRANSMITTED! THANK YOU.')
      setFormData({ name: '', email: '', message: '' })
      setTimeout(() => setStatus(null), 5000)
    }, 600)
  }

  return (
    <footer
      id="contact"
      style={{
        position: 'relative',
        padding: '160px clamp(24px, 4vw, 64px) 60px',
        maxWidth: '1520px',
        margin: '0 auto',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
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
        <span>EPILOGUE // COLLABORATION</span>
      </div>

      <div className="contact-grid-wrapper" style={{ marginBottom: '96px' }}>
        {/* Left Column: Headline & Direct Contact */}
        <div style={{ minWidth: 0, width: '100%' }}>
          <h2
            style={{
              fontFamily: 'Syne, sans-serif',
              fontSize: 'clamp(2.4rem, 5vw, 4.4rem)',
              fontWeight: 800,
              lineHeight: 1.05,
              color: '#ffffff',
              letterSpacing: '-0.02em',
              textTransform: 'uppercase',
              marginBottom: '28px',
            }}
          >
            LET'S BUILD <br />
            <span
              style={{
                background: 'linear-gradient(135deg, #a855f7 0%, #38bdf8 50%, #06b6d4 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                display: 'inline-block',
              }}
            >
              SOMETHING EXCEPTIONAL.
            </span>
          </h2>

          <p
            style={{
              fontFamily: 'Space Grotesk, sans-serif',
              fontSize: '1.1rem',
              color: '#94a3b8',
              lineHeight: 1.6,
              maxWidth: '560px',
              marginBottom: '40px',
            }}
          >
            I am currently open for full-time engineering roles, senior contracts, and high-impact software builds. Have a visionary product or scalable architecture to build? Let's connect.
          </p>

          {/* One-Click Copy Email Pill */}
          <div style={{ marginBottom: '36px' }}>
            <div
              style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '0.72rem',
                color: '#64748b',
                letterSpacing: '0.1em',
                marginBottom: '10px',
              }}
            >
              DIRECT EMAIL // CLICK TO COPY
            </div>

            <button
              onClick={handleCopyEmail}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '14px',
                padding: '14px 24px',
                borderRadius: '9999px',
                background: copied ? 'rgba(16, 185, 129, 0.15)' : 'rgba(255, 255, 255, 0.05)',
                border: copied ? '1px solid #10b981' : '1px solid rgba(255, 255, 255, 0.14)',
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '0.92rem',
                fontWeight: 600,
                color: copied ? '#10b981' : '#ffffff',
                transition: 'all 0.25s ease',
              }}
            >
              <span>nasrelshamekh@gmail.com</span>
              <span
                style={{
                  fontSize: '0.75rem',
                  padding: '3px 8px',
                  borderRadius: '6px',
                  background: copied ? '#10b981' : 'rgba(255, 255, 255, 0.1)',
                  color: copied ? '#0a0b0e' : '#cbd5e1',
                }}
              >
                {copied ? '✓ COPIED' : 'COPY'}
              </span>
            </button>
          </div>

          {/* Social Links */}
          <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
            <a
              href="https://github.com/nasrelshamekh"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 20px',
                borderRadius: '9999px',
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '0.8rem',
                color: '#ffffff',
                transition: 'all 0.2s ease',
              }}
              onMouseOver={(e) => (e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.35)')}
              onMouseOut={(e) => (e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)')}
            >
              GITHUB ↗
            </a>

            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 20px',
                borderRadius: '9999px',
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '0.8rem',
                color: '#ffffff',
                transition: 'all 0.2s ease',
              }}
              onMouseOver={(e) => (e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.35)')}
              onMouseOut={(e) => (e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)')}
            >
              LINKEDIN ↗
            </a>
          </div>
        </div>

        {/* Right Column: Functional Message Form */}
        <div
          className="glass-panel"
          style={{
            padding: '36px',
            minWidth: 0,
            width: '100%',
          }}
        >
          <div
            style={{
              fontFamily: 'Syne, sans-serif',
              fontSize: '1.25rem',
              fontWeight: 700,
              color: '#ffffff',
              marginBottom: '6px',
            }}
          >
            Transmit a Message
          </div>
          <div
            style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '0.74rem',
              color: '#64748b',
              marginBottom: '24px',
            }}
          >
            Direct inquiry to Nasr Elshamekh
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label
                style={{
                  display: 'block',
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '0.7rem',
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
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Sarah Connor"
                style={{
                  width: '100%',
                  padding: '14px 18px',
                  borderRadius: '12px',
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  color: '#ffffff',
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontSize: '0.94rem',
                  outline: 'none',
                }}
              />
            </div>

            <div>
              <label
                style={{
                  display: 'block',
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '0.7rem',
                  color: '#94a3b8',
                  marginBottom: '8px',
                }}
              >
                YOUR EMAIL
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="sarah@example.com"
                style={{
                  width: '100%',
                  padding: '14px 18px',
                  borderRadius: '12px',
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  color: '#ffffff',
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontSize: '0.94rem',
                  outline: 'none',
                }}
              />
            </div>

            <div>
              <label
                style={{
                  display: 'block',
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '0.7rem',
                  color: '#94a3b8',
                  marginBottom: '8px',
                }}
              >
                PROJECT DETAILS
              </label>
              <textarea
                rows={4}
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Tell me about your product, timeline, and stack requirements..."
                style={{
                  width: '100%',
                  padding: '14px 18px',
                  borderRadius: '12px',
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  color: '#ffffff',
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontSize: '0.94rem',
                  outline: 'none',
                  resize: 'vertical',
                }}
              />
            </div>

            <button
              type="submit"
              className="btn-action-primary"
              style={{
                width: '100%',
                justifyContent: 'center',
                marginTop: '8px',
              }}
            >
              {status || 'DISPATCH INQUIRY ↗'}
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Bar: Copyright, Stack, Rewind */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '20px',
          paddingTop: '32px',
          borderTop: '1px solid rgba(255, 255, 255, 0.06)',
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: '0.74rem',
          color: '#64748b',
        }}
      >
        <div>
          © {new Date().getFullYear()} NASR ELSHAMEKH. ALL RIGHTS RESERVED.
        </div>

        <div>
          ENGINEERED WITH REACT 19 + .NET 10
        </div>

        <button
          onClick={onScrollTop}
          style={{
            background: 'transparent',
            border: 'none',
            color: '#a855f7',
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '0.74rem',
            cursor: 'pointer',
          }}
        >
          BACK TO TOP ↑
        </button>
      </div>
    </footer>
  )
}
