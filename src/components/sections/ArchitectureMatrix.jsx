import React, { useState } from 'react'
import { playHoverTick, playMagneticSnap } from '../../core/audio'

const SKILL_CATEGORIES = [
  {
    category: 'FRONTEND DEVELOPMENT',
    items: [
      { name: 'React & Next.js', spec: 'App Router, Hooks, SSR/SSG', proficiency: 'EXPERT', status: 'CORE' },
      { name: 'TypeScript & ES6+', spec: 'Strict Types, Async/Await', proficiency: 'EXPERT', status: 'CORE' },
      { name: 'Tailwind CSS & CSS3', spec: 'Responsive UI, Fluid Design', proficiency: 'EXPERT', status: 'ACTIVE' },
      { name: 'Vite & Tooling', spec: 'HMR, Fast Bundling, Code-splitting', proficiency: 'ADVANCED', status: 'DEPLOYED' },
      { name: 'Motion (GSAP & Three.js)', spec: 'ScrollTrigger, R3F Shaders', proficiency: 'ADVANCED', status: 'AWWWARDS-TIER' },
    ],
  },
  {
    category: 'BACKEND & APIS',
    items: [
      { name: 'C# & ASP.NET Core', spec: '.NET 10 Web API, Middleware', proficiency: 'ADVANCED', status: 'PRODUCTION' },
      { name: 'Node.js & Express', spec: 'RESTful API Architecture', proficiency: 'ADVANCED', status: 'PRODUCTION' },
      { name: 'JWT Authentication', spec: 'Bearer Tokens, Role Guards', proficiency: 'EXPERT', status: 'SECURED' },
      { name: 'API Design & Integration', spec: 'Axios, Fetch, Webhooks', proficiency: 'EXPERT', status: 'OPTIMIZED' },
    ],
  },
  {
    category: 'DATABASES & ORMS',
    items: [
      { name: 'MySQL & PostgreSQL', spec: 'Relational Schemas, Indexing', proficiency: 'ADVANCED', status: 'VERIFIED' },
      { name: 'Entity Framework Core', spec: 'Code-First Migrations, LINQ', proficiency: 'ADVANCED', status: 'ACTIVE' },
      { name: 'Prisma ORM', spec: 'Type-Safe Queries, Client Sync', proficiency: 'ADVANCED', status: 'DEPLOYED' },
    ],
  },
  {
    category: 'MOBILE & DEVOPS',
    items: [
      { name: 'React Native & Expo', spec: 'Expo Router, NativeWind', proficiency: 'ADVANCED', status: 'ACTIVE' },
      { name: 'Git & Version Control', spec: 'Branching, CI/CD, Actions', proficiency: 'EXPERT', status: 'DAILY' },
      { name: 'Vercel & Cloud', spec: 'Automated Deploys, Edge Network', proficiency: 'EXPERT', status: 'CONNECTED' },
    ],
  },
]

export function ArchitectureMatrix() {
  const [activeCategory, setActiveCategory] = useState(0)

  return (
    <section
      id="matrix"
      style={{
        position: 'relative',
        padding: '120px 24px',
        maxWidth: '1280px',
        margin: '0 auto',
        zIndex: 2,
      }}
    >
      <div style={{ marginBottom: '48px' }}>
        <div
          style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '0.8rem',
            letterSpacing: '0.2em',
            color: '#00f5d4',
            marginBottom: '12px',
          }}
        >
          // CHAPTER 04 — CAPABILITIES & TECHNICAL MATRIX
        </div>
        <h2
          style={{
            fontFamily: 'Syne, sans-serif',
            fontSize: 'clamp(2.2rem, 5vw, 4rem)',
            fontWeight: 800,
            letterSpacing: '-0.02em',
            color: '#ffffff',
            textTransform: 'uppercase',
          }}
        >
          TECHNICAL SKILL MATRIX
        </h2>
      </div>

      {/* Tabs */}
      <div
        style={{
          display: 'flex',
          gap: '12px',
          marginBottom: '32px',
          flexWrap: 'wrap',
        }}
      >
        {SKILL_CATEGORIES.map((group, idx) => (
          <button
            key={idx}
            onClick={() => {
              playMagneticSnap()
              setActiveCategory(idx)
            }}
            onMouseEnter={playHoverTick}
            style={{
              padding: '12px 24px',
              borderRadius: '9999px',
              border: activeCategory === idx ? '1px solid #00f5d4' : '1px solid rgba(255, 255, 255, 0.1)',
              background: activeCategory === idx ? 'rgba(0, 245, 212, 0.12)' : 'rgba(255, 255, 255, 0.02)',
              color: activeCategory === idx ? '#00f5d4' : '#94a3b8',
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '0.82rem',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            {group.category}
          </button>
        ))}
      </div>

      {/* Table Content Card */}
      <div
        style={{
          background: 'rgba(10, 15, 30, 0.75)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '24px',
          padding: '24px',
          boxShadow: '0 20px 40px -20px rgba(0, 0, 0, 0.7)',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {SKILL_CATEGORIES[activeCategory].items.map((item, i) => (
            <div
              key={i}
              onMouseEnter={playHoverTick}
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                alignItems: 'center',
                padding: '20px 24px',
                borderRadius: '16px',
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid rgba(255, 255, 255, 0.04)',
                gap: '16px',
                transition: 'background 0.2s ease',
              }}
            >
              <div>
                <div
                  style={{
                    fontFamily: 'Space Grotesk, sans-serif',
                    fontSize: '1.05rem',
                    fontWeight: 600,
                    color: '#ffffff',
                  }}
                >
                  {item.name}
                </div>
                <div
                  style={{
                    fontFamily: 'JetBrains Mono, monospace',
                    fontSize: '0.78rem',
                    color: '#64748b',
                    marginTop: '2px',
                  }}
                >
                  {item.spec}
                </div>
              </div>

              <div
                style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '0.9rem',
                  color: '#00f5d4',
                  fontWeight: 500,
                }}
              >
                {item.proficiency}
              </div>

              <div style={{ textAlign: 'right' }}>
                <span
                  style={{
                    fontFamily: 'JetBrains Mono, monospace',
                    fontSize: '0.7rem',
                    letterSpacing: '0.12em',
                    padding: '4px 12px',
                    borderRadius: '9999px',
                    background: 'rgba(0, 245, 212, 0.1)',
                    border: '1px solid rgba(0, 245, 212, 0.3)',
                    color: '#00f5d4',
                  }}
                >
                  {item.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
