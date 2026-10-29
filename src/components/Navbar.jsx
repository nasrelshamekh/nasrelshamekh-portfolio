import React, { useState, useEffect, useRef } from 'react'
import { Volume2, VolumeX, Menu, X } from 'lucide-react'
import { sound } from '../utils/soundEngine'

export function Navbar({ onNavigate }) {
  const [alexandriaTime, setAlexandriaTime] = useState('')
  const [activeTab, setActiveTab] = useState('hero')
  const [audioEnabled, setAudioEnabled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const navRef = useRef(null)

  useEffect(() => {
    const update = () => {
      const now = new Date()
      const t = now.toLocaleTimeString('en-US', {
        timeZone: 'Africa/Cairo',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      })
      setAlexandriaTime(`${t} ALX`)
    }
    update()
    const int = setInterval(update, 1000)
    return () => clearInterval(int)
  }, [])

  // Close mobile navigation drawer when clicking outside or pressing Escape
  useEffect(() => {
    if (!mobileMenuOpen) return

    const handleClickOutside = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setMobileMenuOpen(false)
      }
    }

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false)
      }
    }

    document.addEventListener('pointerdown', handleClickOutside)
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('pointerdown', handleClickOutside)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [mobileMenuOpen])

  const navItems = [
    { id: 'hero', num: '01', label: 'OVERVIEW', desc: 'Background & Core Discipline' },
    { id: 'system', num: '02', label: 'ARCHITECTURE', desc: 'Interactive Request Pipeline' },
    { id: 'works', num: '03', label: 'PROJECTS', desc: 'Selected Production Systems' },
    { id: 'manifesto', num: '04', label: 'PRINCIPLES', desc: 'Engineering Standards & Ethos' },
    { id: 'contact', num: '05', label: 'CONTACT', desc: 'Inquiries & Direct Communication' },
  ]

  const handleNavClick = (id) => {
    sound.play('warp')
    setActiveTab(id)
    setMobileMenuOpen(false)
    if (onNavigate) onNavigate(id)
  }

  const handleToggleAudio = () => {
    const state = sound.toggle()
    setAudioEnabled(state)
  }

  return (
    <header
      ref={navRef}
      style={{
        position: 'fixed',
        top: 'var(--frame, 8px)',
        left: 'var(--frame, 8px)',
        right: 'var(--frame, 8px)',
        height: '52px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 clamp(12px, 2.5vw, 24px)',
        zIndex: 100,
        fontFamily: 'var(--font-mono)',
        background: 'rgba(5, 7, 12, 0.88)',
        borderBottom: '1px solid var(--color-border-subtle)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        pointerEvents: 'all',
      }}
    >
      {/* Left: Identity & Live Telemetry Node */}
        <div
          onClick={() => handleNavClick('hero')}
          onMouseEnter={() => sound.play('hover')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            cursor: 'pointer',
            flexShrink: 0,
          }}
        >
          <div
            style={{
              width: '32px',
              height: '32px',
              borderRadius: 'var(--radius-md)',
              background: 'linear-gradient(135deg, var(--color-accent-cyan) 0%, #3b82f6 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: 'var(--font-display)',
              fontWeight: 800,
              fontSize: 'var(--text-body-sm)',
              color: '#040508',
              boxShadow: '0 0 14px rgba(0, 240, 255, 0.5)',
              flexShrink: 0,
            }}
          >
            NE
          </div>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 700,
                  fontSize: 'clamp(0.8rem, 1.5vw, 0.88rem)',
                  letterSpacing: '0.04em',
                  color: 'var(--color-text-high)',
                  whiteSpace: 'nowrap',
                }}
              >
                NASR ELSHAMEKH
              </span>
              <span
                className="nav-hide-phone"
                style={{
                  fontSize: 'var(--text-mono-micro)',
                  color: 'var(--color-accent-cyan)',
                  backgroundColor: 'rgba(0, 240, 255, 0.1)',
                  padding: '1px 5px',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--color-border-accent)',
                }}
              >
                v10.0
              </span>
            </div>
            <span
              style={{
                fontSize: 'var(--text-mono-micro)',
                color: 'var(--color-text-muted)',
                letterSpacing: '0.06em',
                whiteSpace: 'nowrap',
              }}
            >
              {alexandriaTime || 'ALX (UTC+3)'}
            </span>
          </div>
        </div>

        {/* Center: Desktop Hollywood Cyber Navigation Links (Mathematically Centered) */}
        <nav
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            alignItems: 'center',
            gap: '2px',
            whiteSpace: 'nowrap',
            pointerEvents: 'auto',
          }}
          className="nav-desktop-only nav-links-row"
        >
          {navItems.map((item) => {
            const isCurrent = activeTab === item.id
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                onMouseEnter={() => sound.play('hover')}
                style={{
                  background: isCurrent
                    ? 'rgba(0, 240, 255, 0.12)'
                    : 'transparent',
                  border: isCurrent
                    ? '1px solid var(--color-border-accent)'
                    : '1px solid transparent',
                  padding: '6px 12px',
                  borderRadius: 'var(--radius-full)',
                  fontSize: 'var(--text-mono-label)',
                  color: isCurrent ? 'var(--color-accent-cyan)' : 'var(--color-text-body)',
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  boxShadow: isCurrent ? '0 0 10px rgba(0, 240, 255, 0.2)' : 'none',
                }}
                onMouseOver={(e) => {
                  if (!isCurrent) {
                    e.currentTarget.style.color = '#ffffff'
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)'
                  }
                }}
                onMouseOut={(e) => {
                  if (!isCurrent) {
                    e.currentTarget.style.color = 'var(--color-text-body)'
                    e.currentTarget.style.background = 'transparent'
                  }
                }}
              >
                <span style={{ color: isCurrent ? 'var(--color-accent-cyan)' : 'var(--color-text-muted)', fontSize: 'var(--text-mono-micro)' }}>
                  [{item.num}]
                </span>
                <span>{item.label}</span>
              </button>
            )
          })}
        </nav>

        {/* Right: Actions, Audio, Dossier & Mobile Hamburger */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
          {/* Tactile Audio Toggle */}
          <button
            onClick={handleToggleAudio}
            onMouseEnter={() => sound.play('hover')}
            title={audioEnabled ? 'Disable Tactile Cyber Audio' : 'Enable Tactile Cyber Audio (Web Audio API)'}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '5px 10px',
              borderRadius: 'var(--radius-full)',
              background: audioEnabled
                ? 'rgba(0, 240, 255, 0.12)'
                : 'rgba(255, 255, 255, 0.04)',
              border: audioEnabled
                ? '1px solid var(--color-border-accent)'
                : '1px solid var(--color-border-subtle)',
              fontSize: 'var(--text-mono-micro)',
              color: audioEnabled ? 'var(--color-accent-cyan)' : 'var(--color-text-muted)',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            {audioEnabled ? (
              <Volume2 size={13} color="var(--color-accent-cyan)" />
            ) : (
              <VolumeX size={13} color="var(--color-text-muted)" />
            )}
            <span className="nav-hide-phone" style={{ fontWeight: 700 }}>
              {audioEnabled ? 'AUDIO: ON' : 'AUDIO: OFF'}
            </span>
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => {
              sound.play('click')
              setMobileMenuOpen(!mobileMenuOpen)
            }}
            onMouseEnter={() => sound.play('hover')}
            aria-label="Toggle navigation menu"
            className="nav-mobile-toggle"
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              width: '32px',
              height: '32px',
              borderRadius: 'var(--radius-md)',
              background: mobileMenuOpen ? 'rgba(0, 240, 255, 0.2)' : 'rgba(255, 255, 255, 0.06)',
              border: `1px solid ${mobileMenuOpen ? 'var(--color-accent-cyan)' : 'var(--color-border-medium)'}`,
              color: mobileMenuOpen ? 'var(--color-accent-cyan)' : 'var(--color-text-high)',
              cursor: 'pointer',
            }}
          >
            {mobileMenuOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>

      {/* --- Expandable High-Tech Mobile Cyber Navigation Drawer --- */}
      {mobileMenuOpen && (
        <div
          data-lenis-prevent
          style={{
            position: 'fixed',
            top: '58px',
            left: '12px',
            right: '12px',
            maxWidth: '480px',
            margin: '0 auto',
            borderRadius: 'var(--radius-lg)',
            background: 'rgba(5, 8, 14, 0.96)',
            backdropFilter: 'blur(30px)',
            WebkitBackdropFilter: 'blur(30px)',
            border: '1px solid var(--color-border-accent)',
            boxShadow: '0 25px 60px rgba(0, 0, 0, 0.95), 0 0 35px rgba(0, 240, 255, 0.15)',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '14px',
            pointerEvents: 'all',
            animation: 'fadeInHUD 0.2s ease-out',
            zIndex: 120,
          }}
        >
          {/* Header Title in Mobile Drawer */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderBottom: '1px solid var(--color-border-subtle)',
              paddingBottom: '10px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: 'var(--radius-full)', backgroundColor: 'var(--color-accent-cyan)' }} />
              <span style={{ fontSize: 'var(--text-mono-label)', color: 'var(--color-accent-cyan)', fontWeight: 800, letterSpacing: '0.12em' }}>
                NAVIGATION DIRECTORY // ALEXANDRIA
              </span>
            </div>
            <span style={{ fontSize: 'var(--text-mono-micro)', color: 'var(--color-text-muted)' }}>
              {alexandriaTime}
            </span>
          </div>

          {/* Chapter Links */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {navItems.map((item) => {
              const isCurrent = activeTab === item.id
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '12px 14px',
                    borderRadius: 'var(--radius-md)',
                    background: isCurrent ? 'rgba(0, 240, 255, 0.12)' : 'rgba(255, 255, 255, 0.02)',
                    border: isCurrent ? '1px solid var(--color-border-accent)' : '1px solid var(--color-border-subtle)',
                    color: isCurrent ? 'var(--color-accent-cyan)' : 'var(--color-text-body)',
                    textAlign: 'left',
                    cursor: 'pointer',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontSize: 'var(--text-mono-micro)', color: isCurrent ? 'var(--color-accent-cyan)' : 'var(--color-text-muted)', fontWeight: 800 }}>
                      [{item.num}]
                    </span>
                    <div>
                      <div style={{ fontSize: 'var(--text-body-sm)', fontWeight: 700, color: 'var(--color-text-high)' }}>
                        {item.label}
                      </div>
                      <div style={{ fontSize: 'var(--text-mono-micro)', color: 'var(--color-text-muted)' }}>
                        {item.desc}
                      </div>
                    </div>
                  </div>
                  {isCurrent && (
                    <span
                      style={{
                        width: '6px',
                        height: '6px',
                        borderRadius: 'var(--radius-full)',
                        backgroundColor: 'var(--color-accent-cyan)',
                        boxShadow: '0 0 8px var(--color-accent-cyan)',
                      }}
                    />
                  )}
                </button>
              )
            })}
          </div>

          {/* Mobile Direct Action Button */}
          <div style={{ borderTop: '1px solid var(--color-border-subtle)', paddingTop: '12px' }}>
            <button
              onClick={() => handleNavClick('contact')}
              className="btn-core-primary"
              style={{
                width: '100%',
                justifyContent: 'center',
                fontSize: 'var(--text-mono-label)',
                padding: '12px',
              }}
            >
              <span>START A CONVERSATION ↗</span>
            </button>
          </div>
        </div>
      )}
    </header>
  )
}
