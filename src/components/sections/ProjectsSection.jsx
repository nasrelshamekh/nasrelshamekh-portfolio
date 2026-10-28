import React, { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { lenis } from '../../core/clock'
import { playHoverTick, playMagneticSnap, playQuantumChime } from '../../core/audio'

gsap.registerPlugin(ScrollTrigger)

const PROJECTS = [
  {
    id: 'circlehub',
    index: '01',
    title: 'CircleHub',
    subtitle: 'Full-Stack Community Network',
    tag: 'SOCIAL & .NET BACKEND',
    desc: 'Full-stack social platform for sharing posts, following peers, and joining curated hubs. Built with React + Vite frontend and scalable ASP.NET Core (.NET 10) backend with MySQL.',
    metrics: [
      { label: 'BACKEND', val: '.NET 10' },
      { label: 'DATABASE', val: 'MYSQL' },
      { label: 'FRONTEND', val: 'REACT + VITE' },
      { label: 'STATUS', val: 'LIVE' },
    ],
    architecture: ['React', 'ASP.NET Core', '.NET 10', 'MySQL', 'JWT Auth', 'REST API'],
    liveUrl: 'https://circle-hub-nu.vercel.app',
    githubUrl: 'https://github.com/nasrelshamekh/CircleHub',
    accent: '#00f5d4',
  },
  {
    id: 'nexora-store',
    index: '02',
    title: 'Nexora Store',
    subtitle: 'High-Performance E-Commerce Engine',
    tag: 'E-COMMERCE',
    desc: 'Modern, responsive e-commerce application featuring dynamic catalog navigation, persistent cart management, state-driven search filtering, and clean component architecture.',
    metrics: [
      { label: 'LANGUAGE', val: 'TYPESCRIPT' },
      { label: 'FRAMEWORK', val: 'REACT' },
      { label: 'STYLING', val: 'TAILWIND' },
      { label: 'DEPLOY', val: 'VERCEL' },
    ],
    architecture: ['TypeScript', 'React', 'Tailwind CSS', 'Axios', 'State Management'],
    liveUrl: 'https://nexora-app-seven.vercel.app/',
    githubUrl: 'https://github.com/nasrelshamekh/Nexora-Store',
    accent: '#00bbf9',
  },
  {
    id: 'circlehub-mobile',
    index: '03',
    title: 'CircleHub Mobile',
    subtitle: 'Cross-Platform Community Client',
    tag: 'REACT NATIVE & EXPO',
    desc: 'Native mobile client for CircleHub built with Expo Router and NativeWind. Delivers smooth fluid screen transitions, optimistic UI updates, and cached API requests with React Query.',
    metrics: [
      { label: 'CORE', val: 'EXPO ROUTER' },
      { label: 'STYLING', val: 'NATIVEWIND' },
      { label: 'DATA', val: 'REACT QUERY' },
      { label: 'PLATFORM', val: 'IOS / ANDROID' },
    ],
    architecture: ['React Native', 'Expo Router', 'TypeScript', 'NativeWind', 'TanStack Query'],
    liveUrl: 'https://github.com/nasrelshamekh/circlehub-mobile',
    githubUrl: 'https://github.com/nasrelshamekh/circlehub-mobile',
    accent: '#7928ca',
  },
  {
    id: 'nexify',
    index: '04',
    title: 'Nexify',
    subtitle: 'Interactive Social Media Platform',
    tag: 'SOCIAL APP',
    desc: 'Feature-complete social media web application with real-time feeds, user engagement mechanisms, content creation flows, and responsive UI for mobile and desktop.',
    metrics: [
      { label: 'FRONTEND', val: 'REACT' },
      { label: 'ROUTING', val: 'VITE' },
      { label: 'DESIGN', val: 'RESPONSIVE' },
      { label: 'DEPLOY', val: 'VERCEL' },
    ],
    architecture: ['React', 'JavaScript', 'Tailwind CSS', 'Component Architecture'],
    liveUrl: 'https://nexify-kappa.vercel.app',
    githubUrl: 'https://github.com/nasrelshamekh/Nexify',
    accent: '#f72585',
  },
  {
    id: 'earnings-tracker',
    index: '05',
    title: 'Earnings & Spendings Suite',
    subtitle: 'Financial Calculation & Tracking Suite',
    tag: 'FINTECH UTILITIES',
    desc: 'Pair of dedicated financial utilities calculating exact hours worked, owed remuneration, and categorized spending history with real-time analytical breakdowns.',
    metrics: [
      { label: 'APP 1', val: 'EARNINGS' },
      { label: 'APP 2', val: 'SPENDINGS' },
      { label: 'EVALUATION', val: 'REAL-TIME' },
      { label: 'STORAGE', val: 'PERSISTENT' },
    ],
    architecture: ['JavaScript', 'React', 'Financial Logic', 'Stateful Storage'],
    liveUrl: 'https://earningscalculator-app.vercel.app',
    githubUrl: 'https://github.com/nasrelshamekh/Earnings-Tracker',
    accent: '#ffbe0b',
  },
  {
    id: 'weather-app',
    index: '06',
    title: 'Global Weather App',
    subtitle: 'Real-Time Meteorological Intelligence',
    tag: 'API INTEGRATION',
    desc: 'Worldwide meteorological application delivering instant weather updates, atmospheric pressure, dynamic condition visuals, and multi-city lookup with sub-second response times.',
    metrics: [
      { label: 'API', val: 'WEATHER API' },
      { label: 'LOOKUP', val: 'WORLDWIDE' },
      { label: 'LATENCY', val: '< 50MS' },
      { label: 'THEME', val: 'DYNAMIC' },
    ],
    architecture: ['JavaScript', 'REST APIs', 'Async/Await', 'Glassmorphism'],
    liveUrl: 'https://weather-app-ten-tau-49.vercel.app',
    githubUrl: 'https://github.com/nasrelshamekh/Weather-App',
    accent: '#4361ee',
  },
]

export function ProjectsSection() {
  const containerRef = useRef()
  const [activeProject, setActiveProject] = useState(null)

  useGSAP(
    () => {
      const cards = gsap.utils.toArray('.project-card')

      cards.forEach((card, idx) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: (idx % 2) * 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 92%',
              once: true,
            },
          }
        )
      })
    },
    { scope: containerRef }
  )

  const handleCardMouseMove = (e, cardEl) => {
    const rect = cardEl.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    cardEl.style.transform = `perspective(1000px) rotateY(${x * 0.025}deg) rotateX(${-y * 0.025}deg) translateY(-4px)`
  }

  const handleCardMouseLeave = (cardEl) => {
    cardEl.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) translateY(0px)'
  }

  const handleInspect = (proj) => {
    playQuantumChime()
    setActiveProject(proj)
    // Smoothly scroll down to the project deep-dive dossier
    setTimeout(() => {
      const el = document.getElementById('project-dossier')
      if (el) {
        lenis.scrollTo(el, { offset: -90, duration: 1.2 })
      }
    }, 60)
  }

  return (
    <section
      ref={containerRef}
      id="work"
      style={{
        position: 'relative',
        padding: '120px 24px',
        maxWidth: '1280px',
        margin: '0 auto',
        zIndex: 2,
      }}
    >
      {/* Section Header */}
      <div style={{ marginBottom: '64px' }}>
        <div
          style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '0.8rem',
            letterSpacing: '0.2em',
            color: '#00f5d4',
            marginBottom: '12px',
          }}
        >
          // CHAPTER 01 — FEATURED SOFTWARE ARCHITECTURES
        </div>
        <h2
          style={{
            fontFamily: 'Syne, sans-serif',
            fontSize: 'clamp(2.4rem, 5vw, 4.2rem)',
            fontWeight: 800,
            letterSpacing: '-0.02em',
            color: '#ffffff',
            lineHeight: 1.05,
            textTransform: 'uppercase',
          }}
        >
          ENGINEERED PRODUCTION SYSTEMS
        </h2>
      </div>

      {/* Project Cards Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '32px',
        }}
      >
        {PROJECTS.map((proj) => (
          <div
            key={proj.id}
            className="project-card"
            onMouseMove={(e) => handleCardMouseMove(e, e.currentTarget)}
            onMouseLeave={(e) => handleCardMouseLeave(e.currentTarget)}
            onMouseEnter={playHoverTick}
            style={{
              position: 'relative',
              background: 'rgba(13, 18, 36, 0.65)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '24px',
              padding: '36px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              minHeight: '440px',
              transition: 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.3s ease, box-shadow 0.3s ease',
              boxShadow: '0 20px 40px -20px rgba(0, 0, 0, 0.7)',
            }}
          >
            {/* Top Row: Index & Tag */}
            <div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '24px',
                }}
              >
                <span
                  className="knockout-bracket"
                  style={{
                    fontSize: '1.1rem',
                    fontWeight: 700,
                    color: proj.accent,
                  }}
                >
                  <span>[</span>
                  <span>{proj.index}</span>
                  <span>]</span>
                </span>
                <span
                  style={{
                    fontFamily: 'JetBrains Mono, monospace',
                    fontSize: '0.7rem',
                    letterSpacing: '0.15em',
                    padding: '4px 10px',
                    borderRadius: '9999px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    color: '#94a3b8',
                  }}
                >
                  {proj.tag}
                </span>
              </div>

              {/* Title & Subtitle */}
              <h3
                style={{
                  fontFamily: 'Syne, sans-serif',
                  fontSize: '1.85rem',
                  fontWeight: 700,
                  color: '#ffffff',
                  marginBottom: '8px',
                  letterSpacing: '-0.01em',
                }}
              >
                {proj.title}
              </h3>
              <div
                style={{
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontSize: '0.92rem',
                  color: proj.accent,
                  marginBottom: '18px',
                  fontWeight: 500,
                }}
              >
                {proj.subtitle}
              </div>

              {/* Description */}
              <p
                style={{
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontSize: '0.92rem',
                  color: '#94a3b8',
                  lineHeight: 1.6,
                  marginBottom: '28px',
                }}
              >
                {proj.desc}
              </p>
            </div>

            {/* Bottom Row: Metrics & Actions */}
            <div>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(4, 1fr)',
                  gap: '8px',
                  padding: '16px 0',
                  borderTop: '1px solid rgba(255, 255, 255, 0.06)',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
                  marginBottom: '20px',
                }}
              >
                {proj.metrics.map((m, i) => (
                  <div key={i}>
                    <div
                      style={{
                        fontFamily: 'JetBrains Mono, monospace',
                        fontSize: '0.62rem',
                        color: '#64748b',
                        marginBottom: '4px',
                      }}
                    >
                      {m.label}
                    </div>
                    <div
                      style={{
                        fontFamily: 'JetBrains Mono, monospace',
                        fontSize: '0.8rem',
                        fontWeight: 600,
                        color: '#f8fafc',
                      }}
                    >
                      {m.val}
                    </div>
                  </div>
                ))}
              </div>

              {/* Action Buttons: Live Demo, GitHub, Inspect */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '10px',
                  flexWrap: 'wrap',
                }}
              >
                <div style={{ display: 'flex', gap: '8px' }}>
                  {proj.liveUrl && (
                    <a
                      href={proj.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onMouseEnter={playHoverTick}
                      style={{
                        background: proj.accent,
                        color: '#05070f',
                        padding: '8px 16px',
                        borderRadius: '9999px',
                        fontFamily: 'Space Grotesk, sans-serif',
                        fontSize: '0.8rem',
                        fontWeight: 700,
                        textDecoration: 'none',
                        boxShadow: `0 0 15px ${proj.accent}40`,
                        transition: 'transform 0.2s ease',
                      }}
                    >
                      LIVE DEMO ↗
                    </a>
                  )}

                  <a
                    href={proj.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onMouseEnter={playHoverTick}
                    style={{
                      background: 'rgba(255, 255, 255, 0.05)',
                      color: '#cbd5e1',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                      padding: '8px 14px',
                      borderRadius: '9999px',
                      fontFamily: 'JetBrains Mono, monospace',
                      fontSize: '0.75rem',
                      textDecoration: 'none',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    CODE ↗
                  </a>
                </div>

                <button
                  onClick={() => handleInspect(proj)}
                  onMouseEnter={(e) => {
                    playHoverTick()
                    e.currentTarget.style.color = proj.accent
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = '#94a3b8'
                  }}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: '#94a3b8',
                    fontFamily: 'JetBrains Mono, monospace',
                    fontSize: '0.75rem',
                    cursor: 'pointer',
                    textDecoration: 'underline',
                    transition: 'color 0.2s ease',
                  }}
                >
                  INFO ↓
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Project Deep Dive Drawer Modal */}
      {activeProject && (
        <div
          id="project-dossier"
          style={{
            marginTop: '48px',
            padding: '36px 40px',
            borderRadius: '24px',
            background: 'rgba(5, 10, 25, 0.95)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: `1px solid ${activeProject.accent}`,
            boxShadow: `0 0 50px -10px ${activeProject.accent}40`,
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '0.85rem',
            position: 'relative',
            scrollMarginTop: '100px',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              marginBottom: '20px',
            }}
          >
            <div>
              <span style={{ color: activeProject.accent, marginRight: '10px' }}>● PROJECT DOSSIER:</span>
              <strong style={{ color: '#ffffff', fontSize: '1.4rem', fontFamily: 'Syne, sans-serif' }}>
                {activeProject.title}
              </strong>
              <div style={{ color: '#94a3b8', marginTop: '6px', fontSize: '0.9rem' }}>
                {activeProject.subtitle}
              </div>
            </div>
            <button
              onClick={() => setActiveProject(null)}
              onMouseEnter={playHoverTick}
              style={{
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                color: '#cbd5e1',
                cursor: 'pointer',
                borderRadius: '50%',
                width: '36px',
                height: '36px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1rem',
                transition: 'all 0.2s ease',
              }}
              title="Close dossier"
            >
              ✕
            </button>
          </div>

          <p
            style={{
              fontFamily: 'Space Grotesk, sans-serif',
              fontSize: '1rem',
              color: '#e2e8f0',
              lineHeight: 1.7,
              marginBottom: '24px',
              maxWidth: '900px',
            }}
          >
            {activeProject.desc}
          </p>

          <div
            style={{
              display: 'flex',
              gap: '12px',
              flexWrap: 'wrap',
              alignItems: 'center',
              marginBottom: '24px',
            }}
          >
            {activeProject.liveUrl && (
              <a
                href={activeProject.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={playHoverTick}
                style={{
                  background: activeProject.accent,
                  color: '#05070f',
                  padding: '10px 20px',
                  borderRadius: '9999px',
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  textDecoration: 'none',
                  boxShadow: `0 0 15px ${activeProject.accent}40`,
                }}
              >
                OPEN PRODUCTION DEPLOYMENT ↗
              </a>
            )}
            <a
              href={activeProject.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={playHoverTick}
              style={{
                background: 'rgba(255, 255, 255, 0.08)',
                color: '#ffffff',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                padding: '10px 18px',
                borderRadius: '9999px',
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '0.8rem',
                textDecoration: 'none',
              }}
            >
              VIEW SOURCE CODE ↗
            </a>
          </div>

          <div
            style={{
              display: 'flex',
              gap: '8px',
              flexWrap: 'wrap',
              paddingTop: '20px',
              borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            }}
          >
            <span style={{ color: '#64748b', marginRight: '6px', alignSelf: 'center' }}>
              ARCHITECTURAL STACK:
            </span>
            {activeProject.architecture.map((tech, i) => (
              <span
                key={i}
                style={{
                  padding: '4px 12px',
                  borderRadius: '9999px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  color: activeProject.accent,
                  fontSize: '0.75rem',
                }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      )}
    </section>
  )
}
