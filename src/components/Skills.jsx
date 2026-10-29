import React, { useRef, useState } from 'react'

function InteractiveCard({ children, style = {}, className = '', ...props }) {
  const cardRef = useRef()
  const [transform, setTransform] = useState('perspective(900px) rotateX(0deg) rotateY(0deg)')
  const [spotlight, setSpotlight] = useState({ x: -100, y: -100, opacity: 0 })

  const handleMouseMove = (e) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotX = ((y - centerY) / centerY) * -5
    const rotY = ((x - centerX) / centerX) * 5

    setTransform(`perspective(900px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) scale3d(1.015, 1.015, 1.015)`)
    setSpotlight({ x, y, opacity: 1 })
  }

  const handleMouseLeave = () => {
    setTransform('perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)')
    setSpotlight((prev) => ({ ...prev, opacity: 0 }))
  }

  return (
    <div
      ref={cardRef}
      className={`glass-panel ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        ...style,
        transform,
        transition: 'transform 0.18s ease-out, border-color 0.25s ease',
        position: 'relative',
        overflow: 'hidden',
      }}
      {...props}
    >
      {/* Specular cursor glow */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          pointerEvents: 'none',
          background: `radial-gradient(450px circle at ${spotlight.x}px ${spotlight.y}px, rgba(168, 85, 247, 0.14), transparent 75%)`,
          opacity: spotlight.opacity,
          transition: 'opacity 0.2s ease',
          zIndex: 1,
        }}
      />
      <div style={{ position: 'relative', zIndex: 2, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        {children}
      </div>
    </div>
  )
}

export function Skills() {
  return (
    <section
      id="skills"
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
        <span>CHAPTER 03 // THE ENGINE ROOM</span>
      </div>

      <div style={{ marginBottom: '64px' }}>
        <h2
          style={{
            fontFamily: 'Syne, sans-serif',
            fontSize: 'clamp(2.4rem, 5.2vw, 4.6rem)',
            fontWeight: 800,
            lineHeight: 1.05,
            color: '#ffffff',
            letterSpacing: '-0.02em',
            textTransform: 'uppercase',
            marginBottom: '16px',
          }}
        >
          TECHNICAL CAPABILITIES <br />
          <span
            style={{
              background: 'linear-gradient(135deg, #a855f7 0%, #38bdf8 50%, #06b6d4 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              display: 'inline-block',
            }}
          >
            &amp; ARCHITECTURE MATRIX.
          </span>
        </h2>
        <p
          style={{
            fontFamily: 'Space Grotesk, sans-serif',
            fontSize: '1.05rem',
            color: '#94a3b8',
            maxWidth: '680px',
          }}
        >
          An organized overview of my production stack—engineered for high availability, strict type safety, and 60fps user experience.
        </p>
      </div>

      {/* Bento Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(12, 1fr)',
          gap: '24px',
        }}
      >
        {/* Box 1: Backend Architecture (8 Cols) */}
        <InteractiveCard
          style={{
            gridColumn: 'span 8',
            padding: '36px',
          }}
        >
          <div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '24px',
              }}
            >
              <span
                style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '0.74rem',
                  color: '#a855f7',
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                }}
              >
                01 // CORE BACKEND & APIS
              </span>
              <span
                style={{
                  padding: '4px 10px',
                  borderRadius: '9999px',
                  background: 'rgba(168, 85, 247, 0.12)',
                  border: '1px solid rgba(168, 85, 247, 0.3)',
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '0.68rem',
                  color: '#c084fc',
                }}
              >
                HIGH THROUGHPUT
              </span>
            </div>

            <h3
              style={{
                fontFamily: 'Syne, sans-serif',
                fontSize: '1.6rem',
                fontWeight: 800,
                color: '#ffffff',
                marginBottom: '12px',
              }}
            >
              ASP.NET Core (.NET 10) &amp; Node.js
            </h3>

            <p
              style={{
                fontFamily: 'Space Grotesk, sans-serif',
                fontSize: '0.98rem',
                color: '#94a3b8',
                lineHeight: 1.6,
                marginBottom: '28px',
                maxWidth: '620px',
              }}
            >
              Designing high-concurrency RESTful APIs, modular monoliths, and distributed microservices. Implementing secure JWT Bearer authentication guards, robust validation pipelines, and dependency-injected services.
            </p>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {['C#', 'ASP.NET Core 10', 'Node.js', 'Express', 'JWT Authentication', 'REST Architecture', 'API Gateways'].map((tech) => (
              <span
                key={tech}
                style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '0.74rem',
                  color: '#ffffff',
                  background: 'rgba(255, 255, 255, 0.05)',
                  padding: '6px 14px',
                  borderRadius: '9999px',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                }}
              >
                {tech}
              </span>
            ))}
          </div>
        </InteractiveCard>

        {/* Box 2: Data Systems (4 Cols) */}
        <InteractiveCard
          style={{
            gridColumn: 'span 4',
            padding: '36px',
          }}
        >
          <div>
            <div
              style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '0.74rem',
                color: '#06b6d4',
                fontWeight: 700,
                letterSpacing: '0.1em',
                marginBottom: '20px',
              }}
            >
              02 // PERSISTENCE
            </div>

            <h3
              style={{
                fontFamily: 'Syne, sans-serif',
                fontSize: '1.4rem',
                fontWeight: 800,
                color: '#ffffff',
                marginBottom: '10px',
              }}
            >
              PostgreSQL &amp; MySQL
            </h3>

            <p
              style={{
                fontFamily: 'Space Grotesk, sans-serif',
                fontSize: '0.94rem',
                color: '#94a3b8',
                lineHeight: 1.6,
                marginBottom: '24px',
              }}
            >
              Normalized relational schemas, index optimization, Entity Framework Core code-first migrations, and Prisma ORM client synchronization.
            </p>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {['PostgreSQL', 'MySQL', 'EF Core', 'Prisma ORM'].map((tech) => (
              <span
                key={tech}
                style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '0.72rem',
                  color: '#06b6d4',
                  background: 'rgba(6, 182, 212, 0.05)',
                  padding: '5px 12px',
                  borderRadius: '9999px',
                  border: '1px solid rgba(6, 182, 212, 0.2)',
                }}
              >
                {tech}
              </span>
            ))}
          </div>
        </InteractiveCard>

        {/* Box 3: Frontend Ecosystem (6 Cols) */}
        <InteractiveCard
          style={{
            gridColumn: 'span 6',
            padding: '36px',
          }}
        >
          <div>
            <div
              style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '0.74rem',
                color: '#38bdf8',
                fontWeight: 700,
                letterSpacing: '0.1em',
                marginBottom: '20px',
              }}
            >
              03 // CLIENT ARCHITECTURE
            </div>

            <h3
              style={{
                fontFamily: 'Syne, sans-serif',
                fontSize: '1.45rem',
                fontWeight: 800,
                color: '#ffffff',
                marginBottom: '10px',
              }}
            >
              React 19 &amp; Next.js App Router
            </h3>

            <p
              style={{
                fontFamily: 'Space Grotesk, sans-serif',
                fontSize: '0.94rem',
                color: '#94a3b8',
                lineHeight: 1.6,
                marginBottom: '24px',
              }}
            >
              Strict TypeScript type-safety, modular component design systems, predictable client state orchestration, SSR/SSG caching, and fluid layouts with Tailwind CSS.
            </p>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {['React 19', 'Next.js 16', 'TypeScript', 'Tailwind CSS', 'Vite'].map((tech) => (
              <span
                key={tech}
                style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '0.72rem',
                  color: '#38bdf8',
                  background: 'rgba(56, 189, 248, 0.05)',
                  padding: '5px 12px',
                  borderRadius: '9999px',
                  border: '1px solid rgba(56, 189, 248, 0.2)',
                }}
              >
                {tech}
              </span>
            ))}
          </div>
        </InteractiveCard>

        {/* Box 4: Mobile & DevOps (3 Cols) */}
        <InteractiveCard
          style={{
            gridColumn: 'span 3',
            padding: '36px',
          }}
        >
          <div>
            <div
              style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '0.74rem',
                color: '#f59e0b',
                fontWeight: 700,
                letterSpacing: '0.1em',
                marginBottom: '20px',
              }}
            >
              04 // MOBILE &amp; CLOUD
            </div>

            <h3
              style={{
                fontFamily: 'Syne, sans-serif',
                fontSize: '1.25rem',
                fontWeight: 800,
                color: '#ffffff',
                marginBottom: '10px',
              }}
            >
              Expo &amp; DevOps
            </h3>

            <p
              style={{
                fontFamily: 'Space Grotesk, sans-serif',
                fontSize: '0.88rem',
                color: '#94a3b8',
                lineHeight: 1.5,
              }}
            >
              Cross-platform iOS/Android development with Expo Router &amp; NativeWind. CI/CD pipelines, Git, and edge deployments on Vercel.
            </p>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '16px' }}>
            {['React Native', 'Expo', 'Git', 'Vercel'].map((tech) => (
              <span
                key={tech}
                style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '0.68rem',
                  color: '#f59e0b',
                  background: 'rgba(245, 158, 11, 0.05)',
                  padding: '4px 10px',
                  borderRadius: '9999px',
                  border: '1px solid rgba(245, 158, 11, 0.2)',
                }}
              >
                {tech}
              </span>
            ))}
          </div>
        </InteractiveCard>

        {/* Box 5: Creative Web & Motion (3 Cols) */}
        <InteractiveCard
          style={{
            gridColumn: 'span 3',
            padding: '36px',
          }}
        >
          <div>
            <div
              style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '0.74rem',
                color: '#f43f5e',
                fontWeight: 700,
                letterSpacing: '0.1em',
                marginBottom: '20px',
              }}
            >
              05 // MOTION CRAFT
            </div>

            <h3
              style={{
                fontFamily: 'Syne, sans-serif',
                fontSize: '1.25rem',
                fontWeight: 800,
                color: '#ffffff',
                marginBottom: '10px',
              }}
            >
              GSAP &amp; Three.js
            </h3>

            <p
              style={{
                fontFamily: 'Space Grotesk, sans-serif',
                fontSize: '0.88rem',
                color: '#94a3b8',
                lineHeight: 1.5,
              }}
            >
              ScrollTrigger choreography, Lenis 120 FPS inertial scrolling, custom WebGL shaders, and tactile feedback.
            </p>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '16px' }}>
            {['GSAP', 'Lenis', 'Three.js', 'WebGL'].map((tech) => (
              <span
                key={tech}
                style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '0.68rem',
                  color: '#f43f5e',
                  background: 'rgba(244, 63, 94, 0.05)',
                  padding: '4px 10px',
                  borderRadius: '9999px',
                  border: '1px solid rgba(244, 63, 94, 0.2)',
                }}
              >
                {tech}
              </span>
            ))}
          </div>
        </InteractiveCard>
      </div>
    </section>
  )
}
