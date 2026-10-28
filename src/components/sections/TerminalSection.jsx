import React, { useState, useRef, useEffect } from 'react'
import { playHoverTick, playMagneticSnap, playQuantumChime, playReverseSweep } from '../../core/audio'
import { lenis } from '../../core/clock'

export function TerminalSection() {
  const [inputVal, setInputVal] = useState('')
  const [history, setHistory] = useState([
    {
      type: 'system',
      text: 'NASR ELSHAMEKH CLI v2.4 (React 19 + .NET 10). Type /help to inspect commands or /projects to view active deployments.',
    },
  ])
  const scrollEndRef = useRef()

  useEffect(() => {
    scrollEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [history])

  const handleSubmit = (e) => {
    e.preventDefault()
    const cmd = inputVal.trim()
    if (!cmd) return

    playMagneticSnap()
    const newHistory = [...history, { type: 'user', text: cmd }]

    const lower = cmd.toLowerCase()

    if (lower === '/help') {
      newHistory.push({
        type: 'response',
        text: 'AVAILABLE COMMANDS:\n • /about    - Nasr Elshamekh bio & background\n • /projects - List production web & mobile deployments\n • /skills   - Full-stack technical capabilities breakdown\n • /github   - Open GitHub repository profile\n • /synth    - Trigger quantum audio harmonics\n • /rewind   - Smooth 3.5s Lenis rewind to top\n • /clear    - Clear terminal screen',
      })
    } else if (lower === '/about') {
      newHistory.push({
        type: 'response',
        text: 'NASR ELSHAMEKH:\nFull-stack developer building high-performance web applications with React, Next.js, and TypeScript, backed by robust REST APIs and distributed microservices with ASP.NET Core (.NET 10) & Node.js with PostgreSQL & MySQL.',
      })
    } else if (lower === '/projects') {
      newHistory.push({
        type: 'response',
        text: 'PRODUCTION DEPLOYMENTS:\n [01] CircleHub (React + ASP.NET Core .NET 10 + MySQL) -> https://circle-hub-nu.vercel.app\n [02] Nexora Store (TypeScript + React E-Commerce) -> https://nexora-app-seven.vercel.app\n [03] CircleHub Mobile (Expo Router + NativeWind) -> github.com/nasrelshamekh/circlehub-mobile\n [04] Nexify (Interactive Social Media Platform) -> https://nexify-kappa.vercel.app\n [05] Earnings & Spendings Suite -> https://earningscalculator-app.vercel.app\n [06] Global Weather Intelligence -> https://weather-app-ten-tau-49.vercel.app',
      })
    } else if (lower === '/skills') {
      newHistory.push({
        type: 'response',
        text: 'TECHNICAL CAPABILITIES:\n • Frontend: React, Next.js, Vite, TypeScript, JavaScript, Tailwind CSS, Bootstrap\n • Backend: ASP.NET Core (.NET 10), C#, Node.js, Express, REST APIs, JWT Auth\n • Databases: MySQL, PostgreSQL, Entity Framework Core, Prisma ORM\n • Mobile & DevOps: React Native, Expo Router, NativeWind, Git, Vercel CI/CD',
      })
    } else if (lower === '/github') {
      window.open('https://github.com/nasrelshamekh', '_blank')
      newHistory.push({
        type: 'response',
        text: 'REDIRECTING: Opened https://github.com/nasrelshamekh in new tab.',
      })
    } else if (lower === '/synth') {
      playQuantumChime()
      newHistory.push({
        type: 'response',
        text: 'RESONATING: 4-Voice Micro-Tonal Chime generated via Web Audio API.',
      })
    } else if (lower === '/rewind') {
      playReverseSweep()
      newHistory.push({
        type: 'response',
        text: 'REWINDING: Executing Lenis reverse scrub to root origin...',
      })
      lenis.scrollTo(0, { duration: 3.5 })
    } else if (lower === '/clear') {
      setHistory([])
      setInputVal('')
      return
    } else {
      newHistory.push({
        type: 'error',
        text: `Command not recognized: "${cmd}". Type /help for available commands.`,
      })
    }

    setHistory(newHistory)
    setInputVal('')
  }

  return (
    <section
      id="terminal"
      style={{
        position: 'relative',
        padding: '120px 24px',
        maxWidth: '1000px',
        margin: '0 auto',
        zIndex: 2,
      }}
    >
      <div style={{ marginBottom: '40px' }}>
        <div
          style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '0.8rem',
            letterSpacing: '0.2em',
            color: '#00f5d4',
            marginBottom: '12px',
          }}
        >
          // CHAPTER 05 — COMMAND INTERFACE
        </div>
        <h2
          style={{
            fontFamily: 'Syne, sans-serif',
            fontSize: 'clamp(2.2rem, 5vw, 3.8rem)',
            fontWeight: 800,
            letterSpacing: '-0.02em',
            color: '#ffffff',
            textTransform: 'uppercase',
          }}
        >
          INTERACTIVE REPL TERMINAL
        </h2>
      </div>

      {/* Terminal Shell */}
      <div
        style={{
          background: 'rgba(5, 8, 20, 0.9)',
          backdropFilter: 'blur(24px)',
          border: '1px solid rgba(0, 245, 212, 0.25)',
          borderRadius: '20px',
          overflow: 'hidden',
          boxShadow: '0 30px 70px -20px rgba(0, 0, 0, 0.9), 0 0 40px -15px rgba(0, 245, 212, 0.15)',
        }}
      >
        {/* Terminal Header Bar */}
        <div
          style={{
            padding: '12px 20px',
            background: 'rgba(255, 255, 255, 0.04)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '0.75rem',
            color: '#64748b',
          }}
        >
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#ff5f56' }} />
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#ffbd2e' }} />
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#27c93f' }} />
            <span style={{ marginLeft: '12px', color: '#94a3b8' }}>nasr@fullstack-core: ~</span>
          </div>
          <div>BASH // .NET 10 + REACT 19</div>
        </div>

        {/* Console Log Buffer */}
        <div
          style={{
            padding: '24px',
            minHeight: '260px',
            maxHeight: '400px',
            overflowY: 'auto',
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '0.85rem',
            lineHeight: 1.6,
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
          }}
        >
          {history.map((h, i) => (
            <div key={i}>
              {h.type === 'user' && (
                <div style={{ color: '#ffffff' }}>
                  <span style={{ color: '#00f5d4', marginRight: '8px' }}>&gt;</span>
                  {h.text}
                </div>
              )}
              {h.type === 'system' && (
                <div style={{ color: '#00f5d4' }}>{h.text}</div>
              )}
              {h.type === 'response' && (
                <pre
                  style={{
                    color: '#cbd5e1',
                    margin: 0,
                    whiteSpace: 'pre-wrap',
                    fontFamily: 'inherit',
                  }}
                >
                  {h.text}
                </pre>
              )}
              {h.type === 'error' && (
                <div style={{ color: '#f72585' }}>{h.text}</div>
              )}
            </div>
          ))}
          <div ref={scrollEndRef} />
        </div>

        {/* Input Form */}
        <form
          onSubmit={handleSubmit}
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: '16px 20px',
            background: 'rgba(0, 0, 0, 0.4)',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          }}
        >
          <span
            style={{
              fontFamily: 'JetBrains Mono, monospace',
              color: '#00f5d4',
              marginRight: '12px',
              fontSize: '1rem',
              fontWeight: 700,
            }}
          >
            &gt;
          </span>
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onFocus={playHoverTick}
            placeholder="Type /projects, /about, /skills, or /rewind..."
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: '#ffffff',
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '0.9rem',
            }}
          />
          <button
            type="submit"
            style={{
              background: 'rgba(0, 245, 212, 0.15)',
              border: '1px solid rgba(0, 245, 212, 0.4)',
              color: '#00f5d4',
              borderRadius: '8px',
              padding: '6px 14px',
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '0.75rem',
              cursor: 'pointer',
            }}
          >
            EXECUTE
          </button>
        </form>
      </div>
    </section>
  )
}
