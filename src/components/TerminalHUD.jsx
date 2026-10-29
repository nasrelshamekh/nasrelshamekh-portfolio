import React, { useState } from 'react'
import { sound } from '../utils/soundEngine'

const INITIAL_LOGS = [
  { type: 'sys', text: 'NASR ELSHAMEKH // DEVELOPER TERMINAL [v10.0]' },
  { type: 'sys', text: 'LOCATION: ALEXANDRIA, EGYPT // STATUS: READY' },
  { type: 'sys', text: 'Type "/help" or select a command chip below to query the system.' },
]

export function TerminalHUD() {
  const [logs, setLogs] = useState(INITIAL_LOGS)
  const [inputVal, setInputVal] = useState('')

  const handleCommand = (rawCmd) => {
    let cmd = rawCmd.trim()
    if (!cmd) return
    sound.play('click')

    // Ensure forward slash prefix representation
    const formattedCmd = cmd.startsWith('/') ? cmd : `/${cmd}`
    const normalizedKey = cmd.startsWith('/')
      ? cmd.slice(1).toLowerCase()
      : cmd.toLowerCase()

    const newLogs = [...logs, { type: 'user', text: `> ${formattedCmd}` }]

    switch (normalizedKey) {
      case 'help':
        newLogs.push({
          type: 'out',
          text: 'AVAILABLE COMMANDS:\n • /whoami    - Identity & engineering profile\n • /stack     - Core technical architecture\n • /projects  - Production software releases\n • /contact   - Direct channels & verified email\n • /clear     - Flush terminal buffer',
        })
        break
      case 'cv':
      case 'resume':
      case 'dossier':
        newLogs.push({
          type: 'out',
          text: 'ENGINEERING PROFILE:\nNasr Elshamekh — Full-Stack Software Engineer\nFocus: ASP.NET Core (.NET 10) Backend Architecture + Responsive React 19 Client Surfaces.\nDirect inquiries & contracts welcome via /contact.',
        })
        break
      case 'whoami':
        newLogs.push({
          type: 'out',
          text: 'Nasr Elshamekh — Full-Stack Software Engineer based in Alexandria, Egypt (UTC+3). Focused on ASP.NET Core (.NET 10) backend architecture and responsive React 19 / Next.js interfaces.',
        })
        break
      case 'stack':
        newLogs.push({
          type: 'out',
          text: 'CORE ARCHITECTURE:\n • Backend:  C#, ASP.NET Core 10, Node.js, Express, REST APIs, JWT Bearer Guards\n • Frontend: React 19, Next.js App Router, TypeScript, Tailwind CSS, Vite\n • Storage:   MySQL, PostgreSQL, Entity Framework Core 10, Prisma ORM\n • Motion:    GSAP ScrollTrigger, Lenis Smooth Scroll, WebGL, Three.js',
        })
        break
      case 'projects':
        newLogs.push({
          type: 'out',
          text: 'PRODUCTION SOFTWARE:\n 1. /nexora      - Next.js E-Commerce Engine (sub-180ms)\n 2. /circlehub   - ASP.NET Core 10 + MySQL Community Platform\n 3. /mobile      - React Native + Expo Router Native Client\n 4. /nexify      - Real-Time Kinetic Social Web App\n 5. /earnings    - Sub-Penny Financial Calculation Suite\n 6. /weather     - Worldwide Meteorological API Engine',
        })
        break
      case 'contact':
        newLogs.push({
          type: 'out',
          text: 'CHANNELS:\n • Email:    nasrelshamekh@gmail.com\n • GitHub:   https://github.com/nasrelshamekh\n • Location: Alexandria, Egypt (UTC+3)\n • Status:   Available for Senior Roles & Contracts',
        })
        break
      case 'clear':
        setLogs([])
        setInputVal('')
        return
      default:
        newLogs.push({
          type: 'err',
          text: `Command not recognized: "${formattedCmd}". Type "/help" to view valid commands.`,
        })
    }

    setLogs(newLogs)
    setInputVal('')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    handleCommand(inputVal)
  }

  return (
    <section
      style={{
        position: 'relative',
        padding: '80px 0 100px',
        zIndex: 2,
      }}
    >
      <div className="grid-widescreen">
        <div
          className="hud-card"
          style={{
            padding: 'clamp(24px, 4vw, 36px)',
            background: 'var(--color-bg-surface)',
            border: '1px solid var(--color-border-subtle)',
            borderRadius: 'var(--radius-lg)',
            position: 'relative',
            boxShadow:
              '0 20px 50px rgba(0, 0, 0, 0.8), 0 0 30px rgba(0, 240, 255, 0.06)',
          }}
        >
          {/* Header */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '20px',
              borderBottom: '1px solid var(--color-border-subtle)',
              paddingBottom: '16px',
              flexWrap: 'wrap',
              gap: '12px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ display: 'flex', gap: '6px' }}>
                <span
                  style={{
                    width: '10px',
                    height: '10px',
                    borderRadius: 'var(--radius-full)',
                    backgroundColor: '#ff5f56',
                  }}
                />
                <span
                  style={{
                    width: '10px',
                    height: '10px',
                    borderRadius: 'var(--radius-full)',
                    backgroundColor: '#ffbd2e',
                  }}
                />
                <span
                  style={{
                    width: '10px',
                    height: '10px',
                    borderRadius: 'var(--radius-full)',
                    backgroundColor: '#27c93f',
                  }}
                />
              </div>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'var(--text-mono-label)',
                  color: 'var(--color-accent-cyan)',
                  fontWeight: 700,
                  letterSpacing: '0.06em',
                }}
              >
                system-terminal // cli // alexandria-node
              </span>
            </div>

            {/* Quick Action Chips starting with forward slash / */}
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              {['/whoami', '/stack', '/projects', '/contact', '/clear'].map(
                (chip) => (
                  <button
                    key={chip}
                    onClick={() => handleCommand(chip)}
                    onMouseEnter={() => sound.play('hover')}
                    style={{
                      background: 'rgba(0, 240, 255, 0.06)',
                      border: '1px solid var(--color-border-accent)',
                      borderRadius: 'var(--radius-sm)',
                      padding: '4px 10px',
                      fontFamily: 'var(--font-mono)',
                      fontSize: 'var(--text-mono-micro)',
                      color: 'var(--color-accent-cyan)',
                      transition: 'all 0.2s ease',
                      cursor: 'pointer',
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.color = '#05070c'
                      e.currentTarget.style.backgroundColor = 'var(--color-accent-cyan)'
                      e.currentTarget.style.boxShadow = '0 0 10px var(--color-accent-cyan)'
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.color = 'var(--color-accent-cyan)'
                      e.currentTarget.style.backgroundColor =
                        'rgba(0, 240, 255, 0.06)'
                      e.currentTarget.style.boxShadow = 'none'
                    }}
                  >
                    {chip}
                  </button>
                )
              )}
            </div>
          </div>

          {/* Terminal Console Output */}
          <div
            style={{
              minHeight: '180px',
              maxHeight: '320px',
              overflowY: 'auto',
              fontFamily: 'var(--font-mono)',
              fontSize: 'var(--text-mono-micro)',
              lineHeight: 1.6,
              color: 'var(--color-text-high)',
              marginBottom: '16px',
            }}
          >
            {logs.map((log, idx) => (
              <div
                key={idx}
                style={{
                  whiteSpace: 'pre-wrap',
                  marginBottom: '8px',
                  color:
                    log.type === 'sys'
                      ? 'var(--color-text-muted)'
                      : log.type === 'user'
                      ? 'var(--color-accent-cyan)'
                      : log.type === 'err'
                      ? '#ef4444'
                      : 'var(--color-text-body)',
                }}
              >
                {log.text}
              </div>
            ))}
          </div>

          {/* Command Input Field */}
          <form
            onSubmit={handleSubmit}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              padding: '8px 12px',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--color-border-subtle)',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--text-mono-label)',
                color: 'var(--color-accent-cyan)',
                fontWeight: 700,
              }}
            >
              &gt;
            </span>
            <input
              type="text"
              value={inputVal}
              onChange={(e) => {
                setInputVal(e.target.value)
                sound.play('terminalKey')
              }}
              placeholder="type /help, /whoami, /stack, /projects, /contact..."
              style={{
                flex: 1,
                background: 'transparent',
                border: 'none',
                color: 'var(--color-text-high)',
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--text-body-sm)',
                outline: 'none',
              }}
            />
            <button
              type="submit"
              className="btn-core-tab"
              style={{
                borderRadius: 'var(--radius-sm)',
                padding: '6px 14px',
                fontSize: 'var(--text-mono-micro)',
                color: 'var(--color-accent-cyan)',
                borderColor: 'var(--color-border-accent)',
              }}
            >
              RUN
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
