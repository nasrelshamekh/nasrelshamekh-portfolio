import React, { useState, useEffect, useRef } from 'react'

const PROJECTS_DATA = [
  {
    id: 'nexora-store',
    index: '01',
    title: 'Nexora Store',
    tag: 'E-COMMERCE & NEXT.JS',
    role: 'Lead Architect',
    desc: 'High-performance e-commerce engine featuring a modern Electric Purple design system, dynamic catalog filtering, persistent cart synchronization, instant search indexing, and resilient Next.js architecture.',
    stack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Axios'],
    metrics: { speed: '< 200ms', cart: 'Persistent Sync', ui: 'Electric Purple' },
    liveUrl: 'https://nexora-app-seven.vercel.app/',
    githubUrl: 'https://github.com/nasrelshamekh/Nexora-Store',
    accent: '#a855f7',
  },
  {
    id: 'circlehub',
    index: '02',
    title: 'CircleHub',
    tag: 'SOCIAL & .NET 10 BACKEND',
    role: 'Full-Stack Developer',
    desc: 'Full-scale community network with user profiles, post feeds, media attachments, and interest hubs. Powered by a high-throughput ASP.NET Core (.NET 10) REST API, MySQL database, and responsive React frontend.',
    stack: ['ASP.NET Core', '.NET 10', 'React 19', 'MySQL', 'JWT Auth'],
    metrics: { backend: '.NET 10', db: 'MySQL Relational', auth: 'JWT Guards' },
    liveUrl: 'https://circle-hub-nu.vercel.app',
    githubUrl: 'https://github.com/nasrelshamekh/CircleHub',
    accent: '#06b6d4',
  },
  {
    id: 'circlehub-mobile',
    index: '03',
    title: 'CircleHub Mobile',
    tag: 'MOBILE & EXPO ROUTER',
    role: 'Mobile Architect',
    desc: 'Native iOS & Android client engineered with Expo Router and NativeWind. Features smooth gestures, optimistic feed updates, and cached network queries with TanStack Query.',
    stack: ['React Native', 'Expo Router', 'NativeWind', 'TanStack Query'],
    metrics: { platform: 'iOS & Android', routing: 'File-Based', cache: 'Optimistic' },
    liveUrl: 'https://github.com/nasrelshamekh/circlehub-mobile',
    githubUrl: 'https://github.com/nasrelshamekh/circlehub-mobile',
    accent: '#38bdf8',
  },
  {
    id: 'nexify',
    index: '04',
    title: 'Nexify',
    tag: 'INTERACTIVE SOCIAL MEDIA',
    role: 'Frontend Architect',
    desc: 'Dynamic social media web application emphasizing real-time interaction, responsive layouts, content feeds, and fluid engagement mechanisms.',
    stack: ['React', 'JavaScript', 'Tailwind CSS', 'Vite'],
    metrics: { state: 'Real-Time', deploy: 'Vercel Edge', design: 'Fluid UI' },
    liveUrl: 'https://nexify-kappa.vercel.app',
    githubUrl: 'https://github.com/nasrelshamekh/Nexify',
    accent: '#f43f5e',
  },
  {
    id: 'earnings-tracker',
    index: '05',
    title: 'Earnings & Spendings Suite',
    tag: 'FINTECH UTILITIES',
    role: 'Creator & Engineer',
    desc: 'Pair of dedicated financial tools calculating billable hours, owed remuneration, and categorized spending history with real-time analytical breakdowns.',
    stack: ['JavaScript', 'React', 'Financial Logic', 'Persistent Storage'],
    metrics: { precision: 'Penny-Exact', storage: 'Persistent', analytics: 'Real-Time' },
    liveUrl: 'https://earningscalculator-app.vercel.app',
    githubUrl: 'https://github.com/nasrelshamekh/Earnings-Tracker',
    accent: '#f59e0b',
  },
  {
    id: 'weather-app',
    index: '06',
    title: 'Global Weather Intelligence',
    tag: 'METEOROLOGICAL API',
    role: 'Creator',
    desc: 'Worldwide meteorological application delivering instant weather updates, atmospheric pressure, dynamic condition visuals, and multi-city lookup with sub-second response times.',
    stack: ['JavaScript', 'REST APIs', 'Async/Await', 'Glassmorphism'],
    metrics: { lookup: 'Worldwide', latency: '< 50ms', theme: 'Dynamic Weather' },
    liveUrl: 'https://weather-app-ten-tau-49.vercel.app',
    githubUrl: 'https://github.com/nasrelshamekh/Weather-App',
    accent: '#10b981',
  },
]

export function Projects() {
  const [activeProject, setActiveProject] = useState(null)
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 })
  const containerRef = useRef()

  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPos({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <section
      ref={containerRef}
      id="works"
      style={{
        position: 'relative',
        padding: '160px clamp(24px, 4vw, 64px)',
        maxWidth: '1520px',
        margin: '0 auto',
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
        <span>CHAPTER 02 // SELECTED CASE STUDIES</span>
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'baseline',
          justifyContent: 'space-between',
          marginBottom: '64px',
          flexWrap: 'wrap',
          gap: '16px',
        }}
      >
        <h2
          style={{
            fontFamily: 'Syne, sans-serif',
            fontSize: 'clamp(2.4rem, 5.2vw, 4.6rem)',
            fontWeight: 800,
            lineHeight: 1.05,
            color: '#ffffff',
            letterSpacing: '-0.02em',
            textTransform: 'uppercase',
          }}
        >
          FEATURED PRODUCTION <br />
          <span
            style={{
              background: 'linear-gradient(135deg, #a855f7 0%, #38bdf8 50%, #06b6d4 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              display: 'inline-block',
            }}
          >
            SOFTWARE SYSTEMS.
          </span>
        </h2>

        <span
          style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '0.82rem',
            color: '#64748b',
            letterSpacing: '0.1em',
          }}
        >
          06 PRODUCTION RELEASES
        </span>
      </div>

      {/* Project Rows */}
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {PROJECTS_DATA.map((proj) => (
          <div
            key={proj.id}
            className="work-row"
            onMouseEnter={() => setActiveProject(proj)}
            onMouseLeave={() => setActiveProject(null)}
            style={{
              padding: '36px 16px',
              display: 'grid',
              gridTemplateColumns: '70px 1.4fr 1.6fr auto',
              alignItems: 'center',
              gap: '24px',
              borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
              transition: 'background-color 0.2s ease, border-color 0.2s ease',
              cursor: 'pointer',
            }}
          >
            {/* Index */}
            <span
              style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '1rem',
                color: proj.accent,
                fontWeight: 700,
              }}
            >
              /{proj.index}
            </span>

            {/* Title & Tag */}
            <div>
              <h3
                style={{
                  fontFamily: 'Syne, sans-serif',
                  fontSize: 'clamp(1.4rem, 2.2vw, 2.2rem)',
                  fontWeight: 800,
                  color: '#ffffff',
                  marginBottom: '6px',
                  letterSpacing: '-0.01em',
                }}
              >
                {proj.title}
              </h3>
              <div
                style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '0.72rem',
                  color: proj.accent,
                  letterSpacing: '0.08em',
                }}
              >
                {proj.tag}
              </div>
            </div>

            {/* Description & Stack */}
            <div>
              <p
                style={{
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontSize: '0.94rem',
                  color: '#94a3b8',
                  lineHeight: 1.5,
                  marginBottom: '10px',
                  maxWidth: '560px',
                }}
              >
                {proj.desc}
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {proj.stack.map((s) => (
                  <span
                    key={s}
                    style={{
                      fontFamily: 'JetBrains Mono, monospace',
                      fontSize: '0.68rem',
                      color: '#cbd5e1',
                      background: 'rgba(255, 255, 255, 0.05)',
                      padding: '3px 9px',
                      borderRadius: '6px',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                    }}
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              {proj.liveUrl && (
                <a
                  href={proj.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="btn-action-secondary"
                  style={{
                    padding: '8px 16px',
                    fontSize: '0.78rem',
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  LIVE ↗
                </a>
              )}
              {proj.githubUrl && (
                <a
                  href={proj.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  style={{
                    background: 'rgba(255, 255, 255, 0.04)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '9999px',
                    padding: '8px 14px',
                    fontFamily: 'JetBrains Mono, monospace',
                    fontSize: '0.78rem',
                    color: '#94a3b8',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.color = '#ffffff'
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)'
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.color = '#94a3b8'
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)'
                  }}
                >
                  CODE
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Floating Preview Card (Desktop) */}
      {activeProject && (
        <div
          style={{
            position: 'fixed',
            left: `${cursorPos.x + 24}px`,
            top: `${cursorPos.y - 120}px`,
            width: '280px',
            padding: '20px',
            borderRadius: '20px',
            background: 'rgba(15, 17, 24, 0.94)',
            border: `1px solid ${activeProject.accent}55`,
            backdropFilter: 'blur(20px)',
            boxShadow: `0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 0 30px ${activeProject.accent}33`,
            pointerEvents: 'none',
            zIndex: 90,
            transition: 'opacity 0.2s ease, transform 0.1s ease-out',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '12px',
            }}
          >
            <span
              style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '0.7rem',
                color: activeProject.accent,
                fontWeight: 700,
              }}
            >
              PREVIEW // {activeProject.index}
            </span>
            <span
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                backgroundColor: activeProject.accent,
              }}
            />
          </div>

          <div
            style={{
              fontFamily: 'Syne, sans-serif',
              fontSize: '1.25rem',
              fontWeight: 800,
              color: '#ffffff',
              marginBottom: '8px',
            }}
          >
            {activeProject.title}
          </div>

          <div
            style={{
              padding: '10px',
              borderRadius: '12px',
              background: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid rgba(255, 255, 255, 0.06)',
              marginBottom: '10px',
            }}
          >
            {Object.entries(activeProject.metrics).map(([k, v]) => (
              <div
                key={k}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '0.68rem',
                  lineHeight: 1.6,
                }}
              >
                <span style={{ color: '#64748b', textTransform: 'uppercase' }}>{k}:</span>
                <span style={{ color: '#ffffff', fontWeight: 600 }}>{v}</span>
              </div>
            ))}
          </div>

          <div
            style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '0.66rem',
              color: '#94a3b8',
              textAlign: 'center',
            }}
          >
            CLICK ROW TO VISIT LIVE APPLICATION ↗
          </div>
        </div>
      )}
    </section>
  )
}
