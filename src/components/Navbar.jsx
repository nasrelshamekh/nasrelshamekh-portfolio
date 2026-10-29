import React, { useState, useEffect } from 'react'

export function Navbar({ onNavigate }) {
  const [cairoTime, setCairoTime] = useState('')

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const timeStr = now.toLocaleTimeString('en-US', {
        timeZone: 'Africa/Cairo',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      })
      setCairoTime(`${timeStr} CAIRO`)
    }
    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <header
      style={{
        position: 'fixed',
        top: '20px',
        left: 0,
        right: 0,
        display: 'flex',
        justifyContent: 'center',
        padding: '0 clamp(16px, 4vw, 32px)',
        zIndex: 100,
        pointerEvents: 'none',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '24px',
          width: '100%',
          maxWidth: '1440px',
          padding: '10px 22px',
          borderRadius: '9999px',
          background: 'rgba(14, 16, 22, 0.8)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          boxShadow: '0 20px 40px -15px rgba(0, 0, 0, 0.7), inset 0 1px 1px rgba(255, 255, 255, 0.1)',
          pointerEvents: 'all',
        }}
      >
        {/* Brand Monogram & Cairo Clock */}
        <div
          onClick={() => onNavigate('hero')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            cursor: 'pointer',
          }}
        >
          <div
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '9px',
              background: 'linear-gradient(135deg, #a855f7 0%, #06b6d4 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: 'Syne, sans-serif',
              fontWeight: 800,
              fontSize: '0.85rem',
              color: '#0a0b0e',
              boxShadow: '0 0 16px rgba(168, 85, 247, 0.35)',
            }}
          >
            NE
          </div>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span
              style={{
                fontFamily: 'Syne, sans-serif',
                fontWeight: 700,
                fontSize: '0.86rem',
                letterSpacing: '0.04em',
                color: '#ffffff',
                lineHeight: 1.2,
              }}
            >
              NASR ELSHAMEKH
            </span>
            <span
              style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '0.66rem',
                color: '#64748b',
                letterSpacing: '0.08em',
              }}
            >
              {cairoTime || 'CAIRO (UTC+3)'}
            </span>
          </div>
        </div>

        {/* Center: Navigation Links */}
        <nav
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}
          className="nav-links-dock"
        >
          {[
            { id: 'story', label: '01. Story' },
            { id: 'works', label: '02. Works' },
            { id: 'skills', label: '03. Stack' },
            { id: 'contact', label: '04. Contact' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              style={{
                background: 'transparent',
                border: 'none',
                padding: '7px 16px',
                borderRadius: '9999px',
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '0.75rem',
                color: '#94a3b8',
                transition: 'all 0.2s ease',
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.color = '#ffffff'
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)'
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.color = '#94a3b8'
                e.currentTarget.style.background = 'transparent'
              }}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Right: Availability Badge */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 14px',
              borderRadius: '9999px',
              background: 'rgba(16, 185, 129, 0.08)',
              border: '1px solid rgba(16, 185, 129, 0.25)',
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '0.72rem',
              color: '#10b981',
            }}
          >
            <span
              className="live-beacon"
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                backgroundColor: '#10b981',
                display: 'inline-block',
              }}
            />
            <span>AVAILABLE</span>
          </div>
        </div>
      </div>
    </header>
  )
}
