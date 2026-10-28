import React, { useState, useEffect } from 'react'
import {
  toggleAudio,
  subscribeAudioState,
  playHoverTick,
  playMagneticSnap,
} from '../../core/audio'
import { lenis } from '../../core/clock'

export function Header() {
  const [audioState, setAudioState] = useState({ isMuted: true, isReady: false })
  const [activeTab, setActiveTab] = useState('home')

  useEffect(() => {
    return subscribeAudioState((state) => setAudioState(state))
  }, [])

  const handleNavClick = (id) => {
    playMagneticSnap()
    setActiveTab(id)
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
      style={{
        position: 'fixed',
        top: '24px',
        left: 0,
        right: 0,
        display: 'flex',
        justifyContent: 'center',
        zIndex: 100,
        padding: '0 24px',
        pointerEvents: 'none',
      }}
    >
      <div
        className="glass-dock"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '20px',
          padding: '8px 18px',
          borderRadius: '9999px',
          background: 'rgba(10, 15, 30, 0.65)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          boxShadow: '0 20px 40px -15px rgba(0, 0, 0, 0.7), inset 0 1px 1px rgba(255, 255, 255, 0.1)',
          pointerEvents: 'all',
          transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {/* Brand Identity */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            paddingRight: '12px',
            borderRight: '1px solid rgba(255, 255, 255, 0.1)',
            cursor: 'pointer',
          }}
          onClick={() => lenis.scrollTo(0, { duration: 1.2 })}
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
            style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '0.8rem',
              fontWeight: 600,
              letterSpacing: '0.08em',
              color: '#ffffff',
            }}
          >
            NASR ELSHAMEKH
          </span>
        </div>

        {/* Dynamic Navigation Links */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          {[
            { id: 'work', label: 'Projects' },
            { id: 'about', label: 'About' },
            { id: 'matrix', label: 'Stack' },
            { id: 'playground', label: 'Lab' },
            { id: 'terminal', label: 'Terminal' },
            { id: 'contact', label: 'Contact' },
          ].map((item) => (
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
              }}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Right Actions: GitHub & Audio Toggle */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            paddingLeft: '12px',
            borderLeft: '1px solid rgba(255, 255, 255, 0.1)',
          }}
        >
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
      </div>
    </header>
  )
}
