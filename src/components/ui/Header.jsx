import React, { useState, useEffect, useRef } from 'react'
import {
  toggleAudio,
  subscribeAudioState,
  playHoverTick,
  playMagneticSnap,
} from '../../core/audio'
import { lenis } from '../../core/clock'

const NAV_ITEMS = [
  { id: 'work', label: 'Projects', index: '01' },
  { id: 'about', label: 'About', index: '02' },
  { id: 'matrix', label: 'Stack', index: '03' },
  { id: 'playground', label: 'Lab', index: '04' },
  { id: 'terminal', label: 'Terminal', index: '05' },
  { id: 'contact', label: 'Contact', index: '06' },
]

export function Header() {
  const [audioState, setAudioState] = useState({ isMuted: true, isReady: false })
  const [activeTab, setActiveTab] = useState('home')
  const [mobileOpen, setMobileOpen] = useState(false)
  const headerRef = useRef()

  useEffect(() => {
    return subscribeAudioState((state) => setAudioState(state))
  }, [])

  // Close mobile menu on outside click or escape key
  useEffect(() => {
    if (!mobileOpen) return

    const handleOutsideClick = (e) => {
      if (headerRef.current && !headerRef.current.contains(e.target)) {
        setMobileOpen(false)
      }
    }

    const handleKeydown = (e) => {
      if (e.key === 'Escape') setMobileOpen(false)
    }

    document.addEventListener('mousedown', handleOutsideClick)
    document.addEventListener('touchstart', handleOutsideClick)
    window.addEventListener('keydown', handleKeydown)

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
      document.removeEventListener('touchstart', handleOutsideClick)
      window.removeEventListener('keydown', handleKeydown)
    }
  }, [mobileOpen])

  const handleNavClick = (id) => {
    playMagneticSnap()
    setActiveTab(id)
    setMobileOpen(false)
    const el = document.getElementById(id)
    if (el) {
      lenis.scrollTo(el, { offset: -80, duration: 1.4 })
    }
  }

  const handleAudioClick = () => {
    toggleAudio()
  }

  return (
    <header
      ref={headerRef}
      style={{
        position: 'fixed',
        top: '16px',
        left: 0,
        right: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        zIndex: 100,
        padding: '0 16px',
        pointerEvents: 'none',
      }}
    >
      {/* Main Glass Dock */}
      <div
        className="glass-dock"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '18px',
          padding: '8px 18px',
          borderRadius: '9999px',
          background: 'rgba(10, 15, 30, 0.75)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 20px 40px -15px rgba(0, 0, 0, 0.75), inset 0 1px 1px rgba(255, 255, 255, 0.12)',
          pointerEvents: 'all',
          transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {/* Brand Identity */}
        <div
          className="brand-container"
          onClick={() => {
            setMobileOpen(false)
            lenis.scrollTo(0, { duration: 1.2 })
          }}
          onMouseEnter={playHoverTick}
        >
          <div
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: '#00f5d4',
              boxShadow: '0 0 10px #00f5d4',
              animation: 'pulseGlow 2s infinite ease-in-out',
            }}
          />
          <span
            className="brand-text"
            style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '0.8rem',
              fontWeight: 600,
              letterSpacing: '0.08em',
              color: '#ffffff',
              whiteSpace: 'nowrap',
            }}
          >
            NASR ELSHAMEKH
          </span>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="header-desktop-nav">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              onMouseEnter={playHoverTick}
              style={{
                background: activeTab === item.id ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
                border: 'none',
                color: activeTab === item.id ? '#ffffff' : '#94a3b8',
                padding: '6px 12px',
                borderRadius: '9999px',
                fontSize: '0.82rem',
                fontFamily: 'Space Grotesk, sans-serif',
                fontWeight: 500,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                whiteSpace: 'nowrap',
              }}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Desktop Right Actions: GitHub & Audio Toggle */}
        <div className="header-desktop-actions">
          <a
            href="https://github.com/nasrelshamekh"
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={playHoverTick}
            style={{
              color: '#94a3b8',
              textDecoration: 'none',
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '0.75rem',
              padding: '6px 10px',
              borderRadius: '9999px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              background: 'rgba(255, 255, 255, 0.04)',
              transition: 'all 0.2s ease',
              whiteSpace: 'nowrap',
            }}
          >
            GITHUB ↗
          </a>

          <button
            onClick={handleAudioClick}
            onMouseEnter={playHoverTick}
            title={audioState.isMuted ? 'Activate Soundscape' : 'Mute Soundscape'}
            style={{
              background: audioState.isMuted ? 'rgba(255, 255, 255, 0.04)' : 'rgba(0, 245, 212, 0.15)',
              border: audioState.isMuted ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 245, 212, 0.4)',
              borderRadius: '9999px',
              padding: '6px 12px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              cursor: 'pointer',
              color: audioState.isMuted ? '#94a3b8' : '#00f5d4',
              fontSize: '0.75rem',
              fontFamily: 'JetBrains Mono, monospace',
              transition: 'all 0.25s ease',
              whiteSpace: 'nowrap',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '2px', height: '12px' }}>
              {[1, 2, 3].map((bar) => (
                <span
                  key={bar}
                  style={{
                    width: '2px',
                    height: audioState.isMuted ? '4px' : `${4 + bar * 3}px`,
                    backgroundColor: audioState.isMuted ? '#64748b' : '#00f5d4',
                    borderRadius: '1px',
                    animation: !audioState.isMuted ? `audioBounce 0.8s infinite alternate ${bar * 0.2}s` : 'none',
                  }}
                />
              ))}
            </div>
            <span>{audioState.isMuted ? 'AUDIO: OFF' : 'AUDIO: ON'}</span>
          </button>
        </div>

        {/* Mobile Right Controls: Compact Audio & Hamburger */}
        <div className="header-mobile-right">
          {/* Audio Icon-Only Button for Mobile */}
          <button
            onClick={handleAudioClick}
            onMouseEnter={playHoverTick}
            title={audioState.isMuted ? 'Activate Soundscape' : 'Mute Soundscape'}
            style={{
              background: audioState.isMuted ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 245, 212, 0.15)',
              border: audioState.isMuted ? '1px solid rgba(255, 255, 255, 0.15)' : '1px solid rgba(0, 245, 212, 0.4)',
              borderRadius: '9999px',
              padding: '6px 10px',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              cursor: 'pointer',
              color: audioState.isMuted ? '#94a3b8' : '#00f5d4',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '2px', height: '12px' }}>
              {[1, 2, 3].map((bar) => (
                <span
                  key={bar}
                  style={{
                    width: '2px',
                    height: audioState.isMuted ? '4px' : `${4 + bar * 3}px`,
                    backgroundColor: audioState.isMuted ? '#64748b' : '#00f5d4',
                    borderRadius: '1px',
                    animation: !audioState.isMuted ? `audioBounce 0.8s infinite alternate ${bar * 0.2}s` : 'none',
                  }}
                />
              ))}
            </div>
          </button>

          {/* Animated Hamburger Toggle */}
          <button
            onClick={() => {
              playMagneticSnap()
              setMobileOpen(!mobileOpen)
            }}
            onMouseEnter={playHoverTick}
            aria-label="Toggle Navigation Menu"
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              background: mobileOpen ? 'rgba(0, 245, 212, 0.2)' : 'rgba(255, 255, 255, 0.06)',
              border: mobileOpen ? '1px solid #00f5d4' : '1px solid rgba(255, 255, 255, 0.15)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '4px',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            <span
              style={{
                width: '16px',
                height: '2px',
                backgroundColor: mobileOpen ? '#00f5d4' : '#ffffff',
                borderRadius: '1px',
                transition: 'transform 0.25s ease, background-color 0.2s ease',
                transform: mobileOpen ? 'translateY(3px) rotate(45deg)' : 'none',
              }}
            />
            <span
              style={{
                width: '16px',
                height: '2px',
                backgroundColor: mobileOpen ? '#00f5d4' : '#ffffff',
                borderRadius: '1px',
                transition: 'transform 0.25s ease, background-color 0.2s ease',
                transform: mobileOpen ? 'translateY(-3px) rotate(-45deg)' : 'none',
              }}
            />
          </button>
        </div>
      </div>

      {/* Floating Mobile Navigation Drawer */}
      {mobileOpen && (
        <div
          className="mobile-menu-panel"
          style={{
            marginTop: '8px',
            width: '100%',
            maxWidth: '520px',
            background: 'rgba(8, 12, 26, 0.96)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            border: '1px solid rgba(0, 245, 212, 0.3)',
            borderRadius: '24px',
            padding: '20px',
            boxShadow: '0 30px 70px -15px rgba(0, 0, 0, 0.9), 0 0 35px rgba(0, 245, 212, 0.15)',
            pointerEvents: 'all',
          }}
        >
          <div
            style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '0.68rem',
              color: '#64748b',
              letterSpacing: '0.15em',
              marginBottom: '12px',
              paddingLeft: '6px',
            }}
          >
            // NAVIGATION DIRECTORY
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                onMouseEnter={playHoverTick}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px 14px',
                  borderRadius: '14px',
                  background: activeTab === item.id ? 'rgba(0, 245, 212, 0.12)' : 'rgba(255, 255, 255, 0.03)',
                  border: activeTab === item.id ? '1px solid rgba(0, 245, 212, 0.3)' : '1px solid transparent',
                  color: activeTab === item.id ? '#00f5d4' : '#f8fafc',
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontSize: '0.95rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.18s ease',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span
                    style={{
                      fontFamily: 'JetBrains Mono, monospace',
                      fontSize: '0.72rem',
                      color: activeTab === item.id ? '#00f5d4' : '#64748b',
                    }}
                  >
                    [{item.index}]
                  </span>
                  <span>{item.label}</span>
                </div>
                <span
                  style={{
                    fontFamily: 'JetBrains Mono, monospace',
                    fontSize: '0.75rem',
                    color: activeTab === item.id ? '#00f5d4' : '#64748b',
                  }}
                >
                  →
                </span>
              </button>
            ))}
          </div>

          {/* Quick Actions Footer inside Drawer */}
          <div
            style={{
              marginTop: '16px',
              paddingTop: '14px',
              borderTop: '1px solid rgba(255, 255, 255, 0.08)',
              display: 'flex',
              gap: '10px',
            }}
          >
            <a
              href="https://github.com/nasrelshamekh"
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={playHoverTick}
              style={{
                flex: 1,
                textAlign: 'center',
                padding: '10px 14px',
                borderRadius: '12px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                color: '#cbd5e1',
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '0.75rem',
                textDecoration: 'none',
              }}
            >
              GITHUB REPO ↗
            </a>
            <button
              onClick={handleAudioClick}
              onMouseEnter={playHoverTick}
              style={{
                flex: 1,
                padding: '10px 14px',
                borderRadius: '12px',
                background: audioState.isMuted ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 245, 212, 0.15)',
                border: audioState.isMuted ? '1px solid rgba(255, 255, 255, 0.12)' : '1px solid rgba(0, 245, 212, 0.35)',
                color: audioState.isMuted ? '#94a3b8' : '#00f5d4',
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '0.75rem',
                cursor: 'pointer',
              }}
            >
              {audioState.isMuted ? 'SOUND: OFF' : 'SOUND: ACTIVE'}
            </button>
          </div>
        </div>
      )}
    </header>
  )
}
